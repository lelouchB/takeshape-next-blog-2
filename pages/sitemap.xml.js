//pages/sitemap.xml.js
import { getDataForSitemap } from "../lib/api";


const createSitemap = (data, origin) => {
    
  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
        ${data.getAuthorList.items
          .map((author) => {
            return `
                    <url>
                        <loc>${`${origin}/author/${author.slug}`}</loc>
                        <lastmod>${author._updatedAt}</lastmod>
                    </url>
                `;
          })
          .join("")}
          ${data.getPostList.items
            .map((post) => {
              return `
                      <url>
                          <loc>${`${origin}/blog/${post.slug}`}</loc>
                          <lastmod>${post._updatedAt}</lastmod>
                      </url>
                  `;
            })
            .join("")}
            ${data.getTagsList.items
              .map((tag) => {
                return `
                          <url>
                              <loc>${`${origin}/tag/${tag._id}`}</loc>
                              <lastmod>${tag._updatedAt}</lastmod>
                          </url>
                      `;
              })
              .join("")}
    </urlset>
    `;
};

export async function getServerSideProps({ res }) {
      const data = await getDataForSitemap();

      res.setHeader('Content-Type', 'text/xml')
      res.write(createSitemap(data, "https://takeshape-next-blog-2.vercel.app"))
      res.end()
  return {
    props: {
      
    },
  };
}

const SitemapIndex = () => null
export default SitemapIndex
