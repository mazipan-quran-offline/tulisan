/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */

const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

// Define the template for blog post
const blogPost = path.resolve(`./src/templates/blog-post.js`);
const blogIndex = path.resolve('./src/templates/blog-index.js');
const tagTemplate = path.resolve('./src/templates/tag.js');
const isDev = process.env.NODE_ENV === "development";

/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  // Get all markdown blog posts sorted by date
  const result = await graphql(`
    {
      allMarkdownRemark(sort: { frontmatter: { date: ASC } }, limit: 1000) {
        nodes {
          id
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "DD MMMM YYYY")
            description
            tags
          }
          excerpt(pruneLength: 120)
        }
      }
    }
    `)

    if (result.errors) {
      reporter.panicOnBuild(
        `There was an error loading your blog posts`,
        result.errors
      )
      return
    }

  // Create blog posts pages.
  const posts = result.data.allMarkdownRemark.nodes;

  // Create blog post list pages
  const postsPerPage = 30;
  const numPages = Math.ceil(posts.length / postsPerPage);

  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/` : `/${i + 1}`,
      component: blogIndex,
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
        isDev,
      },
    });
  });

  // Create a page listing all posts for each tag
  const allTags = new Set(posts.flatMap(p => p.frontmatter.tags || []));
  allTags.forEach(tag => {
    createPage({
      path: `/tag/${encodeURIComponent(tag)}/`,
      component: tagTemplate,
      context: { tag },
    });
  });

  posts.forEach((post, index) => {
    const previousPostId = index === 0 ? null : posts[index - 1].id
    const nextPostId = index === posts.length - 1 ? null : posts[index + 1].id

    // posts are sorted by date ASC, so the previous entry is the older article
    const previous = index === 0 ? null : posts[index - 1];
    const next = index === posts.length - 1 ? null : posts[index + 1];

    // Pick up to 3 related posts: prioritize tag overlap, fall back to chronological proximity
    const currentTags = post.frontmatter.tags || [];
    const scored = posts
      .filter((_, i) => i !== index)
      .map(p => {
        const pTags = p.frontmatter.tags || [];
        const overlap = currentTags.filter(t => pTags.includes(t)).length;
        return { post: p, overlap };
      })
      .sort((a, b) => b.overlap - a.overlap);

    // Take top 3 by tag score; for ties keep chronological order (already sorted)
    const relatedPosts = scored.slice(0, 3).map(({ post: p }) => ({
      slug: p.fields.slug,
      title: p.frontmatter.title,
      date: p.frontmatter.date,
      tags: p.frontmatter.tags || [],
      description: p.frontmatter.description || p.excerpt,
    }));

    createPage({
      path: post.fields.slug,
      component: blogPost,
      context: {
        id: post.id,
        slug: post.fields.slug,
        isDev,
        previous,
        next,
        previousPostId,
        nextPostId,
        relatedPosts,
        tags: post.frontmatter.tags || [],
      },
    });
  });
};

/**
 * @type {import('gatsby').GatsbyNode['onCreateNode']}
 */
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value,
    });
    createNodeField({
      name: `faq`,
      node,
      value: extractFaq(node.internal.content || ``),
    });
  }
};

// Plain text for structured data: drop links, emphasis and code markers.
const toPlainText = md =>
  md
    .replace(/\[([^\]]+)\]\([^)]*\)/g, `$1`)
    .replace(/[*_`]/g, ``)
    .replace(/\s+/g, ` `)
    .trim();

/**
 * Reads the visible "## Pertanyaan yang Sering ..." section and returns its
 * questions, so FAQPage markup always matches what readers see.
 * Supported shapes (blank-line separated paragraphs):
 *   **Question?** answer on the same paragraph
 *   **Question?**\nanswer on the next line
 *   **Question?**\n\nanswer in the next paragraph
 */
const extractFaq = content => {
  const body = content.replace(/^---[\s\S]*?\n---\n?/, ``);
  const match = body.match(/^##\s+Pertanyaan yang Sering[^\n]*\n([\s\S]*?)(?=^##\s|(?![\s\S]))/m);
  if (!match) return [];

  const paragraphs = match[1].split(/\n\s*\n/).map(p => p.trim()).filter(Boolean);
  const items = [];

  for (let i = 0; i < paragraphs.length; i++) {
    const q = paragraphs[i].match(/^\*\*([^*]+\?)\*\*\s*([\s\S]*)$/);
    if (!q) continue;
    let answer = q[2];
    if (!answer && paragraphs[i + 1] && !paragraphs[i + 1].startsWith(`**`)) {
      answer = paragraphs[i + 1];
      i++;
    }
    const text = toPlainText(answer);
    if (text) items.push({ question: toPlainText(q[1]), answer: text });
  }
  return items;
};

/**
 * @type {import('gatsby').GatsbyNode['createSchemaCustomization']}
 */
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  // Explicitly define the siteMetadata {} object
  // This way those will always be defined even if removed from gatsby-config.js

  // Also explicitly define the Markdown frontmatter
  // This way the "MarkdownRemark" queries will return `null` even when no
  // blog posts are stored inside "content/blog" instead of returning an error
  createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
      social: Social
    }

    type Author {
      name: String
      summary: String
    }

    type Social {
      twitter: String
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
      tags: [String]
    }

    type FaqItem {
      question: String
      answer: String
    }

    type Fields {
      slug: String
      faq: [FaqItem]
    }
  `)
}
