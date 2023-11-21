"use client";

import { QueryCreate } from "@/lib/hooks/useQuery";
import QueryCard from "./cards/QueryCard";

interface Props {
  onTapOldQuery: (query: QueryCreate, isMyQuery: boolean) => void;
  allQueries: QueryCreate[];
  loadingAllQueries: boolean;
}

const RightSidebar = ({
  onTapOldQuery,
  allQueries,
  loadingAllQueries,
}: Props) => {
  return (
    <section className="custom-scrollbar rightsidebar">
      <div className="flex flex-1 flex-col justify-start">
        <h3 className="text-heading4-medium text-light-1">
          Latest querys from community
        </h3>

        <div className="mt-7 flex w-[350px] flex-col gap-9">
          {loadingAllQueries ? (
            <p className="!text-base-regular text-light-3">Loading...</p>
          ) : allQueries?.length > 0 ? (
            <>
              {allQueries?.map((query) => (
                <QueryCard
                  onTapOldQuery={(query) => onTapOldQuery(query, false)}
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

export default RightSidebar;
