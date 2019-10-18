import React, { Component } from "react"
import { Link } from "gatsby"
import {
  Card,
  CardTitle,
  CardText,
  CardSubtitle,
  CardBody,
  Badge,
} from "reactstrap"
import Img from "gatsby-image"
import { slugify } from "../util/utilityFunction"

class Post extends Component {
  constructor(props) {
    super()
    this.props = props
  }

  render() {
    const { title, date, author, image, tags } = this.props.node.frontmatter
    const { excerpt } = this.props.node
    const { slug } = this.props.node.fields
    return (
      <Card>
        <Link to={slug}>
          <Img className="card-image-top" fluid={image.childImageSharp.fluid} />
        </Link>
        <CardBody>
          <CardTitle>
            <Link to={slug}>{title}</Link>
          </CardTitle>
          <CardSubtitle>
            <span className="text-info">{date}</span> by{" "}
            <span className="text-info">{author}</span>
          </CardSubtitle>
          <CardText>{excerpt}</CardText>
          <ul className="post-tags">
            {tags.map(tag => (
              <li key={tag}>
                <Link to={`/tag/${slugify(tag)}`}>
                  <Badge color="primary"> {tag} </Badge>
                </Link>
              </li>
            ))}
          </ul>
          <Link to={slug} className="btn btn-outline-primary float-right">
            Read More
          </Link>
        </CardBody>
      </Card>
    )
  }
}

export default Post
