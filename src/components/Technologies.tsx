import { StaticImage } from "gatsby-plugin-image";
import * as React from "react";

interface TechnologiesProps {
  author: string;
}

export const Technologies: React.FC<TechnologiesProps> = ({ author }) => (
  <div id="who-am-i-container" className="container-fluid who-am-i-container">
    <div className="row who-am-i">
      <div
        id="who-am-i-description"
        className="row col-12 who-am-i-description d-flex justify-content-center"
      >
        <p>
          {`I'm ${author}, a software developer with many years of experience.
                        I have a strong knowledge of the following languages: C++, Objective-C, Swift, C, Java, PHP,
                        JavaScript, TypeScript, Kotlin.
                        I develop mobile app since 2010 and web application since 2005. I'm also passionate about computer
                        graphics.
                    `}
        </p>
      </div>
      <div
        id="who-am-i-icons"
        className="row col-12 d-flex justify-content-center align-items-center"
      >
        <StaticImage
          className="who-am-i-icons"
          objectFit={"contain"}
          src={"../images/technologies/xcode.png"}
          alt={"xcode"}
        />
        <StaticImage
          className="who-am-i-icons"
          src={"../images/technologies/swift.png"}
          alt={"swift"}
        />
        <StaticImage
          className="who-am-i-icons"
          objectFit={"contain"}
          src={"../images/technologies/android.png"}
          alt={"android"}
        />
        <StaticImage
          className="who-am-i-icons"
          src={"../images/technologies/cpp.png"}
          alt={"c++"}
        />
        <StaticImage
          className="who-am-i-big-icon"
          objectFit={"contain"}
          src={"../images/technologies/opengl-es.png"}
          alt={"opengl"}
        />
        <StaticImage
          className="who-am-i-icons"
          objectFit={"contain"}
          src={"../images/technologies/react.png"}
          alt={"react"}
        />
        <StaticImage
          className="who-am-i-icons"
          objectFit={"contain"}
          src={"../images/technologies/php.png"}
          alt={"php"}
        />
        <StaticImage
          className="who-am-i-icons"
          objectFit={"contain"}
          src={"../images/technologies/html-css-js.png"}
          alt={"js"}
        />
        <StaticImage
          className="who-am-i-icons"
          objectFit={"contain"}
          src={"../images/technologies/typescript.png"}
          alt={"typescript"}
        />
      </div>
    </div>
  </div>
);
