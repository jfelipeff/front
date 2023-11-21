"use client";

import QueryForm from "@/components/forms/QueryForm";
import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";
import { useEffect, useRef, useState } from "react";
import useQuery, { QueryCreate } from "@/lib/hooks/useQuery";
import CommentsSection from "@/components/CommentsSection";

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
  const [isQueryDisplayed, setIsQueryDisplayed] = useState(false);
  const [currentQueryId, setCurrentQueryId] = useState(null);

  const onTapOldQuery = async (query: QueryCreate, isMyQuery: boolean) => {
    queryFormRef.current?.runOldQuery(query, isMyQuery);
    await getCommentsForQuery(query.id);
  };

  const queryFormRef = useRef();

  useEffect(() => {
    const username = JSON.parse(localStorage.getItem(userNameLocalStorageKeyz));
    if (username) {
      setUsername(username);
    }
  }, []);

  useEffect(() => {
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
