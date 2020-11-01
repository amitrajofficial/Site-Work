// https://github.com/LekoArts/gatsby-starter-minimal-blog/blob/master/gatsby-config.js
// https://github.com/LekoArts/gatsby-themes/blob/master/themes/gatsby-theme-minimal-blog-core/gatsby-config.js

require(`dotenv`).config({
  path: `.env`,
})

const shouldAnalyseBundle = process.env.ANALYSE_BUNDLE

module.exports = {
  siteMetadata: {
    siteTitle: `Just Another Dev's Corner`,
    siteTitleAlt: `Just Another Dev's Corner`,
    siteHeadline: `Cesar Diez Sanchez's Software Development Corner`,
    siteUrl: `https://cesards.com`,
    siteDescription: `TODO`,
    siteLanguage: `en`,
    // siteImage: `/banner.jpg`,
    author: `Cesar Diez Sanchez`,
  },
  plugins: [
    // You can have multiple instances of this plugin to read source nodes from different locations on your
    // filesystem.
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        // Both name and patch need to match so they can be processed by gatsby-node.js
        name: `content/books`,
        path: `content/books`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        // Both name and patch need to match so they can be processed by gatsby-node.js
        name: `content/work`,
        path: `content/work`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        // Both name and patch need to match so they can be processed by gatsby-node.js
        name: `content/talks`,
        path: `content/talks`,
      },
    },
    {
      resolve: `@lekoarts/gatsby-theme-minimal-blog`,
      // See the theme's README for all available options
      options: {
        navigation: [
          {
            title: `Blog`,
            slug: `/blog`,
          },
          {
            title: `Books`,
            slug: `/books`,
          },
          // {
          //   title: `Talks`,
          //   slug: `/talks`,
          // },
          // {
          //   title: `Work`,
          //   slug: `/work`,
          // },
          // {
          //   title: `Projects`,
          //   slug: `/projects`,
          // },
          {
            title: `About`,
            slug: `/about`,
          },
        ],
        externalLinks: [
          {
            name: `Twitter`,
            url: `https://twitter.com/cesards_`,
          },
          {
            name: `Github`,
            url: `https://github.com/cesards`,
          },
          {
            name: `Linkedin`,
            url: `https://www.linkedin.com/in/cesards`,
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GOOGLE_ANALYTICS_ID,
      },
    },
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `minimal-blog - @lekoarts/gatsby-theme-minimal-blog`,
        short_name: `minimal-blog`,
        description: `Typography driven, feature-rich blogging theme with minimal aesthetics. Includes tags/categories support and extensive features for code blocks such as live preview, line numbers, and code highlighting.`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#6B46C1`,
        display: `standalone`,
        icons: [
          {
            src: `/android-chrome-192x192.png`,
            sizes: `192x192`,
            type: `image/png`,
          },
          {
            src: `/android-chrome-512x512.png`,
            sizes: `512x512`,
            type: `image/png`,
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-offline`,
      options: {
        precachePages: [`/about`, `/work`],
      },
    },
    `gatsby-plugin-netlify`,
    shouldAnalyseBundle && {
      resolve: `gatsby-plugin-webpack-bundle-analyser-v2`,
      options: {
        analyzerMode: `static`,
        reportFilename: `_bundle.html`,
        openAnalyzer: false,
      },
    },
  ].filter(Boolean),
};
