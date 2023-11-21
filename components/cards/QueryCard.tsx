import { Button } from "../ui/button";
import { QueryCreate } from "@/lib/hooks/useQuery";

interface Props {
  query: QueryCreate;
  onTapOldQuery: (query: QueryCreate) => void;
}

// Displays a query card in the sidebars
// The function onTapOldQuery manages the callback when the card is tapped
const QueryCard = ({ query, onTapOldQuery }: Props) => {
  return (
    <article className="community-card">
      <div className="flex flex-wrap items-center gap-3">
        <div>
          <h4 className="text-base-semibold text-light-1">
            {query.name || "No name"}
          </h4>
          <p className="text-small-medium text-gray-1">@{query.username}</p>
        </div>
      </div>

      <p className="mt-4 text-subtle-medium text-gray-1">
        {query.description || "No description"}
      </p>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <Button
          onClick={() => {
            onTapOldQuery(query);
          }}
          size="sm"
          className="community-card_btn"
        >
          View
        </Button>
      </div>
    </article>
  );
};

export default QueryCard;
