

- Fucking Gatsby Image: https://www.gatsbyjs.com/docs/gatsby-image/



- In order to show content from different folders, we need to add:
```
{
  resolve: `gatsby-source-filesystem`,
  options: {
    name: `books`,
    path: `content/books`, // Folder path.
  },
},
```
to the gatsby-config.js



## [Shadowing](https://www.gatsbyjs.org/docs/themes/shadowing/)

- Under `@lekoarts/gatsby-theme-minimal-blog`'s directory, we've got everything we want to shadow from the main [theme parent](https://github.com/LekoArts/gatsby-themes/tree/master/themes/gatsby-theme-minimal-blog).

