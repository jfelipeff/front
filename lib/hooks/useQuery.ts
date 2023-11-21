import { useState, useEffect } from "react";

export interface QueryResult {
  id: string;
  username: string;
  name: string;
  description: string;
  value?: number;
  countryName: string;
  countryCode: string;
  year: number;
  indicatorName: string;
  indicatorCode: string;
}

export interface QueryCreate {
  indicator_code: string;
  year: number;
  country_code: string;
  username: string;
  name: string;
  description: string;
  id?: string;
}

export interface Comment {
  username: string;
  content: string;
}

export default function useQuery() {
  const [query, setQuery] = useState<QueryResult[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isQueryLoading, setIsQueryLoading] = useState<boolean>(false);
  const [allQueries, setAllQueries] = useState<QueryCreate[]>([]);
  const [loadingAllQueries, setLoadingAllQueries] = useState<boolean>([]);
  const [myQueries, setMyQueries] = useState<QueryCreate[]>([]);
  const [loadingMyQueries, setLoadingMyQueries] = useState<boolean>([]);
  const [currentComments, setCurrentComments] = useState<Comment[]>([]);

  // Creates a query with a queryCreate object that
  // contains the indicator code, year, country_code,
  // username, name and description
  const createQuery = async (queryCreate: QueryCreate, save: boolean) => {
    try {
      setIsQueryLoading(true);

      const response = await fetch(
        "http://localhost:4000/query/create/?" +
          new URLSearchParams({
            indicator_code: queryCreate.indicator_code,
            year: queryCreate.year.toString(),
            country_code: queryCreate.country_code,
          }),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            save: save.toString(),
            username: queryCreate.username || "",
            name: queryCreate.name || "",
            description: queryCreate.description || "",
          }),
        }
      );
      const query = await response.json();
      return query;
    } catch (error: any) {
      throw new Error(`Failed to fetch query`);
    } finally {
      setIsQueryLoading(false);
    }
  };

  // Gets all queries
  // TODO: Use current username to get the queries that
  // doesn't belong to the current user
  const getAllQueries = async (currentUsername?: string) => {
    try {
      setLoadingAllQueries(true);
      const response = await fetch("http://localhost:4000/query/all-queries/?");
      const queries = await response.json();
      setAllQueries(queries);
      return queries;
    } catch (error: any) {
      throw new Error(`Failed to fetch query`);
    } finally {
      setLoadingAllQueries(false);
    }
  };

  // Gets my queries to have them in left side bar
  // TODO Use current username to get the queries that
  // DO belong to the current user
  const getMyQueries = async (username: string) => {
    try {
      setLoadingMyQueries(true);
      const queries = await Promise.resolve([
        {
          queryId: "2",
          username: "user2",
          name: "Query name 2 prod",
          description: "Query long coment 2 prod",
          country_code: "PER",
          countryName: "PERu",
          indicator_code: "UIS.R.1",
          indicatorName: "Porcentaje",
          year: 2006,
          value: 24,
        },
        {
          queryId: "2",
          username: "user2",
          name: "Query name 2 prod",
          description: "Query long coment 2 prod",
          country_code: "PER",
          countryName: "PERu",
          indicator_code: "UIS.R.1",
          indicatorName: "Porcentaje",
          year: 2000,
          value: 24,
        },
      ]);
      setMyQueries(queries);
      return queries;
    } catch (error: any) {
      throw new Error(`Failed to fetch query`);
    } finally {
      setLoadingMyQueries(false);
    }
  };

  // Gets comments for a query based on queryId
  const getCommentsForQuery = async (queryId: string) => {
    try {
      setLoading(true);
      queryId;
      const response = await fetch(
        `http://localhost:4000/query/comments/${queryId}/?`
      );
      const comments = await response.json();
      setCurrentComments(comments.reverse());
    } catch (error: any) {
      throw new Error(`Failed to fetch query`);
    } finally {
      setLoading(false);
    }
  };

  // Adds a comment to a query based on queryId.
  // The username is the owner of the comment
  const addCommentToQuery = async (
    queryId: string,
    username: string,
    content: string
  ) => {
    try {
      setLoading(true);
      const response = await fetch(
        "http://localhost:4000/query/comments/create/" + queryId + "/?",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            content: content,
          }),
        }
      );
    } catch (error: any) {
      throw new Error(`Failed to fetch query`);
    } finally {
      setLoading(false);
    }
  };

  return {
    query,
    isQueryLoading,
    createQuery,
    getAllQueries,
    getMyQueries,
    getCommentsForQuery,
    addCommentToQuery,
    currentComments,
    allQueries,
    myQueries,
    loadingAllQueries,
    loadingMyQueries,
  };
}
