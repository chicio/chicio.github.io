import {
  createJsonLD,
  createMetaAttributes,
  OgPageType,
} from "../src/logic/seo";

describe("Seo", () => {
  it("createMetaAttributes", () => {
    expect(
      createMetaAttributes(
        "Fabrizio Duroni",
        "Blog",
        "url",
        "imageUrl",
        OgPageType.WebSite,
        ["keyword1", "keyword2"],
      ),
    ).toEqual([
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        httpEquiv: "X-UA-Compatible",
        content: "IE=edge",
      },
      {
        name: "p:domain_verify",
        content: "33d2d5dad0e1496d9f7974925340ea50",
      },
      {
        name: "apple-mobile-web-app-status-bar-style",
        content: "black",
      },
      {
        name: "author",
        content: "Fabrizio Duroni",
      },
      {
        name: "description",
        content: "Blog",
      },
      {
        property: "og:title",
        content: "Blog",
      },

      {
        property: "og:locale",
        content: "en_US",
      },
      {
        property: "og:description",
        content: "Blog",
      },
      {
        property: "og:url",
        content: "url",
      },
      {
        property: "og:site_name",
        content: "Fabrizio Duroni",
      },
      {
        property: "og:image",
        content: "imageUrl",
      },
      {
        name: "twitter:card",
        content: "summary",
      },
      {
        property: "twitter:image",
        content: "imageUrl",
      },
      {
        property: "twitter:title",
        content: "Blog",
      },
      {
        name: "twitter:site",
        content: "@chicio86",
      },
      {
        name: "twitter:creator",
        content: "@chicio86",
      },
      {
        property: "article:publisher",
        content: "https://www.facebook.com/fabrizio.duroni",
      },
      {
        property: "fb:app_id",
        content: "443203399348229",
      },
      {
        property: "og:type",
        content: OgPageType.WebSite,
      },
      {
        name: "msapplication-config",
        content: "browserconfig.xml",
      },
      {
        name: "msapplication-TileColor",
        content: "#303f9f",
      },
      {
        name: "msapplication-TileImage",
        content: `/mstile-144x144.png`,
      },
      {
        name: "yandex-verification",
        content: "741cf901cb1dbdf5",
      },
      {
        content: "keyword1, keyword2",
        name: "keywords",
      },
    ]);
  });

  describe("createJsonLD", () => {
    const links = {
      twitter: "https://twitter.com/chicio86",
      facebook: "https://www.facebook.com/fabrizio.duroni",
      linkedin: "https://www.linkedin.com/in/fabrizio-duroni/",
      github: "https://github.com/chicio",
      medium: "https://medium.com/@chicio",
      devto: "https://dev.to/chicio",
      instagram: "https://www.instagram.com/__chicio__/",
    };

    it("datePublished", () => {
      expect(
        createJsonLD(
          OgPageType.WebSite,
          "http://url/",
          "/image.jpg",
          "Fabrizio Duroni",
          "The title",
          links,
          ["keyword1", "keyword2"],
          "The description",
          "2021 Apr 28",
        ),
      ).toContain(`"datePublished":"2021 Apr 28"`);
    });

    it("dateModified", () => {
      expect(
        createJsonLD(
          OgPageType.WebSite,
          "http://url/",
          "/image.jpg",
          "Fabrizio Duroni",
          "The title",
          links,
          ["keyword1", "keyword2"],
          "The description",
          "2021 Apr 28",
        ),
      ).toContain(`"dateModified":"2021 Apr 28"`);
    });

    describe("@type", () => {
      it("ogPageType article", () => {
        expect(
          createJsonLD(
            OgPageType.BlogPosting,
            "http://url/",
            "/image.jpg",
            "Fabrizio Duroni",
            "The title",
            links,
            ["keyword1", "keyword2"],
            "The description",
            "2021 Apr 28",
          ),
        ).toContain(`"@type":"BlogPosting"`);
      });

      it("ogPageType website", () => {
        expect(
          createJsonLD(
            OgPageType.WebSite,
            "http://url/",
            "/image.jpg",
            "Fabrizio Duroni",
            "The title",
            links,
            ["keyword1", "keyword2"],
            "The description",
            "2021 Apr 28",
          ),
        ).toContain(`"@type":"WebSite"`);
      });

      it("ogPageType profile", () => {
        expect(
          createJsonLD(
            OgPageType.Person,
            "http://url/",
            "/image.jpg",
            "Fabrizio Duroni",
            "The title",
            links,
            ["keyword1", "keyword2"],
            "The description",
            "2021 Apr 28",
          ),
        ).toContain(`"@type":"Person"`);
      });
    });

    it("url", () => {
      expect(
        createJsonLD(
          OgPageType.WebSite,
          "http://url/",
          "/image.jpg",
          "Fabrizio Duroni",
          "The title",
          links,
          ["keyword1", "keyword2"],
          "The description",
          "2021 Apr 28",
        ),
      ).toContain(`"url":"http://url/"`);
    });

    it("image", () => {
      expect(
        createJsonLD(
          OgPageType.WebSite,
          "http://url/",
          "/image.jpg",
          "Fabrizio Duroni",
          "The title",
          links,
          ["keyword1", "keyword2"],
          "The description",
          "2021 Apr 28",
        ),
      ).toContain(`"image":"/image.jpg"`);
    });

    describe("mainEntityOfPage", () => {
      it("for OgPageType.BlogPosting", () => {
        expect(
          createJsonLD(
            OgPageType.BlogPosting,
            "http://url/",
            "/image.jpg",
            "Fabrizio Duroni",
            "The title",
            links,
            ["keyword1", "keyword2"],
            "The description",
            "2021 Apr 28",
          ),
        ).toContain(
          `"mainEntityOfPage":{\n"@type":"WebPage",\n"@id":"http://url/"\n}`,
        );
      });

      it("for other OgPageType", () => {
        let jsonLD = createJsonLD(
          OgPageType.WebSite,
          "http://url/",
          "/image.jpg",
          "Fabrizio Duroni",
          "The title",
          links,
          ["keyword1", "keyword2"],
          "The description",
          "2021 Apr 28",
        );
        expect(jsonLD.includes("mainEntityOfPage", 0)).toBeFalsy();

        jsonLD = createJsonLD(
          OgPageType.Person,
          "http://url/",
          "/image.jpg",
          "Fabrizio Duroni",
          "The title",
          links,
          ["keyword1", "keyword2"],
          "The description",
          "2021 Apr 28",
        );
        expect(jsonLD.includes("mainEntityOfPage", 0)).toBeFalsy();
      });
    });

    describe("author", () => {
      it("for OgPageType.Person", () => {
        expect(
          createJsonLD(
            OgPageType.Person,
            "http://url/",
            "/image.jpg",
            "Fabrizio Duroni",
            "The title",
            links,
            ["keyword1", "keyword2"],
            "The description",
            "2021 Apr 28",
          ).includes(
            `"author":{
          "@type":"Person",
          "name":"Fabrizio Duroni"
        }`,
            0,
          ),
        ).toBeFalsy();
      });

      it("for other OgPageType", () => {
        expect(
          createJsonLD(
            OgPageType.WebSite,
            "http://url/",
            "/image.jpg",
            "Fabrizio Duroni",
            "The title",
            links,
            ["keyword1", "keyword2"],
            "The description",
            "2021 Apr 28",
          ),
        ).toContain(`"author":{
          "@type":"Person",
          "name":"Fabrizio Duroni"
        }`);

        expect(
          createJsonLD(
            OgPageType.BlogPosting,
            "http://url/",
            "/image.jpg",
            "Fabrizio Duroni",
            "The title",
            links,
            ["keyword1", "keyword2"],
            "The description",
            "2021 Apr 28",
          ),
        ).toContain(`"author":{
          "@type":"Person",
          "name":"Fabrizio Duroni"
        }`);
      });
    });

    describe("publisher", () => {
      it("for OgPageType.Person", () => {
        expect(
          createJsonLD(
            OgPageType.Person,
            "http://url/",
            "/image.jpg",
            "Fabrizio Duroni",
            "The title",
            links,
            ["keyword1", "keyword2"],
            "The description",
            "2021 Apr 28",
          ).includes(
            `"publisher":{
          "@type":"Organization",
          "logo":{
            "@type":"ImageObject",
            "url":"/image.jpg"
          },
          "name":"Fabrizio Duroni"
        }`,
            0,
          ),
        ).toBeFalsy();
      });

      it("for other OgPageType", () => {
        expect(
          createJsonLD(
            OgPageType.WebSite,
            "http://url/",
            "/image.jpg",
            "Fabrizio Duroni",
            "The title",
            links,
            ["keyword1", "keyword2"],
            "The description",
            "2021 Apr 28",
          ),
        ).toContain(`"publisher":{
          "@type":"Organization",
          "logo":{
            "@type":"ImageObject",
            "url":"/image.jpg"
          },
          "name":"Fabrizio Duroni"
        }`);

        expect(
          createJsonLD(
            OgPageType.BlogPosting,
            "http://url/",
            "/image.jpg",
            "Fabrizio Duroni",
            "The title",
            links,
            ["keyword1", "keyword2"],
            "The description",
            "2021 Apr 28",
          ),
        ).toContain(`"publisher":{
          "@type":"Organization",
          "logo":{
            "@type":"ImageObject",
            "url":"/image.jpg"
          },
          "name":"Fabrizio Duroni"
        }`);
      });
    });

    describe("headline", () => {
      it("for OgPageType.BlogPosting", () => {
        expect(
          createJsonLD(
            OgPageType.BlogPosting,
            "http://url/",
            "/image.jpg",
            "Fabrizio Duroni",
            "The title",
            links,
            ["keyword1", "keyword2"],
            "The description",
            "2021 Apr 28",
          ),
        ).toContain(`"headline":"The title"`);
      });

      it("for other OgPageType.WebSite", () => {
        let jsonLD = createJsonLD(
          OgPageType.WebSite,
          "http://url/",
          "/image.jpg",
          "Fabrizio Duroni",
          "The title",
          links,
          ["keyword1", "keyword2"],
          "The description",
          "2021 Apr 28",
        );
        expect(jsonLD).toContain(`"headline":"Fabrizio Duroni"`);
      });

      it("for other OgPageType.Person", () => {
        let jsonLD = createJsonLD(
          OgPageType.Person,
          "http://url/",
          "/image.jpg",
          "Fabrizio Duroni",
          "The title",
          links,
          ["keyword1", "keyword2"],
          "The description",
          "2021 Apr 28",
        );
        expect(jsonLD.includes(`"headline":"Fabrizio Duroni"`)).toBeFalsy();
      });
    });

    describe("description", () => {
      it("for OgPageType.BlogPosting", () => {
        expect(
          createJsonLD(
            OgPageType.BlogPosting,
            "http://url/",
            "/image.jpg",
            "Fabrizio Duroni",
            "The title",
            links,
            ["keyword1", "keyword2"],
            "The description",
            "2021 Apr 28",
          ),
        ).toContain(`"description":"The description"`);
      });

      it("for other OgPageType", () => {
        let jsonLD = createJsonLD(
          OgPageType.WebSite,
          "http://url/",
          "/image.jpg",
          "Fabrizio Duroni",
          "The title",
          links,
          ["keyword1", "keyword2"],
          "The description",
          "2021 Apr 28",
        );
        expect(jsonLD).toContain(`"description":"The title"`);

        jsonLD = createJsonLD(
          OgPageType.Person,
          "http://url/",
          "/image.jpg",
          "Fabrizio Duroni",
          "The title",
          links,
          ["keyword1", "keyword2"],
          "The description",
          "2021 Apr 28",
        );
        expect(jsonLD).toContain(`"description":"The title"`);
      });
    });

    it("sameAs", () => {
      expect(
        createJsonLD(
          OgPageType.WebSite,
          "http://url/",
          "/image.jpg",
          "Fabrizio Duroni",
          "The title",
          links,
          ["keyword1", "keyword2"],
          "The description",
          "2021 Apr 28",
        ),
      ).toContain(`"sameAs":[
          "${links!.twitter}",
          "${links!.facebook}",
          "${links!.linkedin}",
          "${links!.github}"
        ]`);
    });

    it("name", () => {
      expect(
        createJsonLD(
          OgPageType.WebSite,
          "http://url/",
          "/image.jpg",
          "Fabrizio Duroni",
          "The title",
          links,
          ["keyword1", "keyword2"],
          "The description",
          "2021 Apr 28",
        ),
      ).toContain(`"name":"Fabrizio Duroni"`);
    });

    it("@context", () => {
      expect(
        createJsonLD(
          OgPageType.WebSite,
          "http://url/",
          "/image.jpg",
          "Fabrizio Duroni",
          "The title",
          links,
          ["keyword1", "keyword2"],
          "The description",
          "2021 Apr 28",
        ),
      ).toContain(`@context":"https://schema.org`);
    });

    it("keywords", () => {
      expect(
        createJsonLD(
          OgPageType.WebSite,
          "http://url/",
          "/image.jpg",
          "Fabrizio Duroni",
          "The title",
          links,
          ["keyword1", "keyword2"],
          "The description",
          "2021 Apr 28",
        ),
      ).toContain(`"keyword1","keyword2"`);

      expect(
        createJsonLD(
          OgPageType.Person,
          "http://url/",
          "/image.jpg",
          "Fabrizio Duroni",
          "The title",
          links,
          ["keyword1", "keyword2"],
          "The description",
          "2021 Apr 28",
        ),
      ).not.toContain(`"keyword1","keyword2"`);
    });
  });
});
