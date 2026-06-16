import React, { Fragment } from 'react';

import PostsListItem from './PostsListItem';
import useSiteMetadata from '../hooks/use-site-config';
import estimateReadingTime from '../utils/reading-time';

const PostsList = ({ posts }) => {
  const { defaultLang } = useSiteMetadata();

  return (
    <Fragment>
      {posts.map(post => {
        const props = {
          title: post.node.frontmatter.title,
          excerpt: post.node.excerpt,
          slug: post.node.frontmatter.slug,
          timeToRead: estimateReadingTime(post.node.body || post.node.excerpt),
          language: post.node.frontmatter.language || defaultLang,
          tags: post.node.frontmatter.tags || []
        };
        return <PostsListItem key={props.slug} {...props} />;
      })}
    </Fragment>
  );
};
export default PostsList;
