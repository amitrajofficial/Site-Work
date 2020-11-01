/**
 * Implement Gatsby's Node APIs in this file.
 *
 * Additional sources:
 * - https://www.gatsbyjs.com/docs/schema-customization/
 * - https://www.gatsbyjs.org/docs/node-apis/
 *
 * This file is based off:
 * - https://github.com/LekoArts/gatsby-themes/blob/master/themes/gatsby-theme-minimal-blog-core/gatsby-node.js
 */
const kebabCase = require(`lodash.kebabcase`);
const withOverridenDefaults = require(`./default-options`);

// Create general interfaces that you could can use to leverage other data sources
// The core theme sets up MDX as a type for the general interface
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;

  const types = `
    interface Book @nodeInterface {
      id: ID!
      slug: String! @slugify
      title: String!
      date: Date! @dateformat
      excerpt(pruneLength: Int = 160): String!
      body: String!
      html: String
      timeToRead: Int
      tags: [BookTag]
      banner: File @fileByRelativePath
      description: String
      canonicalUrl: String
    }

    type BookTag {
      name: String
      slug: String
    }

    type MdxBook implements Node & Book {
      slug: String! @slugify
      title: String!
      date: Date! @dateformat
      excerpt(pruneLength: Int = 140): String! @mdxpassthrough(fieldName: "excerpt")
      body: String! @mdxpassthrough(fieldName: "body")
      html: String! @mdxpassthrough(fieldName: "html")
      timeToRead: Int @mdxpassthrough(fieldName: "timeToRead")
      tags: [BookTag]
      banner: File @fileByRelativePath
      description: String
      canonicalUrl: String
    }
  `;

  // types get generated
  createTypes(types);
};

// Warning! I might be misssing something done with "exports.sourceNodes" on the Gasty Theme
exports.sourceNodes = ({ actions, createContentDigest }, overridenThemeOptions) => {
  // NO-OP
};

exports.onCreateNode = ({ node, actions, getNode, createNodeId, createContentDigest }, overridenThemeOptions) => {
  
  const { createNode, createParentChildLink } = actions;
  const { booksPath } = withOverridenDefaults(overridenThemeOptions);

  // Make sure that it's an MDX node
  if (node.internal.type !== `Mdx`) {
    return;
  }

  // Create a source field
  // And grab the sourceInstanceName to differentiate the different sources
  // In this case "postsPath" and "pagesPath"
  const fileNode = getNode(node.parent);
  const source = fileNode.sourceInstanceName;

  //console.log(`Trying to create a book with source: ${source}`)

  if (node.internal.type === `Mdx` && source === booksPath) {

    //console.log(`This is a book!! With path: ${booksPath}`)

    let modifiedTags;
    if (node.frontmatter.tags) {
      modifiedTags = node.frontmatter.tags.map((tag) => ({
        name: tag,
        slug: kebabCase(tag),
      }));
    } else {
      modifiedTags = null;
    }

    const fieldData = {
      slug: node.frontmatter.slug ? node.frontmatter.slug : undefined,
      title: node.frontmatter.title,
      date: node.frontmatter.date,
      tags: modifiedTags,
      banner: node.frontmatter.banner,
      description: node.frontmatter.description,
      canonicalUrl: node.frontmatter.canonicalUrl,
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

// These template are only data-fetching wrappers that import components
const booksTemplate = require.resolve(`./src/templates/books-query.tsx`)
const bookTemplate = require.resolve(`./src/templates/book-query.tsx`)
const bookTagTemplate = require.resolve(`./src/templates/book-tag-query.tsx`)
const bookTagsTemplate = require.resolve(`./src/templates/book-tags-query.tsx`)

exports.createPages = async ({ actions, graphql, reporter }, overridenThemeOptions) => {
  const { createPage } = actions

  const {
    basePath,
    booksPagePath,
    bookTagsPagePath,
    formatString,
  } = withOverridenDefaults(overridenThemeOptions);

  createPage({
    path: `/${basePath}/${booksPagePath}`.replace(/\/\/+/g, `/`),
    component: booksTemplate,
    context: {
      formatString,
    },
  })

  createPage({
    path: `/${basePath}/${bookTagsPagePath}`.replace(/\/\/+/g, `/`),
    component: bookTagsTemplate,
  })

  const result = await graphql(`
    query {
      allBook(sort: { fields: date, order: DESC }) {
        nodes {
          slug
        }
      }
      allPage {
        nodes {
          slug
        }
      }
      tags: allBook(sort: { fields: tags___name, order: DESC }) {
        group(field: tags___name) {
          fieldValue
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(`There was an error loading your books or pages`, result.errors)
    return
  }

  const books = result.data.allBook.nodes

  books.forEach((book) => {
    createPage({
      path: book.slug,
      component: bookTemplate,
      context: {
        slug: book.slug,
        formatString,
      },
    })
  })

  const bookTags = result.data.tags.group

  if (bookTags.length > 0) {
    bookTags.forEach((bookTag) => {
      createPage({
        path: `/${basePath}/${booksPagePath}/${kebabCase(bookTag.fieldValue)}`.replace(/\/\/+/g, `/`),
        component: bookTagTemplate,
        context: {
          slug: kebabCase(bookTag.fieldValue),
          name: bookTag.fieldValue,
          formatString,
        },
      })
    })
  }
}


