import { useStaticQuery, graphql } from 'gatsby';
import { getImage, getSrc } from 'gatsby-plugin-image';

const useSiteImages = imageName => {
  const result = useStaticQuery(graphql`
    {
      allFile(filter: { sourceInstanceName: { eq: "images" } }) {
        edges {
          node {
            relativePath
            publicURL
            name
          }
        }
      }
      allImageFile: allFile(filter: { sourceInstanceName: { eq: "images" }, extension: { nin: ["svg"] } }) {
        edges {
          node {
            relativePath
            childImageSharp {
              gatsbyImageData(width: 1200, layout: CONSTRAINED, placeholder: BLURRED)
            }
          }
        }
      }
    }
  `);

  if (!imageName) {
    return null;
  }

  const items = result.allFile.edges;
  const image = items.find(edge => edge.node.relativePath === imageName);
  const imageData = result.allImageFile.edges.find(edge => edge.node.relativePath === imageName);

  if (image === undefined) {
    throw new Error(`Unable to find image: ${imageName} (in content/images)`);
  }

  return {
    ...image.node,
    image: imageData ? getImage(imageData.node) : null,
    src: (imageData && getSrc(imageData.node)) || image.node.publicURL
  };
};

export default useSiteImages;
