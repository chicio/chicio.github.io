import React, { useMemo } from "react";
import {
  connectHits,
  connectSearchBox,
  connectStateResults,
  InstantSearch,
} from "react-instantsearch-dom";
import algoliasearch from "algoliasearch/lite";
import { HitsProvided, SearchBoxProvided } from "react-instantsearch-core";
import styled, { css } from "styled-components";
import { SearchAlt } from "styled-icons/boxicons-regular";
import { mediaQuery } from "../utils-css/media-query";
import { Container } from "../atoms/container";
import { List } from "../atoms/list";
import { Paragraph } from "../atoms/paragraph";
import { Link } from "gatsby";
import { isIOS } from "react-device-detect";

const SearchListContainer = styled(Container)`
  position: absolute;
  top: 55px;
  right: 0;
  left: 0;
  bottom: 0;
  height: calc(100vh - 55px ${isIOS ? " - 100px" : ""});
  overflow: scroll;
  border-radius: 4px;
`;

const SearchHitsList = styled(List)`
  list-style: none;
  padding: ${(props) => props.theme.spacing[2]};
  margin: ${(props) => props.theme.spacing[6]} 0;
  background-color: ${(props) => props.theme.light.generalBackground};
  border-radius: 4px;

  ${mediaQuery.dark} {
    background-color: ${(props) => props.theme.dark.generalBackground};
  }
`;

const SearchHitContainer = styled.li`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${(props) => props.theme.light.dividerColor};

  ${mediaQuery.dark} {
    border-bottom: 1px solid ${(props) => props.theme.dark.dividerColor};
  }
`;

const SearchLink = styled(Link)`
  text-decoration: none;
  display: flex;
  flex-direction: column;
`;

const SearchTitle = styled(Paragraph)`
  font-size: ${(props) => props.theme.fontSizes[3]};
  color: ${(props) => props.theme.light.accentColor};

  ${mediaQuery.dark} {
    color: ${(props) => props.theme.dark.accentColor};
  }
`;

const SearchHits: React.FC<
  HitsProvided<{ title: string; slug: string; description: string }>
> = ({ hits }) => (
  <SearchListContainer>
    <SearchHitsList>
      {hits.map((hit, index) => (
        <SearchHitContainer key={"SearchResult" + index}>
          <SearchLink to={hit.slug}>
            <SearchTitle>{hit.title}</SearchTitle>
            <Paragraph>{hit.description}</Paragraph>
          </SearchLink>
        </SearchHitContainer>
      ))}
    </SearchHitsList>
  </SearchListContainer>
);

const SearchBoxContainer = styled.div`
  transform: translate(0, 0);
  margin-left: auto;
  position: absolute;
  top: 10px;
  right: 10px;

  ${mediaQuery.minWidth.sm} {
    position: static;
    margin-left: auto;
  }
`;

interface StartSearchProps {
  startSearch: boolean;
}

const SearchAltContainer = styled.span<StartSearchProps>`
  position: absolute;
  top: 50%;
  right: -3px;
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
  color: ${(props) => props.theme.light.textAbovePrimaryColor};
  border: 2px solid ${(props) => props.theme.light.textAbovePrimaryColor};
  outline: none;
  transition: 0.5s;

  ${mediaQuery.dark} {
    color: ${(props) => props.theme.dark.textAbovePrimaryColor};
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
    <SearchBoxContainer>
      <SearchBoxInput
        startSearch={startSearch}
        value={startSearch ? currentRefinement : ""}
        placeholder={startSearch ? "Search" : ""}
        onChange={(event) => refine(event.currentTarget.value)}
        disabled={!startSearch}
      />
      <SearchAltContainer startSearch={startSearch} onClick={onClick}>
        <SearchAlt width={20} height={20} />
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
