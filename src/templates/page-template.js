import React from 'react';
import { graphql } from 'gatsby';

import Template from '../components/Template';
import Content from '../components/Content';
import Hero from '../components/Hero';
import SEO from '../components/SEO';
import imageSource from '../utils/image-source';

const PageTemplate = props => {
  const page = props.data.page;
  const cover = imageSource(page.frontmatter.cover);
  return (
    <Template location={props.location}>
      <Hero
        heroImg={cover}
        title={page.frontmatter.title}
        subtitle={page.frontmatter.description}
      />

      <section className="section">
        <Content date={page.frontmatter.date} translations={page.frontmatter.translations}>
          {props.children}
        </Content>
      </section>
    </Template>
  );
};

export default PageTemplate;

export const Head = props => {
  const page = props.data.page;
  const cover = imageSource(page.frontmatter.cover);
  return (
    <SEO
      title={page.frontmatter.title}
      description={page.excerpt}
      path={page.frontmatter.slug}
      cover={cover}
      lang={page.frontmatter.language || 'en'}
      translations={page.frontmatter.translations}
    />
  );
};

export const pageQuery = graphql`
  query ($slug: String!) {
    page: mdx(frontmatter: { slug: { eq: $slug } }) {
      excerpt
      frontmatter {
        title
        description
        date(formatString: "MMMM DD, YYYY")
        slug
        language
        cover {
          publicURL
          childImageSharp {
            gatsbyImageData(width: 1200, layout: CONSTRAINED, placeholder: BLURRED)
          }
        }
        translations {
          language
          link
          hreflang
        }
      }
    }
  }
`;
