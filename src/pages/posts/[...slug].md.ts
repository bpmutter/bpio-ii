import type { APIRoute } from 'astro'
import { getCollection } from 'astro:content'
import { getPath } from '@/utils/getPath'

export const prerender = true

export async function getStaticPaths() {
  const posts = await getCollection('blog', ({ data }) => !data.draft)

  return posts.map((post) => ({
    params: { slug: getPath(post.id, post.filePath, false) },
    props: { post },
  }))
}

export const GET: APIRoute = async ({ props }) => {
  const { post } = props

  if (!post) {
    return new Response('Post not found', { status: 404 })
  }

  // Build the markdown content with metadata
  const content = `# ${post.data.title}

**Published:** ${post.data.pubDatetime.toISOString()}  
**Author:** ${post.data.author}  
**Tags:** ${post.data.tags.join(', ')}  

${post.data.description}

---

${post.body}`

  return new Response(content, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
    },
  })
}
