import React from 'react';
import Template from '../components/Template';
import Hero from '../components/Hero';
import Article from '../components/Article';
import PrevNextPost from '../components/PrevNextPost';
import SEO from '../components/SEO';
import imageSource from '../utils/image-source';

class BlogPostTemplate extends React.Component {
  render() {
    const { post, previous, next } = this.props.pageContext;
    const cover = imageSource(post.frontmatter.cover);

    return (
      <Template location={this.props.location}>
        <Hero
          heroImg={cover}
          title={post.frontmatter.title}
          subtitle={post.frontmatter.description}
        />
        <Article post={post}>{this.props.children}</Article>

        <PrevNextPost previous={previous} next={next} />
      </Template>
    );
  }
}

export default BlogPostTemplate;

export const Head = props => {
  const { post } = props.pageContext;
  const cover = imageSource(post.frontmatter.cover);
  const imageShare = imageSource(post.frontmatter.imageShare);
  return (
    <SEO
      title={post.frontmatter.title}
      description={post.excerpt}
      cover={cover}
      imageShare={imageShare}
      lang={post.frontmatter.language}
      translations={post.frontmatter.translations}
      path={post.frontmatter.slug}
      datePublished={post.frontmatter.date}
      isBlogPost
    />
  );
};
