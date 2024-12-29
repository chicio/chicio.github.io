import lunr from "lunr";

export interface SearchResult {
  description: string;
  authors: string[];
  content: string;
  slug: string;
  tags: string[];
  title: string;
}

declare global {
  interface Window {
    __LUNR__: {
      en: {
        index: lunr.Index;
        store: {
          [ref: string]: SearchResult;
        };
      };
    };
  }
}

export {};
