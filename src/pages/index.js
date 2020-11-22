import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { Helmet } from 'react-helmet'
import Hero from '../components/hero'
import Layout from '../components/layout'
import ArticlePreview from '../components/article-preview'

function Home() {
  const data = useStaticQuery(pageQuery)
  console.log(data)
  const person = data.allContentfulPerson.edges[0].node
  const heroImg = data.file.childImageSharp.fixed

  return (
    <Layout title={'Home'}>
      <div style={{ background: '#fff' }}>
        <Hero person={person} heroImg={heroImg} />
        <div className="wrapper">
          <h2 className="section-headline">Recent Ramblings</h2>
          {/* <ul className="article-list">
            {posts.map(({ node }) => {
              return (
                <li key={node.slug}>
                  <ArticlePreview article={node} />
                </li>
              )
            })}
          </ul> */}
        </div>
      </div>
    </Layout>
  )
}

export default Home

export const pageQuery = graphql`
  query HomeQuery {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulBlogPost(sort: { fields: [publishDate], order: DESC }) {
      edges {
        node {
          title
          slug
          publishDate(formatString: "MMMM Do, YYYY")
          tags
          heroImage {
            fluid(maxWidth: 350, maxHeight: 196, resizingBehavior: SCALE) {
              ...GatsbyContentfulFluid_tracedSVG
            }
          }
          description {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
    file(relativePath: { eq: "internet-love.png" }) {
      childImageSharp {
        fixed(width: 500, height: 500) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    allContentfulPerson {
      edges {
        node {
          company
          email
          name
          phone
          title
          twitter
          github
          childContentfulPersonShortBioTextNode {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
  }
`
