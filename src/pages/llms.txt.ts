import type { APIRoute } from 'astro'
import { getCollection } from 'astro:content'
import { SITE } from '@/config'
import getSortedPosts from '@/utils/getSortedPosts'

export const prerender = true

export const GET: APIRoute = async () => {
  // Get all non-draft blog posts
  const posts = await getCollection('blog', ({ data }) => !data.draft)
  const sortedPosts = getSortedPosts(posts)

  // Build the llms.txt content
  let content = `# ${SITE.title}

> ${SITE.desc} Senior Software Engineer at MongoDB working at the intersection of software development and technical communication, specializing in generative AI products and developer documentation.

This website features Ben's blog posts on topics including generative AI, technical documentation, RAG (Retrieval-Augmented Generation) systems, developer tools, and technical education. The site is built with Astro, AstroPaper theme, and TailwindCSS.

## Blog Posts

`

  // Add all blog posts
  sortedPosts.forEach((post) => {
    const postUrl = `/posts/${post.id}.md`
    content += `- [${post.data.title}](${postUrl}): ${post.data.description}\n`
  })

  // Add pages section
  content += `
## Pages

- [About](/about): Background information about Ben Perlmutter, his work at MongoDB, and previous experience in technical writing and content creation
- [Blog](/posts): Complete list of blog posts with search functionality
- [Tags](/tags): Browse blog posts by topic tags
- [RSS Feed](/rss.xml): Subscribe to blog updates via RSS

## Optional

- [GitHub Repository](https://github.com/bpmutter/bpio-ii): Source code for this website
- [Professional Profile](${SITE.website}): Ben's professional profile and contact information
`

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  })
}
