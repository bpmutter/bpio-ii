import type { APIRoute } from 'astro'
import { readFileSync } from 'fs'
import { join } from 'path'

export const prerender = true

export const GET: APIRoute = async () => {
  // Read the about.md file content
  const aboutPath = join(process.cwd(), 'src', 'pages', 'about.md')
  const fileContent = readFileSync(aboutPath, 'utf-8')

  // Extract just the markdown content (remove frontmatter)
  const contentMatch = fileContent.match(/^---[\s\S]*?---\n([\s\S]*)$/)
  const markdownContent = contentMatch ? contentMatch[1].trim() : fileContent

  // Add a title since the frontmatter title won't be included
  const fullContent = `# About Ben Perlmutter

${markdownContent}`

  return new Response(fullContent, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
    },
  })
}
