"use client";

import QueryForm from "@/components/forms/QueryForm";
import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";
import { useEffect, useRef, useState } from "react";
import useQuery, { QueryCreate } from "@/lib/hooks/useQuery";
import CommentsSection from "@/components/CommentsSection";
import { userNameLocalStorageKey } from "@/lib/constants";

const Home = () => {
  const [username, setUsername] = useState(null);
  const {
    getCommentsForQuery,
    currentComments,
    addCommentToQuery,
    allQueries,
    getAllQueries,
    myQueries,
    getMyQueries,
    loadingAllQueries,
    loadingMyQueries,
  } = useQuery();

  // Used to know if the comments section should be displayed
  const [isQueryDisplayed, setIsQueryDisplayed] = useState(false);

  // Used to know which query is being displayed
  const [currentQueryId, setCurrentQueryId] = useState(null);

  // Used to pass as callback to sidebars for when a community card is tapped
  const onTapOldQuery = async (query: QueryCreate, isMyQuery: boolean) => {
    // Performs the query withing the query form
    queryFormRef.current?.runOldQuery(query, isMyQuery);
    // When the query is displayed, the comments section should be displayed
    await getCommentsForQuery(query.id);
  };

  // Used to pass as ref to the query form
  const queryFormRef = useRef();

  useEffect(() => {
    // If the username is stored in local storage, set it
    const username = JSON.parse(localStorage.getItem(userNameLocalStorageKey));
    if (username) {
      setUsername(username);
    }
  }, []);

  useEffect(() => {
    // If the username was set (for example when creating a query), store it in local storage and get all queries
    localStorage.setItem(userNameLocalStorageKey, JSON.stringify(username));
    getAllQueries(username);
    getMyQueries(username);
  }, [username]);

  return (
    <main className="flex flex-row justify-center">
      <LeftSidebar
        onTapOldQuery={onTapOldQuery}
        myQueries={myQueries}
        loadingMyQueries={loadingMyQueries}
      />
      <div className="flex flex-col w-full p-8">
        <h1 className="flex-col head-text text-left">Home</h1>
        {username && (
          <h1 className="flex-col head-text text-left">
            {`Welcome! @${username}`}
          </h1>
        )}
        <QueryForm
          ref={queryFormRef}
          username={username}
          setUsername={setUsername}
          setIsQueryDisplayed={setIsQueryDisplayed}
          setCurrentQueryId={setCurrentQueryId}
          getAllQueries={getAllQueries}
        />
        {isQueryDisplayed && (
          <div className="flex flex-row justify-between py-4">
            <CommentsSection
              comments={currentComments}
              queryId={currentQueryId}
              username={username}
              setUsername={setUsername}
              addCommentToQuery={addCommentToQuery}
              getCommentsForQuery={getCommentsForQuery}
            />
          </div>
        )}
      </div>
      <RightSidebar
        onTapOldQuery={onTapOldQuery}
        allQueries={allQueries}
        loadingAllQueries={loadingAllQueries}
      />
    </main>
  );
};

export default Home;
