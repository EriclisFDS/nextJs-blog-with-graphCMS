import { request, gql } from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const getPosts = async () => {
  const query = gql`
    query Assets {
      postsConnection {
        edges {
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            categories {
              slug
              name
            }
          }
        }
      }
    }
  `

  const result = await request(graphqlAPI, query)

  return result.postsConnection.edges
}

export const getPostsPerCategory = async ( slug ) => {
  const query = gql`
    query Assets( $slug: String! ) {
      postsConnection(where: {categories_some: {slug: $slug}}) {
        edges {
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            categories {
              slug
              name
            }
          }
        }
      }
    }
  `

  const result = await request(graphqlAPI, query, { slug })

  return result.postsConnection.edges
}

export const getPostsDetails = async ( slug ) => {
  const query = gql`
    query GetPostsDetails( $slug: String! ) {
      post(where: {slug: $slug}) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
        author {
          bio
          name
          id
          photo {
            url
          }
        }
        excerpt
        categories {
          slug
          name
        }
        content {
          raw
        }
      }
    }
  `

  const result = await request(graphqlAPI, query, { slug })

  return result.post
}

export const getRecentPosts = async () => {
  const query = gql`
    query GetPostDetails {
      posts(orderBy: publishedAt_ASC, last: 3) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `
  const result = await request(graphqlAPI, query)

  return result.posts
}

export const getSimilarPosts = async ( categories, slug ) => {
  const query = gql`
    query GetPostDetails($slug: String!, $categories: [String!]) {
      posts(
        where: {
          slug_not: $slug, AND: {categories_some: { slug_in: $categories }}
        }
        last: 3
      ){
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `
  const result = await request(graphqlAPI, query, { categories, slug })

  return result.posts
}

export const getCategories = async () => {
  const query = gql`
    query GetCategories {
      categories {
        name
        slug
      }
    }
  `
  const result = await request(graphqlAPI, query)

  return result.categories
}

export const submitComment = async (obj) => {
  const result = await fetch('/api/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }, 
    body: JSON.stringify(obj)
  })
  
  return result.json()
}

export const getComments = async (slug) => {
  const query = gql`
    query GetComments($slug: String!) {
      comments(where: {post: { slug: $slug }}){
        name
        createdAt
        comment
      }
    }
  `
  const result = await request(graphqlAPI, query, { slug })

  return result.comments
}