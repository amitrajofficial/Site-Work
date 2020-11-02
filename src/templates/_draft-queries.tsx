// import { graphql } from "gatsby"

// const query1 = graphql`
//   query($slug: String!, $formatString: String!) {
//     allBook(sort: { fields: date, order: DESC }, filter: { tags: { elemMatch: { slug: { eq: $slug } } } }) {
//       nodes {
//         slug
//         title
//         date(formatString: $formatString)
//         timeToRead
//         description
//         tags {
//           name
//           slug
//         }
//       }
//     }
//   }
//   `

//   const query = graphql`
//   query($formatString: String!) {
//     allBook(sort: { fields: date, order: DESC }) {
//       nodes {
//         slug
//         title
//         date(formatString: $formatString)
//         excerpt
//         timeToRead
//         description
//         tags {
//           name
//           slug
//         }
//       }
//     }
//   }
// `;

// const query2 = graphql`
//   query($slug: String!, $formatString: String!) {
//     book(slug: { eq: $slug }) {
//       slug
//       title
//       date(formatString: $formatString)
//       tags {
//         name
//         slug
//       }
//       description
//       body
//       timeToRead
//       banner {
//         childImageSharp {
//           resize(width: 1200, quality: 90) {
//             src
//           }
//         }
//       }
//     }
//   }
// ` 

// const query = graphql`
//   query {
//     allBook(sort: { fields: tags___name, order: DESC }) {
//       group(field: tags___name) {
//         fieldValue
//         totalCount
//       }
//     }
//   }
// `;