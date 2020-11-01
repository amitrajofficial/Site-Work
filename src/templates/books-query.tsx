import { graphql } from "gatsby";
import BooksComponent from "../components/books";

export default BooksComponent;

export const query = graphql`
  query($formatString: String!) {
    allBook(sort: { fields: date, order: DESC }) {
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
`;
