import React from "react";
import { Meta, Story } from "@storybook/react";
import { BlogPage } from "../../src/components/design-system/templates/blog-page";
import {
  BlogGenericPostListPage,
  BlogGenericPostListPageProps
} from "../../src/components/design-system/templates/blog-generic-post-list-page";
import { OgPageType } from "../../src/logic/seo";

export const BlogGenericPostListPagePageStory: Story<BlogGenericPostListPageProps> = (
  args
) => <BlogGenericPostListPage {...args} />;
BlogGenericPostListPagePageStory.args = {
  title: "Archive",
  posts: [
    {
      node: {
        fields: {
          slug: "/2021/03/08/ios-test-multiple-configuration-test-plan/",
        },
        frontmatter: {
          date: "08 Mar 2021",
          title:
            "Better organize tests and run them against multiple configuration with Xcode Test Plan",
        },
      },
    },
    {
      node: {
        fields: {
          slug: "/2021/01/27/kotlin-junit5-mockk/",
        },
        frontmatter: {
          date: "27 Jan 2021",
          title: "Unit testing in Kotlin with JUnit 5 and MockK",
        },
      },
    },
    {
      node: {
        fields: {
          slug: "/2020/12/23/rest-template-webclient-spring-boot/",
        },
        frontmatter: {
          date: "23 Dec 2020",
          title:
            "Spring Boot + Kotlin Rest client cheatsheet: RestTemplate and Webclient",
        },
      },
    },
    {
      node: {
        fields: {
          slug: "/2020/10/19/swift-package-manager-resources/",
        },
        frontmatter: {
          date: "19 Oct 2020",
          title:
            "Swift Package Manager: bundling resources with a Swift Package",
        },
      },
    },
    {
      node: {
        fields: {
          slug: "/2020/08/07/webpack-workbox-service-worker-typescript/",
        },
        frontmatter: {
          date: "07 Aug 2020",
          title: "Create a service worker with Workbox, Webpack and TypeScript",
        },
      },
    },
    {
      node: {
        fields: {
          slug: "/2020/07/02/expose-uikit-to-swiftui/",
        },
        frontmatter: {
          date: "02 Jul 2020",
          title:
            "Use UIKit components in SwiftUI: UIViewControllerRepresentable and UIViewRepresentable",
        },
      },
    },
    {
      node: {
        fields: {
          slug: "/2020/06/02/dynamic-imports-webpack-chunks/",
        },
        frontmatter: {
          date: "02 Jun 2020",
          title:
            "Lazy loading of JavaScript modules by using dynamic imports and code splitting with Webpack",
        },
      },
    },
    {
      node: {
        fields: {
          slug: "/2020/05/20/dark-mode-css-sass-scss/",
        },
        frontmatter: {
          date: "20 May 2020",
          title:
            "Add dark mode support on your website with SASS and prefers-color-scheme media query",
        },
      },
    },
    {
      node: {
        fields: {
          slug: "/2020/04/19/dependecy-injection-swift/",
        },
        frontmatter: {
          date: "19 Apr 2020",
          title:
            "How to: create your SUPER simple dependency injector container in Swift",
        },
      },
    },
    {
      node: {
        fields: {
          slug: "/2020/03/06/custom-tabbar-swiftui/",
        },
        frontmatter: {
          date: "06 Mar 2020",
          title: "Create a custom TabBar in SwiftUI",
        },
      },
    },
  ],
  author: "Fabrizio Duroni",
  location: {
    pathname: "/blog/archive/",
    url: "http://localhost:8000/blog/archive/",
  },
  ogPageType: OgPageType.WebSite,
  ogImage: "/a-photo.jpg",
  trackingCategory: "archive",
};
BlogGenericPostListPagePageStory.storyName = "Blog Page Generic Post List";

export default {
  title: "Templates/Blog Page Generic Post List",
  component: BlogPage,
} as Meta;
