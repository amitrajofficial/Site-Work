import { graphql } from "gatsby";
import BookTagsComponent from "../components/book-tags";

export default BookTagsComponent;

export const query = graphql`
  query {
    allBook(sort: { fields: tags___name, order: DESC }) {
      group(field: tags___name) {
        fieldValue
        totalCount
      }
    }
  }
`;
