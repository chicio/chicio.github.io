import React, { useMemo } from "react";
import { Hits, InstantSearch, SearchBox } from "react-instantsearch-dom";
import algoliasearch from "algoliasearch/lite";

export const Search: React.FC = () => {
  const searchClient = useMemo(
    () =>
      algoliasearch(
        process.env.GATSBY_ALGOLIA_APP_ID ?? "",
        process.env.GATSBY_ALGOLIA_SEARCH_KEY ?? ""
      ),
    []
  );

  return (
    <InstantSearch indexName="bestbuy" searchClient={searchClient}>
      <SearchBox />
      <Hits />
    </InstantSearch>
  );
};
