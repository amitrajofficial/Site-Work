import { graphql } from "gatsby"
import BookTagComponent from "../components/book-tag"

export default BookTagComponent

export const query = graphql`
  query($slug: String!, $formatString: String!) {
    allBook(sort: { fields: date, order: DESC }, filter: { tags: { elemMatch: { slug: { eq: $slug } } } }) {
      nodes {
        slug
        title
        date(formatString: $formatString)
        excerpt
        timeToRead
        description
        tags {
          name
          slug
        }
      }
    }
  }
`