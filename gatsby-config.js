const path = require('path');
const config = require('./data/site-config');

module.exports = {
  siteMetadata: {
    title: config.siteTitle,
    author: config.authorName,
    description: config.siteDescription,
    ...config
  },
  pathPrefix: config.pathPrefix,
  trailingSlash: 'never',
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: 'posts',
        path: 'content/posts'
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: 'pages',
        path: 'content/pages'
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: 'images',
        path: 'content/images'
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: 'projects',
        path: 'content/projects'
      }
    },
    {
      resolve: `gatsby-plugin-page-creator`,
      options: {
        path: path.join(__dirname, `src`, `pages`)
      }
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        mdxOptions: {
          remarkPlugins: [require('remark-gfm')]
        },
        gatsbyRemarkPlugins: [
          { resolve: 'gatsby-remark-smartypants' },
          {
            resolve: 'gatsby-remark-autolink-headers',
            options: {
              offsetY: `100`,
              icon: false,
              maintainCase: true,
              removeAccents: true,
              isIconAfterHeader: false
            }
          }
        ]
      }
    },
    `gatsby-plugin-sass`,
    `gatsby-plugin-use-query-params`,
    {
      resolve: `gatsby-plugin-htaccess`,
      options: {
        DisallowSymLinks: true
      }
    }
  ]
};
