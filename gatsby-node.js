/**
 * Implement Gatsby's Node APIs in this file.
 *
 * Additional sources:
 * - https://www.gatsbyjs.com/docs/schema-customization/
 * - https://www.gatsbyjs.org/docs/node-apis/
 *
 * This file is based off:
 * - https://github.com/LekoArts/minimal-blog-new-content-type/blob/master/gatsby-node.js
 * - https://github.com/LekoArts/gatsby-themes/blob/master/themes/gatsby-theme-minimal-blog-core/gatsby-node.js
 */

const kebabCase = require(`lodash.kebabcase`);
const withOverridenDefaults = require(`./default-options`);

const { createFilePath } = require(`gatsby-source-filesystem`)

// Create general interfaces that you could can use to leverage other data sources
// The core theme sets up MDX as a type for the general interface
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;

  createTypes(`
    interface Book @nodeInterface {
      id: ID!
      slug: String! @slugify
      title: String!
      date: Date! @dateformat
      rating: Int!
      body: String!
      html: String
      timeToRead: Int
      tags: [String]
      cover: File @fileByRelativePath
      description: String
    }

    type MdxBook implements Node & Book {
      slug: String! @slugify
      title: String!
      date: Date! @dateformat
      rating: Int!
      body: String! @mdxpassthrough(fieldName: "body")
      html: String! @mdxpassthrough(fieldName: "html")
      timeToRead: Int @mdxpassthrough(fieldName: "timeToRead")
      tags: [String]
      cover: File @fileByRelativePath
      description: String
    }
  `)

  // tags: [BookTag]

  // type BookTag {
  //   name: String
  //   slug: String
  // }

  // tags: [BookTag]
};

exports.onCreateNode = ({ node, actions, getNode, createNodeId, createContentDigest }) => {
  const { createNode, createParentChildLink } = actions;

  // Make sure that it's an MDX node
  if (node.internal.type !== `Mdx`) {
    return;
  }

  // Create a source field
  // And grab the sourceInstanceName to differentiate the different sources
  // In this case "postsPath" and "pagesPath"
  const fileNode = getNode(node.parent);
  const source = fileNode.sourceInstanceName;

  if (node.internal.type === `Mdx` && source === `books`) {
    const fieldData = {
      slug: node.frontmatter.slug ? node.frontmatter.slug : createFilePath({ node, getNode, basePath: "books" }),
      title: node.frontmatter.title,
      date: node.frontmatter.date,
      rating: node.frontmatter.rating,
      tags: node.frontmatter.tags,
      cover: node.frontmatter.cover,
      description: node.frontmatter.description,
    };

    const mdxBookId = createNodeId(`${node.id} >>> MdxBook`);

    createNode({
      ...fieldData,
      // Required fields
      id: mdxBookId,
      parent: node.id,
      children: [],
      internal: {
        type: `MdxBook`,
        contentDigest: createContentDigest(fieldData),
        content: JSON.stringify(fieldData),
        description: `Mdx implementation of the Book interface`,
      },
    });

    createParentChildLink({ parent: node, child: getNode(mdxBookId) });
  }
};

const bookTemplate = require.resolve(`./src/templates/book.jsx`)

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  const result = await graphql(`
    query {
      allBook {
        nodes {
          slug
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(`There was an error loading your books`, result.errors)
    return
  }

  const books = result.data.allBook.nodes

  books.forEach((book) => {
    createPage({
      path: book.slug,
      component: bookTemplate,
      context: {
        slug: book.slug,
      },
    })
  })
}




// These template are only data-fetching wrappers that import components
// const booksTemplate = require.resolve(`./src/templates/books-query.tsx`)
// const bookTemplate = require.resolve(`./src/templates/book-query.tsx`)
// const bookTagTemplate = require.resolve(`./src/templates/book-tag-query.tsx`)
// const bookTagsTemplate = require.resolve(`./src/templates/book-tags-query.tsx`)

// exports.createPages = async ({ actions, graphql, reporter }, overridenThemeOptions) => {
//   const { createPage } = actions

//   const {
//     basePath,
//     booksPagePath,
//     bookTagsPagePath,
//     formatString,
//   } = withOverridenDefaults(overridenThemeOptions);

//   createPage({
//     path: `/${basePath}/${booksPagePath}`.replace(/\/\/+/g, `/`),
//     component: booksTemplate,
//     context: {
//       formatString,
//     },
//   })

//   createPage({
//     path: `/${basePath}/${bookTagsPagePath}`.replace(/\/\/+/g, `/`),
//     component: bookTagsTemplate,
//   })

//   const result = await graphql(`
//     query {
//       allBook(sort: { fields: date, order: DESC }) {
//         nodes {
//           slug
//         }
//       }
//       allPage {
//         nodes {
//           slug
//         }
//       }
//       tags: allBook(sort: { fields: tags___name, order: DESC }) {
//         group(field: tags___name) {
//           fieldValue
//         }
//       }
//     }
//   `)

//   if (result.errors) {
//     reporter.panicOnBuild(`There was an error loading your books or pages`, result.errors)
//     return
//   }

//   const books = result.data.allBook.nodes

//   books.forEach((book) => {
//     createPage({
//       path: book.slug,
//       component: bookTemplate,
//       context: {
//         slug: book.slug,
//         formatString,
//       },
//     })
//   })

//   const bookTags = result.data.tags.group

//   if (bookTags.length > 0) {
//     bookTags.forEach((bookTag) => {
//       createPage({
//         path: `/${basePath}/${booksPagePath}/${kebabCase(bookTag.fieldValue)}`.replace(/\/\/+/g, `/`),
//         component: bookTagTemplate,
//         context: {
//           slug: kebabCase(bookTag.fieldValue),
//           name: bookTag.fieldValue,
//           formatString,
//         },
//       })
//     })
//   }
// }


