import React from 'react';
import ContentMeta from './ContentMeta';
import { MDXProvider } from '@mdx-js/react';
import { Link } from 'gatsby';

class Content extends React.Component {
  render() {
    const { children, date, tags, translations, isBlogPost } = this.props;

    return (
      <article className="container is-max-desktop">
        {(tags || date || translations) && (
          <ContentMeta date={date} tags={tags} translations={translations} isBlogPost={isBlogPost} />
        )}

        <div className="content">
          <MDXProvider components={{ Link }}>
            {children}
          </MDXProvider>
        </div>
      </article>
    );
  }
}

export default Content;
