import React from "react"
import { graphql, StaticQuery } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Post from "../components/Post"
import Pagination from "../components/PaginationLinks"

const IndexPage = () => {
  const postPerPages = 2
  let numberOfPages
  return (
    <Layout PageTitle="Code Blog">
      <SEO title="Home" />

      <StaticQuery
        query={indexQuery}
        render={data => {
          numberOfPages = Math.ceil(
            data.allMarkdownRemark.totalCount / postPerPages
          )
          return (
            <div>
              {data.allMarkdownRemark.edges.map(({ node }) => (
                <Post node={node} key={node.id} />
              ))}

              <Pagination currentPage={1} numberOfPages={numberOfPages} />
            </div>
          )
        }}
      />
    </Layout>
  )
}

const indexQuery = graphql`
  query {
    allMarkdownRemark(
      sort: { order: DESC, fields: frontmatter___date }
      limit: 2
    ) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            author
            path
            title
            date(formatString: "MM Do YYYY")
            tags
            image {
              childImageSharp {
                fluid(maxWidth: 600) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`

export default IndexPage
