exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const BlogPostTemplate = require.resolve('./src/templates/blog-post-template.js');
  const PageTemplate = require.resolve('./src/templates/page-template.js');
  const PostsByTagTemplate = require.resolve('./src/templates/tags-template.js');
  const ListPostsTemplate = require.resolve('./src/templates/blog-list-template.js');

  const allMarkdownQuery = await graphql(`
    {
      allMarkdown: allMdx(
        sort: { frontmatter: { date: DESC } }
        filter: { frontmatter: { published: { ne: false } } }
        limit: 1000
      ) {
        edges {
          node {
            parent {
              ... on File {
                sourceInstanceName
              }
            }
            internal {
              contentFilePath
            }
            frontmatter {
              title
              description
              slug
              tags
              language
              cover {
                publicURL
              }
              imageShare {
                publicURL
              }
              date
              unlisted
              translations {
                language
                link
                hreflang
              }
            }
            body
            excerpt
          }
        }
      }
    }
  `);

  if (allMarkdownQuery.errors) {
    reporter.panic(allMarkdownQuery.errors);
  }

  const postPerPageQuery = await graphql(`
    {
      site {
        siteMetadata {
          title
          description
          postsPerPage
          blogPostPathPrefix
        }
      }
    }
  `);

  const markdownFiles = allMarkdownQuery.data.allMarkdown.edges;

  const posts = markdownFiles.filter(item => item.node.parent.sourceInstanceName === 'posts');

  const listedPosts = posts.filter(item => item.node.frontmatter.unlisted !== true);

  // generate paginated post list
  const postsPerPage = postPerPageQuery.data.site.siteMetadata.postsPerPage;
  const nbPages = Math.ceil(listedPosts.length / postsPerPage);

  Array.from({ length: nbPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/posts` : `/posts/pages/${i + 1}`,
      component: ListPostsTemplate,
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        slugs: listedPosts.slice(i * postsPerPage, (i + 1) * postsPerPage).map(post => post.node.frontmatter.slug),
        posts: listedPosts.slice(i * postsPerPage, (i + 1) * postsPerPage).map(post => post.node),
        siteMetadata: postPerPageQuery.data.site.siteMetadata,
        currentPage: i + 1,
        nbPages: nbPages
      }
    });
  });

  // generate blog posts
  posts.forEach((post, index, posts) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node;
    const next = index === 0 ? null : posts[index - 1].node;

    createPage({
      path: `/${postPerPageQuery.data.site.siteMetadata.blogPostPathPrefix}/${post.node.frontmatter.slug}`,
      component: `${BlogPostTemplate}?__contentFilePath=${post.node.internal.contentFilePath}`,
      context: {
        slug: post.node.frontmatter.slug,
        post: post.node,
        previous,
        next
      }
    });
  });

  // generate pages
  markdownFiles
    .filter(item => item.node.parent.sourceInstanceName === 'pages')
    .forEach(page => {
      createPage({
        path: page.node.frontmatter.slug,
        component: `${PageTemplate}?__contentFilePath=${page.node.internal.contentFilePath}`,
        context: {
          slug: page.node.frontmatter.slug
        }
      });
    });

  // generate tag page
  markdownFiles
    .filter(item => item.node.frontmatter.tags !== null)
    .reduce((acc, cur) => [...new Set([...acc, ...cur.node.frontmatter.tags])], [])
    .forEach(uniqTag => {
      createPage({
        path: `tags/${uniqTag}`,
        component: PostsByTagTemplate,
        context: {
          tag: uniqTag,
          posts: listedPosts.filter(post => (post.node.frontmatter.tags || []).includes(uniqTag)).map(post => post.node)
        }
      });
    });
};
