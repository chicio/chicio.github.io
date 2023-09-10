import { Project } from "../molecules/project";
import { FC } from "react";
import { projects } from "../../../logic/projects";
import { graphql, useStaticQuery } from "gatsby";

export const Projects: FC = () => {
  const projectsImages = useStaticQuery<Queries.ProjectsImagesQuery>(graphql`
    query ProjectsImages {
      allFile(
        filter: {
          relativeDirectory: { eq: "projects" }
          extension: { regex: "/(jpg)|(jpeg)|(png)/" }
        }
      ) {
        edges {
          node {
            childImageSharp {
              gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
            }
            name
          }
        }
      }
    }
  `);

  return (
    <>
      {Object.keys(projects).map((projectKey, index) => {
        const project = projects[projectKey];
        const projectImage = projectsImages.allFile.edges.find(
          (projectImage) => projectImage.node.name === projectKey,
        )!.node!.childImageSharp!.gatsbyImageData!;

        console.log(index);
        console.log(index % 2 !== 0);

        return (
          <Project
            key={project.name}
            reverse={index % 2 !== 0}
            name={project.name}
            description={project.description}
            features={project.features}
            callToActions={project.callToActions}
            image={projectImage}
          />
        );
      })}
    </>
  );
};
