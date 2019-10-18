import React, { Component } from "react"
import Layout from "../components/layout"
import Post from "../components/Post"
import { graphql } from "gatsby"
import Pagination from "../components/PaginationLinks"

class Pagepost extends Component {
  constructor(props) {
    super()
    this.props = props
  }

  render() {
    const posts = this.props.data.allMarkdownRemark.edges
    const { currentPage, numberOfPages } = this.props.pageContext

    return (
      <Layout pageTitle={`Page: ${currentPage}`}>
        {posts.map(({ node }) => (
          <Post key={node.id} node={node} />
        ))}
        <Pagination currentPage={currentPage} numberOfPages={numberOfPages} />
      </Layout>
    )
  }
}

export const postListQuery = graphql`
  query postListQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "MMMM Do YYYY")
            author
            tags
            image {
              childImageSharp {
                fluid(maxWidth: 650, maxHeight: 371) {
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

export default Pagepost
