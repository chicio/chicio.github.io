import { useEffect, useState } from "react";
import { SearchResult } from "../lunr";

const hasMinimumCharsToSearch = (query: string): boolean => query.length >= 3;

const isASearchInProgressUsing = (
  query: string,
  hits: SearchResult[],
): boolean =>
  query !== null &&
  query !== undefined &&
  hasMinimumCharsToSearch(query) &&
  hits.length > 0;

export const useSearch = (startSearch: boolean) => {
  const [query, setQuery] = useState("");
  const [hits, setHits] = useState<SearchResult[]>([]);

  useEffect(() => {
    if (startSearch) {
      const { index, store } = window.__LUNR__.en;
      const enhancedQuery = query
        .split(" ")
        .map((term) => `${term}*`)
        .join(" ");
      const searchResults = index.search(enhancedQuery);
      const hits = searchResults.map(({ ref }) => store[ref]);
      if (isASearchInProgressUsing(query, hits)) {
        setHits(hits);
      } else {
        setHits([]);
      }
    }
  }, [query]);

  return {
    hits,
    setQuery,
  };
};
