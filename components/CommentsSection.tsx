"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField } from "./ui/form";
import { Input } from "./ui/input";
import { Comment } from "@/lib/hooks/useQuery";
import { Button } from "./ui/button";

interface Props {
  comments: Comment[];
  queryId?: string;
  username: string;
  setUsername: (username: string) => void;
  addCommentToQuery: (
    queryId: string,
    username: string,
    comment: string
  ) => Promise<void>;
  getCommentsForQuery: (queryId: string) => void;
}

const CommentsSection = ({
  comments,
  queryId,
  username,
  addCommentToQuery,
  getCommentsForQuery,
  setUsername,
}: Props) => {
  const form = useForm();
  const { control, handleSubmit, reset } = useForm({
    defaultValues: { newComment: "", username: "" },
  });

  const onSubmit = async (data) => {
    reset({}, { keepValues: false });
    if (queryId) {
      await addCommentToQuery(
        queryId,
        username || data.username,
        data.newComment
      );
      getCommentsForQuery(queryId);
    }
    if (!username) setUsername(data.username);
  };

  return (
    <div>
      <h1 className="head-text text-left">Comments</h1>
      <h2 className="text-small-medium text-gray-1 py-4">
        In this section you can see the comments from other people that are
        interested in this topic. Join the conversation!
      </h2>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormField
            control={control}
            name="newComment"
            render={({ field }) => (
              <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                <Input {...field} />
              </FormControl>
            )}
          />
          {username && (
            <h2 className="text-small-medium text-gray-1 py-4">
              Press enter to post your comment!
            </h2>
          )}
          {!username && (
            <>
              <h2 className="text-base-semibold text-light-2 pt-2 pb-1">
                Please enter a username to record your search (it will be saved
                locally for further searches)
              </h2>
              <FormField
                control={control}
                name="username"
                render={({ field }) => (
                  <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                    <Input {...field} />
                  </FormControl>
                )}
              />
              <Button className="bg-primary-500">Post comment</Button>
            </>
          )}
        </form>
      </Form>
      {comments.length > 0 ? (
        comments.map((row) => (
          <div className="flex flex-col w-full py-2">
            <h1 className="text-base-semibold text-light-1">{row.content}</h1>
            <h1 className="text-small-medium text-gray-1">
              {`By @${row.username}`}
            </h1>
          </div>
        ))
      ) : (
        <h1 className="text-base-semibold text-light-1">No comments yet!</h1>
      )}
    </div>
  );
};

export default CommentsSection;
