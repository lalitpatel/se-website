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
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 590,
              linkImagesToOriginal: false,
              withWebp: true
            }
          },
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
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-use-query-params`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: config.siteTitle,
        short_name: config.siteTitle,
        description: config.siteDescription,
        start_url: config.pathPrefix,
        background_color: config.background_color,
        theme_color: config.themeColor,
        display: config.display,
        icon: config.icon
      }
    },
    {
      resolve: `gatsby-plugin-htaccess`,
      options: {
        DisallowSymLinks: true
      }
    }
  ]
};
