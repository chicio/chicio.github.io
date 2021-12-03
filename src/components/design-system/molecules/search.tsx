import React, { useMemo, useState } from "react";
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
import { Overlay } from "../atoms/overlay";

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
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

interface StartSearchProps {
  startSearch: boolean;
}

const SearchAltContainer = styled.span<StartSearchProps>`
  position: absolute;
  top: 50%;
  right: 15px;
  transform: translate(-50%, -50%);
  font-size: 26px;
  color: #ffd52d;
  transition: 0.2s;

  ${(props) =>
    props.startSearch &&
    css`
      opacity: 0;
      z-index: -1;
    `}
`;

const SearchBoxInput = styled.input<StartSearchProps>`
  padding: 10px;
  width: 80px;
  height: 80px;
  background: none;
  border: 4px solid #ffd52d;
  border-radius: 50px;
  box-sizing: border-box;
  font-size: 26px;
  color: #ffd52d;
  outline: none;
  transition: 0.5s;

  ${(props) =>
    props.startSearch &&
    css`
      width: 350px;
      background: #272133;
      border-radius: 10px;
    `}
`;

interface OnClickProp {
  onClick: () => void;
}

const SearchBox: React.FC<
  SearchBoxProvided & StartSearchProps & OnClickProp
> = ({ currentRefinement, refine, startSearch, onClick }) => {
  return (
    <SearchBoxContainer onClick={onClick}>
      <SearchBoxInput
        startSearch={startSearch}
        type="search"
        value={currentRefinement}
        onChange={(event) =>
          refine(startSearch ? event.currentTarget.value : "")
        }
      />
      <SearchAltContainer startSearch={startSearch}>
        <SearchAlt width={25} height={25} />
      </SearchAltContainer>
    </SearchBoxContainer>
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

export const Search: React.FC = () => {
  const searchClient = useMemo(
    () =>
      algoliasearch(
        process.env.GATSBY_ALGOLIA_APP_ID ?? "",
        process.env.GATSBY_ALGOLIA_SEARCH_KEY ?? ""
      ),
    []
  );
  const [startSearch, setStartSearch] = useState(false);

  return (
    <>
      <InstantSearch indexName="fabrizioduroni.it" searchClient={searchClient}>
        <AlgoliaSearchBox
          startSearch={startSearch}
          onClick={() => setStartSearch(!startSearch)}
        />
        <AlgoliaResults>
          <AlgoliaHits />
        </AlgoliaResults>
      </InstantSearch>
      {startSearch && (
        <Overlay
          zIndex={50}
          delay={"0.2s"}
          onClick={() => setStartSearch(false)}
        />
      )}
    </>
  );
};
