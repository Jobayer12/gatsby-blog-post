const { slugify } = require("./src/util/utilityFunction")
const path = require("path")
const _ = require("lodash")

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === "MarkdownRemark") {
    const slugFromTitle = slugify(node.frontmatter.title)
    createNodeField({
      node,
      name: "slug",
      value: slugFromTitle,
    })
  }
}

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  // Page templates
  const templates = {
    singlePostTemplate: path.resolve("src/templates/single-post.js"),
    tag: path.resolve("src/templates/tag-posts.js"),
    postList: path.resolve("src/templates/page-post.js"),
  }

  const res = await graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              author
              tags
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  if (res.errors) return Promise.reject(res.errors)

  // Extracting all posts from res
  const posts = res.data.allMarkdownRemark.edges

  // Create single post pages
  posts.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: templates.singlePostTemplate,
      context: {
        // Passing slug for template to use to fetch the post
        slug: node.fields.slug,
      },
    })
  })

  let tags = []
  _.each(posts, edge => {
    if (_.get(edge, "node.frontmatter.tags")) {
      tags = tags.concat(edge.node.frontmatter.tags)
    }
  })

  let tagPostCounts = {}
  tags.forEach(tag => {
    tagPostCounts[tag] = (tagPostCounts[tag] || 0) + 1
  })

  tags = _.uniq(tags)

  tags.forEach(tag => {
    createPage({
      path: `/tag/${slugify(tag)}`,
      component: templates.tag,
      context: {
        tag,
      },
    })
  })

  const postsPerPage = 2
  const numberOfPages = Math.ceil(posts.length / postsPerPage)

  Array.from({ length: numberOfPages }).forEach((_, index) => {
    const isFirstPage = index === 0
    const currentPage = index + 1

    // Skip first page because of index.js
    if (isFirstPage) return

    createPage({
      path: `/page/${currentPage}`,
      component: templates.postList,
      context: {
        limit: postsPerPage,
        skip: index * postsPerPage,
        numberOfPages: numberOfPages,
        currentPage: currentPage,
      },
    })
  })
}
