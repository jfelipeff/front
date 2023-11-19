import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import PostQuery from "@/components/forms/PostQuery";
import { fetchUser } from "@/lib/actions/query.actions";

async function Page() {
  const user = await currentUser();
  if (!user) return null;

  // fetch organization list created by user
  const userInfo = await fetchUser(user.id); 

  return (
    <>
      <h1 className='head-text'>Create Query</h1>

      <PostQuery userId={userInfo._id} />
    </>
  );
}

export default Page;
