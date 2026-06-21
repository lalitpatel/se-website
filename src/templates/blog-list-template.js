import React from 'react';

import Template from '../components/Template';
import Hero from '../components/Hero';
import PostsList from '../components/PostsList';
import Pagination from '../components/Pagination';
import SEO from '../components/SEO';

class BlogListTemplate extends React.Component {
  render() {
    const { siteMetadata } = this.props.pageContext;
    const { title, description } = siteMetadata;
    const posts = this.props.pageContext.posts.map(post => ({ node: post }));
    const { pageContext } = this.props;

    return (
      <Template location={this.props.location}>
        <Hero title={title} subTitle={description} />
        <section className="section">
          <div className="content container is-max-desktop">
            <PostsList posts={posts} />
          </div>
        </section>
        <section className="section">
          <Pagination nbPages={pageContext.nbPages} currentPage={pageContext.currentPage} />
        </section>
      </Template>
    );
  }
}

export default BlogListTemplate;

export const Head = props => {
  const { title, description } = props.pageContext.siteMetadata;
  return <SEO title={title} description={description} path="/posts" />;
};
