import { FC } from "react";
import styled, { css, TransientProps } from "styled-components";
import { SearchAlt } from "@styled-icons/boxicons-regular";
import { mediaQuery } from "../utils-css/media-query";
import { Container } from "../atoms/container";
import { List } from "../atoms/list";
import { Paragraph } from "../atoms/paragraph";
import { Link } from "gatsby";
import { SearchResult } from "../lunr";
import { useSearch } from "../hooks/use-search";
import { borderRadius } from "../atoms/border-radius";

const SearchListContainer = styled(Container)`
  position: absolute;
  top: 55px;
  right: 0;
  left: 0;
  bottom: 0;
  height: 80vh;
  overflow: scroll;
  ${borderRadius};
`;

const SearchHitsList = styled(List)`
  list-style: none;
  padding: ${(props) => props.theme.spacing[2]};
  margin: ${(props) => props.theme.spacing[6]} 0;
  background-color: ${(props) => props.theme.light.generalBackground};
  ${borderRadius};

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

const SearchHits: FC<{ hits: SearchResult[] }> = ({ hits }) => (
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

const SearchAltContainer = styled.span<TransientProps<StartSearchProps>>`
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
    props.$startSearch &&
    css`
      opacity: 0;
      z-index: -1;
    `}
`;

const SearchBoxInput = styled.input<TransientProps<StartSearchProps>>`
  padding: 10px;
  width: 35px;
  height: 35px;
  background: none;
  border-radius: 50px;
  box-sizing: border-box;
  font-size: ${(props) => props.theme.fontSizes[3]};
  border: 2px solid ${(props) => props.theme.light.textAbovePrimaryColor};
  outline: none;
  transition: 0.5s;
  color: transparent;

  ${mediaQuery.dark} {
    border: 2px solid ${(props) => props.theme.dark.textAbovePrimaryColor};
  }

  ${(props) =>
    props.$startSearch &&
    css`
      color: ${(props) => props.theme.light.textAbovePrimaryColor};
      width: 200px;
      background: ${(props) => props.theme.light.generalBackground};
      ${borderRadius};

      ${mediaQuery.dark} {
        color: ${(props) => props.theme.dark.textAbovePrimaryColor};
        background: ${(props) => props.theme.dark.generalBackground};
      }
    `}
`;

interface OnClickProp {
  onClick: () => void;
}

const SearchBox: FC<
  StartSearchProps & OnClickProp & { onSearch: (searchValue: string) => void }
> = ({ startSearch, onClick, onSearch }) => (
  <SearchBoxContainer>
    <SearchBoxInput
      $startSearch={startSearch}
      placeholder={startSearch ? "Search" : ""}
      onChange={(event) => onSearch(event.currentTarget.value)}
      disabled={!startSearch}
    />
    <SearchAltContainer $startSearch={startSearch} onClick={onClick}>
      <SearchAlt width={20} height={20} />
    </SearchAltContainer>
  </SearchBoxContainer>
);

interface SearchProps {
  startSearch: boolean;
  setStartSearch: (value: ((prevState: boolean) => boolean) | boolean) => void;
}

export const Search: FC<SearchProps> = ({ startSearch, setStartSearch }) => {
  const { hits, setQuery } = useSearch(startSearch);

  return (
    <>
      <SearchBox
        startSearch={startSearch}
        onClick={() => setStartSearch(!startSearch)}
        onSearch={(value) => setQuery(value)}
      />
      {startSearch && hits.length > 0 && <SearchHits hits={hits} />}
    </>
  );
};
