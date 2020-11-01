


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