import type { APIRoute } from 'astro'
import { getCollection } from 'astro:content'
import { SITE } from '@/config'
import getSortedPosts from '@/utils/getSortedPosts'
import { ABOUT_ME, CORE_COMPETENCIES, SOCIALS } from '@/constants'

export const prerender = true

export const GET: APIRoute = async () => {
  const posts = await getCollection('blog', ({ data }) => !data.draft)
  const sortedPosts = getSortedPosts(posts)

  // Get the latest posts for the homepage
  const latestPosts = sortedPosts.slice(0, SITE.postPerIndex)

  let content = `# ${SITE.title}

${ABOUT_ME.overview}

## Social Links

${SOCIALS.map((social) => `- [${social.name}](${social.href})`).join('\n')}

## Core Competencies

${CORE_COMPETENCIES.map((coreCompetency) => `- ${coreCompetency.name}`).join('\n')}

## Latest Blog Posts

`

  latestPosts.forEach((post) => {
    const postUrl = `/posts/${post.id.replace('.md', '')}`
    content += `### [${post.data.title}](${postUrl})

*${post.data.pubDatetime.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}*

${post.data.description}

---

`
  })

  content += `
## Navigation

- [View all posts](/posts)
- [Browse by tags](/tags)
- [About me](/about)
- [RSS Feed](/rss.xml)
`

  return new Response(content, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
    },
  })
}
