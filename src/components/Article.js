import React from 'react';
import AuthorInfo from './AuthorInfo';
import Content from './Content';

class Article extends React.Component {
  render() {
    const { children, post } = this.props;

    return (
      <section className="section">
        <Content
          date={post.frontmatter.date}
          tags={post.frontmatter.tags}
          translations={post.frontmatter.translations}
          isBlogPost={true}
        >
          {children}
        </Content>
        <AuthorInfo />
      </section>
    );
  }
}

export default Article;
