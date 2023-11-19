"use server";

import { revalidatePath } from "next/cache";

export async function fetchPosts(pageNumber = 1, pageSize = 20) {

  // Calculate the number of posts to skip based on the page number and page size.
  const skipAmount = (pageNumber - 1) * pageSize;

  // Create a query to fetch the posts that have no parent (top-level threads) (a thread that is not a comment/reply).
  try {
  const response = await fetch("localhost:3000/query/")
  const postsQuery = response.json()
    return postsQuery
  } catch (error: any) {
    throw new Error(`Failed to create thread: ${error.message}`);
  }


  // Count the total number of top-level posts (threads) i.e., threads that are not comments.
  //const totalPostsCount = await Thread.countDocuments({
   // parentId: { $in: [null, undefined] },
  //}); // Get the total count of posts

  //const posts = await postsQuery.exec();

  //const isNext = totalPostsCount > skipAmount + posts.length;

  //return { postsQuery };
}

interface Params {
  text: string,
  author: string,
  communityId: string | null,
  path: string,
}

export async function createQuery({ text, author, path }: Params) { 
  try {
    const createdQuery = await fetch("localhost:3000/query/create", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json", 
      },
    })
  } catch (error: any) {
    throw new Error(`Failed to create thread: ${error.message}`);
  }
}

export async function fetchQueryById(queryId: string) {
  try {
    const query = await fetch(`localhost:3000/query/id/${queryId}`)
    return query;
  } catch (err) {
    console.error("Error while fetching query:", err);
    throw new Error("Unable to fetch query");
  }
}

export async function addCommentToQuery(
  queryId: string,
  commentText: string,
  userId: string,
  path: string
) { 

  try {
    // Find the original thread by its ID
    const originalQuery = await fetch("localhost:3000/query/id")

    if (!originalQuery) {
      throw new Error("Query not found");
    }

    // Create the new query comment
    const commentQuery = new Thread({
      text: commentText,
      author: userId,
      parentId: threadId, // Set the parentId to the original thread's ID
    });

    // Save the comment thread to the database
    const savedCommentThread = await commentThread.save();

    // Add the comment thread's ID to the original thread's children array
    originalThread.children.push(savedCommentThread._id);

    // Save the updated original thread to the database
    await originalThread.save();

    revalidatePath(path);
  } catch (err) {
    console.error("Error while adding comment:", err);
    throw new Error("Unable to add comment");
  }
}
