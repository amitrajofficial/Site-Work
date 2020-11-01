/**
 * Based on file: 
 * https://github.com/LekoArts/gatsby-themes/blob/master/themes/gatsby-theme-minimal-blog-core/utils/default-options.js
 */

module.exports = (overridenThemeOptions) => {
  const basePath = overridenThemeOptions.basePath || `/`
  const booksPagePath = overridenThemeOptions.booksPagePath || `/books`
  const booksPath = overridenThemeOptions.postsPath || `content/books`
  const bookTagsPagePath = overridenThemeOptions.tagsPath || `/book-tags`
  const externalLinks = overridenThemeOptions.externalLinks || []
  const navigation = overridenThemeOptions.navigation || []
  const showLineNumbers = overridenThemeOptions.showLineNumbers !== false
  const showCopyButton = overridenThemeOptions.showCopyButton !== false
  const formatString = overridenThemeOptions.formatString || `DD.MM.YYYY`

  return {
    basePath,
    booksPagePath,
    booksPath,
    bookTagsPagePath,
    externalLinks,
    navigation,
    showLineNumbers,
    showCopyButton,
    formatString
  }
}