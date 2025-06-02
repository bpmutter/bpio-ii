import fs from "fs";
import path from "path";
import { mkdirSync } from "fs";

interface BlogPost {
  title: string;
  body: string; // Changed from content to body to match Contentful's field name
  publishDate: string;
  slug: string;
  tags: string[];
  description?: string;
  ogImage?: string;
  featured?: boolean;
  draft?: boolean;
}

// Read the contentful export JSON file
const contentfulExportPath = path.resolve(
  process.cwd(),
  "contentful-out/blog-export.json"
);
const outputDir = path.resolve(process.cwd(), "src/data/blog");

// Create the output directory if it doesn't exist
try {
  mkdirSync(outputDir, { recursive: true });
  console.log(`Created directory: ${outputDir}`);
} catch {
  console.log(`Directory already exists: ${outputDir}`);
}

// Read the Contentful export JSON
const contentfulExport = JSON.parse(
  fs.readFileSync(contentfulExportPath, "utf-8")
);
console.log("Read Contentful export JSON");

// Extract blog posts from the Contentful export
const blogPosts: BlogPost[] = [];

// Find blogPost content type
const blogPostContentType = contentfulExport.contentTypes.find(
  (ct: {
    sys: {
      id: string;
    };
  }) => ct.sys.id === "blogPost"
);

if (!blogPostContentType) {
  console.error("Could not find blogPost content type in the export");
  process.exit(1);
}

// Find all entries with content type blogPost
const entries = contentfulExport.entries || [];
console.log(`Found ${entries.length} entries in total`);

const blogEntries = entries.filter(
  (entry: {
    sys: {
      contentType: {
        sys: {
          id: string;
        };
      };
    };
  }) => {
    return entry.sys?.contentType?.sys?.id === "blogPost";
  }
);

console.log(`Found ${blogEntries.length} blog entries`);

// Debug first entry structure
if (blogEntries.length > 0) {
  console.log(
    "First blog entry structure:",
    JSON.stringify(blogEntries[0].fields, null, 2)
  );
}

// Process each blog entry
blogEntries.forEach(
  (entry: {
    sys: {
      id: string;
      contentType: {
        sys: {
          id: string;
        };
      };
    };
    fields: {
      [key: string]: {
        [key: string]: string;
      };
    };
  }) => {
    try {
      const fields = entry.fields;
      const entryId = entry.sys.id;

      // Log all available fields
      console.log(`Entry ${entryId} has fields:`, Object.keys(fields));

      // For blogPost type, we need to adapt to the actual structure
      // Most Contentful exports have title and body fields for blog posts

      // Helper function to safely get field value regardless of structure
      const getFieldValue = (field: string) => {
        if (!fields[field]) return null;

        // If field has en-US, use that
        if (fields[field]["en-US"]) return fields[field]["en-US"];

        // Otherwise return the direct value
        return fields[field];
      };

      // Get required fields, skip if missing
      const title = getFieldValue("title");
      let body = getFieldValue("body");

      // Process images in the body content and update paths
      if (typeof body === "string") {
        // Replace Contentful image URLs with local image paths
        // Match patterns like https://images.ctfassets.net/... or //images.ctfassets.net/...
        body = body.replace(
          /(?:https?:)?\/\/(?:images|downloads)\.ctfassets\.net\/[^\s\\)\"']+/g,
          match => {
            // Extract filename from URL
            const filename = match.split("/").pop() || "placeholder.jpeg";
            return `@/assets/images/${filename}`;
          }
        );
      }

      // Define types for Contentful asset structures to avoid 'any'
      interface ContentfulAssetFields {
        file?: {
          fileName?: string;
          url?: string;
        };
      }

      interface ContentfulAssetSys {
        id?: string;
      }

      interface ContentfulAsset {
        fields?: ContentfulAssetFields;
        sys?: ContentfulAssetSys;
      }

      // Handle ogImage - point to the new image location
      let ogImage: string | undefined = undefined;
      const heroImage = getFieldValue("heroImage");

      // Process the ogImage/heroImage
      if (heroImage) {
        // Extract asset filename from Contentful structure
        let filename = "placeholder.jpeg";

        // Try to get the filename from different possible structures
        if (typeof heroImage === "object" && heroImage !== null) {
          // Cast to our defined interface instead of using 'any'
          const contentfulAsset = heroImage as ContentfulAsset;
          const fields = contentfulAsset.fields;
          const sys = contentfulAsset.sys;

          if (fields?.file?.fileName) {
            filename = fields.file.fileName;
          } else if (fields?.file?.url) {
            // Extract filename from URL if available
            const url = fields.file.url;
            const urlParts = url.split("/");
            filename = urlParts[urlParts.length - 1];
          } else if (sys?.id) {
            // Use asset ID if filename not available
            filename = `${sys.id}.jpeg`;
          }
        } else if (typeof heroImage === "string" && heroImage.includes("/")) {
          // It might be a direct URL
          const urlParts = heroImage.split("/");
          filename = urlParts[urlParts.length - 1];
        }

        // Use standardized path for all blog images
        ogImage = `/assets/images/blog/${filename}`;
      }

      // Skip if missing required fields
      if (!title || !body) {
        console.warn(`Skipping entry ${entryId} - missing title or body`);
        return;
      }

      // Get other fields - Format date exactly as Astro expects
      let publishDate = getFieldValue("publishDate");

      if (!publishDate) {
        // Format the current date in the exact format Astro expects with proper zero-padding
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0"); // Zero-pad month
        const day = String(now.getDate()).padStart(2, "0"); // Zero-pad day
        const hours = String(now.getHours()).padStart(2, "0");
        const minutes = String(now.getMinutes()).padStart(2, "0");
        const seconds = String(now.getSeconds()).padStart(2, "0");
        const milliseconds = String(now.getMilliseconds()).padStart(3, "0");
        publishDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;
      } else if (typeof publishDate === "string") {
        // Try to parse the date string into a Date object and reformat it with proper zero-padding
        try {
          const dateObj = new Date(publishDate);
          const year = dateObj.getFullYear();
          const month = String(dateObj.getMonth() + 1).padStart(2, "0"); // Zero-pad month
          const day = String(dateObj.getDate()).padStart(2, "0"); // Zero-pad day
          const hours = String(dateObj.getHours()).padStart(2, "0");
          const minutes = String(dateObj.getMinutes()).padStart(2, "0");
          const seconds = String(dateObj.getSeconds()).padStart(2, "0");
          const milliseconds = String(dateObj.getMilliseconds()).padStart(
            3,
            "0"
          );
          publishDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;
        } catch {
          // If parsing fails, use current date with proper zero-padding
          const now = new Date();
          const year = now.getFullYear();
          const month = String(now.getMonth() + 1).padStart(2, "0"); // Zero-pad month
          const day = String(now.getDate()).padStart(2, "0"); // Zero-pad day
          const hours = String(now.getHours()).padStart(2, "0");
          const minutes = String(now.getMinutes()).padStart(2, "0");
          const seconds = String(now.getSeconds()).padStart(2, "0");
          const milliseconds = String(now.getMilliseconds()).padStart(3, "0");
          publishDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;
        }
      } else if (publishDate instanceof Date) {
        // Format Date object exactly as needed with proper zero-padding
        const year = publishDate.getFullYear();
        const month = String(publishDate.getMonth() + 1).padStart(2, "0"); // Zero-pad month
        const day = String(publishDate.getDate()).padStart(2, "0"); // Zero-pad day
        const hours = String(publishDate.getHours()).padStart(2, "0");
        const minutes = String(publishDate.getMinutes()).padStart(2, "0");
        const seconds = String(publishDate.getSeconds()).padStart(2, "0");
        const milliseconds = String(publishDate.getMilliseconds()).padStart(
          3,
          "0"
        );
        publishDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;
      }
      const slug =
        getFieldValue("slug") ||
        (title as string).toLowerCase().replace(/[^\w]+/g, "-");

      // Process tags - ensure it's always an array, never null
      let tags: string[] = [];
      const tagValues = getFieldValue("tags");
      if (Array.isArray(tagValues)) {
        tags = tagValues;
      }
      // Ensure tags is always an array (not null or undefined)
      if (!tags) {
        tags = [];
      }

      // Process description
      const description = getFieldValue("description") || "";

      // Default values for optional fields
      const featured = false; // Assuming no featured flag in export
      const draft = false; // Assuming no draft flag in export

      blogPosts.push({
        title,
        body, // Using body instead of content to match our updated interface
        publishDate,
        slug,
        tags,
        description,
        featured,
        draft,
      });
    } catch (error) {
      console.error(`Error processing entry ${entry.sys.id}:`, error);
    }
  }
);

console.log(`Processed ${blogPosts.length} blog posts`);

// Write each blog post to a markdown file
blogPosts.forEach(post => {
  try {
    // Format the frontmatter

    const frontmatter = [
      "---",
      `title: "${post.title}"`,
      `author: Ben Perlmutter`,
      // The pubDatetime value in YAML needs to be a valid date, not a string
      // In YAML, date values that look like dates but aren't quoted are parsed as Date objects
      `pubDatetime: ${post.publishDate}`,
      `slug: ${post.slug}`,
      `featured: ${post.featured}`,
      `draft: ${post.draft}`,
      // Ensure tags is always output as a proper YAML array, even when empty
      post.tags && post.tags.length > 0
        ? [`tags:`, ...post.tags.map(tag => `  - ${tag}`)].join("\n")
        : `tags: []`,
      post.description ? `description: "${post.description}"` : "",
      post.ogImage ? `ogImage: ${post.ogImage}` : "",
      "---",
      "",
    ]
      .filter(Boolean)
      .join("\n");

    // Combine frontmatter and body content
    const fileContent = `${frontmatter}
${post.body}`;

    // Create a filename based on the slug
    const filename = `${post.slug}.md`;
    const filePath = path.join(outputDir, filename);

    // Write the file
    fs.writeFileSync(filePath, fileContent);
    console.log(`Written ${filename}`);
  } catch (error) {
    console.error(`Error writing post ${post.title}:`, error);
  }
});

console.log(
  `Migration complete! ${blogPosts.length} posts migrated to ${outputDir}`
);
