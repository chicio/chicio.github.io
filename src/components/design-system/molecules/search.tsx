import React, { useMemo } from "react";
import {
  connectHits,
  connectSearchBox,
  connectStateResults,
  InstantSearch,
} from "react-instantsearch-dom";
import algoliasearch from "algoliasearch/lite";
import { HitsProvided, SearchBoxProvided } from "react-instantsearch-core";
import { Link } from "gatsby";
import styled, { css } from "styled-components";
import { SearchAlt } from "styled-icons/boxicons-regular";
import { mediaQuery } from "../utils-css/media-query";

const SearchHitsContainer = styled.ul`
  list-style: none;
`;

const SearchHitContainer = styled.li`
  display: flex;
  flex-direction: column;
`;

const SearchHitLink = styled(Link)`
  text-decoration: none;
`;

const SearchHits: React.FC<HitsProvided<{ title: string; slug: string }>> = ({
  hits,
}) => (
  <SearchHitsContainer>
    {hits.map((hit, index) => (
      <SearchHitContainer key={"SearchResult" + index}>
        <SearchHitLink to={hit.slug}>{hit.title}</SearchHitLink>
      </SearchHitContainer>
    ))}
  </SearchHitsContainer>
);

const SearchBoxContainer = styled.div`
  transform: translate(0, 0);
`;

interface StartSearchProps {
  startSearch: boolean;
}

const SearchAltContainer = styled.span<StartSearchProps>`
  position: absolute;
  top: 50%;
  right: -2px;
  transform: translate(-50%, -50%);
  color: ${(props) => props.theme.light.textAbovePrimaryColor};
  transition: 0.2s;

  ${mediaQuery.dark} {
    color: ${(props) => props.theme.dark.textAbovePrimaryColor};
  }

  ${(props) =>
    props.startSearch &&
    css`
      opacity: 0;
      z-index: -1;
    `}
`;

const SearchBoxInput = styled.input<StartSearchProps>`
  padding: 10px;
  width: 35px;
  height: 35px;
  background: none;
  border-radius: 50px;
  box-sizing: border-box;
  font-size: ${(props) => props.theme.fontSizes[3]};
  color: ${(props) => props.theme.light.primaryTextColor};
  border: 2px solid ${(props) => props.theme.light.textAbovePrimaryColor};
  outline: none;
  transition: 0.5s;

  ${mediaQuery.dark} {
    color: ${(props) => props.theme.dark.primaryTextColor};
    border: 2px solid ${(props) => props.theme.dark.textAbovePrimaryColor};
  }

  ${(props) =>
    props.startSearch &&
    css`
      width: 200px;
      background: ${(props) => props.theme.light.generalBackground};
      border-radius: 4px;

      ${mediaQuery.dark} {
        background: ${(props) => props.theme.dark.generalBackground};
      }
    `}
`;

interface OnClickProp {
  onClick: () => void;
}

const SearchBox: React.FC<
  SearchBoxProvided & StartSearchProps & OnClickProp
> = ({ currentRefinement, refine, startSearch, onClick }) => {
  return (
    <div>
      <SearchBoxContainer>
        <SearchBoxInput
          startSearch={startSearch}
          type="search"
          value={startSearch ? currentRefinement : ""}
          onChange={(event) => refine(event.currentTarget.value)}
        />
        <SearchAltContainer startSearch={startSearch} onClick={onClick}>
          <SearchAlt width={20} height={20} />
        </SearchAltContainer>
      </SearchBoxContainer>
    </div>
  );
};

const AlgoliaHits = connectHits(SearchHits);

const AlgoliaResults = connectStateResults(
  ({ searchState, searchResults, children }) =>
    searchResults && searchResults.nbHits !== 0 && searchState.query ? (
      <>{children}</>
    ) : (
      <></>
    )
);

const AlgoliaSearchBox = connectSearchBox(SearchBox);

interface SearchProps {
  startSearch: boolean;
  setStartSearch: (value: ((prevState: boolean) => boolean) | boolean) => void;
}

export const Search: React.FC<SearchProps> = ({
  startSearch,
  setStartSearch,
}) => {
  const searchClient = useMemo(
    () =>
      algoliasearch(
        process.env.GATSBY_ALGOLIA_APP_ID ?? "",
        process.env.GATSBY_ALGOLIA_SEARCH_KEY ?? ""
      ),
    []
  );

  return (
    <>
      <InstantSearch indexName="fabrizioduroni.it" searchClient={searchClient}>
        <AlgoliaSearchBox
          startSearch={startSearch}
          onClick={() => setStartSearch(!startSearch)}
        />
        {startSearch && (
          <AlgoliaResults>
            <AlgoliaHits />
          </AlgoliaResults>
        )}
      </InstantSearch>
    </>
  );
};
