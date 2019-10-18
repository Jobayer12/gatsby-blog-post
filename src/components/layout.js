import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { Row, Col } from "reactstrap"
import Header from "./header"
import Sidebar from "./sidebar"
import "../styles/index.scss"

const Layout = ({ children, PageTitle }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <link
        rel="stylesheet"
        href="https://use.fontawesome.com/releases/v5.6.3/css/all.css"
        integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/"
        crossOrigin="anonymous"
      />
      <Header siteTitle={data.site.siteMetadata.title} />
      <div className="container" style={{ marginTop: "56px" }}>
        <h1>{PageTitle}</h1>
        <Row>
          <Col md="8">{children}</Col>
          <Col md="4">
            <Sidebar />
          </Col>
        </Row>
        {/* <footer>footer</footer> */}
      </div>
      <script src="../../node_modules/bootstrap/dist/js/bootstrap.min.js"></script>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
