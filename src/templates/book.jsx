/** @jsx jsx */

// https://github.com/LekoArts/minimal-blog-new-content-type/blob/master/src/templates/book.jsx
// Inspiration for UX:
// - https://dribbble.com/shots/10865368-Library-App-Design

import { jsx, Heading } from "theme-ui"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Img from "gatsby-image"
import { graphql } from "gatsby"
import React from "react"
import StarRatingComponent from 'react-star-rating-component'
import Layout from "@lekoarts/gatsby-theme-minimal-blog/src/components/layout"

const px = [`32px`, `16px`, `8px`, `4px`]
const shadow = px.map((v) => `rgba(0, 0, 0, 0.15) 0px ${v} ${v} 0px`)


// WTF Gatsby Image - BIG TODO
// https://www.gatsbyjs.com/plugins/gatsby-image/
// https://using-contentful.gatsbyjs.org/image-api/

const Book = ({ data: { book } }) => (
  <Layout>
    <div style={{ height: "20em", width: "auto" }}>
      <Img
        style={{ height: "100%", width: "auto" }}
        imgStyle={{ objectFit: "contain" }}
        fluid={book.cover.childImageSharp.fluid}
      />
    </div>

    <Heading variant="styles.h2" style={{ textAlign: "center" }}>
      {book.title}
    </Heading>

    <Heading variant="styles.h5" style={{ textAlign: "center", marginTop: "0.2em", }}>
      by Random
    </Heading>

    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "1em 0",
      }}
    >
      <StarRatingComponent
        name="rate1"
        starCount={10}
        editing={false}
        value={book.rating}
      />
    </div>

    {/* <p
      sx={{
        color: `secondary`,
        mt: 3,
        a: { color: `secondary` },
        fontSize: [1, 1, 2],
      }}
    >
      <span>Rating: {book.rating}</span>

      {book.tags &&
        book.tags.map((tag, i) => (
          <React.Fragment key={tag}>
            {!!i && `, `}
            <span>{tag}</span>
          </React.Fragment>
        ))}

      {book.timeToRead && ` — `}
      {book.timeToRead && <span>{book.timeToRead} min read</span>}
    </p> */}

    <section
      sx={{
        my: 5,
        ".gatsby-resp-image-wrapper": {
          my: [4, 4, 5],
          boxShadow: shadow.join(`, `),
        },
      }}
    >
      <MDXRenderer>{book.body}</MDXRenderer>
    </section>
  </Layout>
);

export default Book;

export const query = graphql`
  query($slug: String!) {
    book(slug: { eq: $slug }) {
      title
      tags
      date
      rating
      body
      cover {
        childImageSharp {
          fluid(maxWidth: 1000) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  }
`;

// export const query = graphql`
//   query($slug: String!) {
//     book(slug: { eq: $slug }) {
//       title
//       tags
//       date
//       rating
//       body
//       cover {
//         childImageSharp {
//           fluid(maxWidth: 1000) {
//             ...GatsbyImageSharpFluid_withWebp
//           }
//         }
//       }
//     }
//   }
// `;


// childImageSharp {
//   resize(height: 300) {
//     src
//   }
// }



// <Img fluid={book.cover.childImageSharp.fixed} />
// export const query = graphql`
//   query($slug: String!) {
//     book(slug: { eq: $slug }) {
//       title
//       tags
//       date
//       rating
//       body
//       cover {
//         childImageSharp {
//           fixed(height: 125) {
//             base64
//             tracedSVG
//             aspectRatio
//             srcWebp
//             srcSetWebp
//             originalName
//           }
//         }
//       }
//     }
//   }
// `;


// cover {
//   childImageSharp {
//     fluid(maxHeight: 300) {
//       ...GatsbyImageSharpFluid_withWebp
//     }
//   }
// }
