import React, { Component } from "react"
import { Card, CardTitle, CardBody, Form, FormGroup, Input } from "reactstrap"
import { graphql, StaticQuery, Link } from "gatsby"
import Img from "gatsby-image"
class sidebar extends Component {
  render() {
    return (
      <div>
        <Card>
          <CardBody>
            <CardTitle className="text-center text-uppercase mb-3">
              Newsletter
            </CardTitle>
            <Form className="text-center">
              <FormGroup>
                <Input
                  type="email"
                  name="email"
                  placeholder="Enter email address"
                />
                <button className="btn btn-outline-primary text-uppercase mt-3">
                  Subscribe
                </button>
              </FormGroup>
            </Form>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <CardTitle className="text-center text-uppercase">
              Advertisement
            </CardTitle>
            <img
              src="https://via.placeholder.com/320x200"
              alt="Advert"
              style={{ width: "100%" }}
            />
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <CardTitle className="text-center text-uppercase mb-3">
              RECENT POSTS
            </CardTitle>
            <StaticQuery
              query={sideQuery}
              render={data => (
                <div>
                  {data.allMarkdownRemark.edges.map(({ node }) => (
                    <Card key={node.id}>
                      <Link to={node.fields.slug}>
                        <Img
                          className="card-image-top"
                          fluid={node.frontmatter.image.childImageSharp.fluid}
                        />
                      </Link>
                      <CardBody>
                        <CardTitle>
                          <Link to={node.fields.slug}>
                            {node.frontmatter.title}
                          </Link>
                        </CardTitle>
                      </CardBody>
                    </Card>
                  ))}
                </div>
              )}
            />
          </CardBody>
        </Card>
      </div>
    )
  }
}

const sideQuery = graphql`
  query MyQuery {
    allMarkdownRemark(
      limit: 3
      sort: { order: DESC, fields: frontmatter___date }
    ) {
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

export default sidebar
