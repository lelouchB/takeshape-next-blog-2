// lib/api.js
const API_ENDPOINT = `https://api.takeshape.io/project/${process.env.NEXT_PUBLIC_TAKESHAPE_PROJECT}/v3/graphql`;
const TAKESHAPE_API_KEY = process.env.NEXT_PUBLIC_TAKESHAPE_API_KEY;

const fetchData = async (query, { variables } = {}) => {
  const res = await fetch(API_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TAKESHAPE_API_KEY}`,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const responseJson = await res.json();
  if (responseJson.errors) {
    console.error(
      "Something went Wrong. Failed to fetch API!!" + responseJson.errors
    );
  }
  return responseJson.data;
};

// get all posts to display on landing page
export async function getAllPosts(order) {
  const data = await fetchData(
    `
    query AllPosts($order : String = "desc") {
      allPosts: getPostList(sort: {field: "_createdAt", order: $order}) {
        items {
          _id
          title
          deck
          slug
          author {
            name
            slug
          }
          tags {
            name
            _id
          }
          _createdAt
        }
      }
    }
    
    `,
    {
      variables: {
        order,
      },
    }
  );
  return data.allPosts.items;
}
// get single post based on the slug passed
export async function getPostBySlug(slug) {
  const data = await fetchData(
    `
      query PostBySlug($slug: String) {
        post: getPostList(where: {slug: {eq: $slug}}) {
          items {
            _id
            title
            slug
            deck
            bodyHtml
            author{
              name
              slug
            }
            tags{
              name
              _id
            }
            _createdAt
          }
        }
      }`,
    {
      variables: {
        slug,
      },
    }
  );
  return data.post.items[0];
}

// get all slugs of the posts to generate static paths
export async function getAllSlugs() {
  const data = await fetchData(`
      {
        allPosts: getPostList {
          items {
            slug
          }
        }
      }
    `);
  return data.allPosts.items;
}

//get posts by tags
export async function getPostsByTag(_id) {
  const data = await fetchData(
    `
    query PostsByTag($_id: ID!) {
      getTags(_id: $_id) {
        postSet {
          items {
            _id
            title
            deck
            slug
            author {
              name
              slug
            }
            tags{
              name
              _id
            }
            _createdAt
          }
        }
        name
      }
    }
    `,
    {
      variables: {
        _id,
      },
    }
  );
  return data.getTags;
}

// get all tags of the posts to generate static paths
export async function getAllPostsTags() {
  const data = await fetchData(`
      {
        allTags: getTagsList {
          items {
            _id
            name
          }
        }
      }
    `);
  return data.allTags.items;
}

// get all slugs of the authors to generate static paths
export async function getAllAuthorSlugs() {
  const data = await fetchData(
    `
    {
      allAuthors: getAuthorList {
        items {
          slug
        }
      }
    }
    
    `
  );
  return data.allAuthors.items;
}

// get single author based on the slug passed
export async function getAuthorBySlug(slug) {
  const data = await fetchData(
    `
      query AuthorBySlug($slug: String) {
        author: getAuthorList(where: {slug: {eq: $slug}}) {
          items {
            biographyHtml
            name
            photo {
              path
            }
            slug
            postSet {
              total
              items {
                title
                deck
                _id
                slug
                tags{
                  name
                  _id
                }
                _createdAt
              }
            } 
          }
        }
      }`,
    {
      variables: {
        slug,
      },
    }
  );
  return data.author.items[0];
}

// search for posts based on the query passed
export async function searchPosts(terms) {
  const data = await fetchData(
    `
    query SearchPosts ($terms: String ) {
      allPosts: getPostList(terms: $terms) {
        items {
          _id
          title
          deck
          slug
          author {
            name
            slug
          }
          tags{
            name
            _id
          }
          _createdAt
        }
      }
    }
    
    `,
    {
      variables: {
        terms,
      },
    }
  );
  return data.allPosts.items;
}

// get data for sitemap
export async function getDataForSitemap() {
  const data = await fetchData(`
     
query Sitemap {
  getAuthorList {
    total
    items {
      _updatedAt
      slug
    }
  }
  getPostList {
    total
    items {
      _updatedAt
      slug
    }
  }
  getTagsList {
    total
    items {
      _id
      _updatedAt
    }
  }
}
    `);
  return data;
}
