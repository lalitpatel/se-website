import React from 'react';

import Template from '../components/Template';
import PostsList from '../components/PostsList';
import SEO from '../components/SEO';
import Hero from '../components/Hero';

class TagsTemplate extends React.Component {
  render() {
    const pageTitle = `#${this.props.pageContext.tag}`;
    const posts = this.props.pageContext.posts.map(post => ({ node: post }));

    return (
      <Template location={this.props.location}>
        <Hero title={pageTitle} subtitle={`Posts tagged as ${this.props.pageContext.tag}`} />

        <section className="section">
          <div className="content container is-max-desktop">
            <PostsList posts={posts} />
          </div>
        </section>
      </Template>
    );
  }
}

export default TagsTemplate;

export const Head = props => {
  return <SEO title={`Top blog posts on ${props.pageContext.tag}`} path={`/tags/${props.pageContext.tag}`} />;
};
