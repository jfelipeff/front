"use client";

import { QueryCreate } from "@/lib/hooks/useQuery";
import QueryCard from "./cards/QueryCard";

interface Props {
  onTapOldQuery: (query: QueryCreate, isMyQuery: boolean) => void;
  myQueries: QueryCreate[];
  loadingMyQueries: boolean;
}

const LeftSidebar = ({ onTapOldQuery, myQueries, loadingMyQueries }: Props) => {
  return (
    <section className="custom-scrollbar leftsidebar">
      <div className="flex flex-1 flex-col justify-start">
        <h3 className="text-heading4-medium text-light-1">My workspace</h3>

        <div className="mt-7 flex w-[350px] flex-col gap-9">
          {loadingMyQueries ? (
            <p className="!text-base-regular text-light-3">Loading...</p>
          ) : myQueries?.length > 0 ? (
            <>
              {myQueries?.map((query) => (
                <QueryCard
                  onTapOldQuery={(query) => onTapOldQuery(query, true)}
                  query={query}
                />
              ))}
            </>
          ) : (
            <p className="!text-base-regular text-light-3">No querys yet</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default LeftSidebar;
