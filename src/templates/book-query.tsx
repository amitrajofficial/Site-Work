import { graphql } from "gatsby"
import BookComponent from "../components/book"

export default BookComponent

export const query = graphql`
  query($slug: String!, $formatString: String!) {
    book(slug: { eq: $slug }) {
      slug
      title
      date(formatString: $formatString)
      tags {
        name
        slug
      }
      description
      canonicalUrl
      body
      excerpt
      timeToRead
      banner {
        childImageSharp {
          resize(width: 1200, quality: 90) {
            src
          }
        }
      }
    }
  }
`