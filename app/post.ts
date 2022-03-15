import path from 'path';
import { fs, fsp } from '~/utils/node.server';
import parseFrontMatter from 'front-matter';
import invariant from 'tiny-invariant';
import { marked } from 'marked';
import { bundleMDX } from '~/utils/mdx.server';

export type Post = {
  slug: string;
  title: string;
};

export type PostMarkdownAttributes = {
  title: string;
};

function isValidPostAttributes(attributes: any): attributes is PostMarkdownAttributes {
  return attributes?.title;
}

// relative to the server output not the source!
const postsPath = path.join(__dirname, '..', 'posts');

export async function getPosts() {
  const dir = await fsp.readdir(postsPath);
  return Promise.all(
    dir.map(async filename => {
      let file;
      if (!filename.endsWith('.mdx')) {
        file = await fsp.readFile(path.join(postsPath, filename, 'index.mdx'));
      } else {
        file = await fsp.readFile(path.join(postsPath, filename));
      }
      const { attributes } = parseFrontMatter(file.toString());
      invariant(isValidPostAttributes(attributes), `${filename} has bad meta data!`);
      return {
        slug: filename.replace(/\.mdx$/, ''),
        title: attributes.title,
      };
    })
  );
}

export async function getPost(slug: string) {
  const filepath = path.join(postsPath, slug + '.mdx');
  const file = await fsp.readFile(filepath);
  const { attributes, body } = parseFrontMatter(file.toString());
  invariant(isValidPostAttributes(attributes), `Post ${filepath} is missing attributes`);
  const html = marked(body);
  return { slug, html, title: attributes.title };
}

export async function getMDXPost(slug: string) {
  if (!slug) throw new Response('Not found', { status: 404 });
  let fullPath = path.join(process.cwd(), 'posts', slug);
  let postDir;
  let mdxSource = '';
  let files = {};
  const exists = fs.existsSync(fullPath);
  if (exists && (await fsp.lstat(fullPath)).isDirectory()) {
    postDir = fullPath; // need for bundling components
    const mdxPath = path.join(fullPath, 'index.mdx');
    mdxSource = await fsp.readFile(mdxPath, 'utf8');
    const mdxFiles = (await fsp.readdir(fullPath)).filter(filename => filename !== 'index.mdx');
    const results = await Promise.all(
      mdxFiles.map(async filename => fsp.readFile(`${fullPath}/${filename}`, 'utf8'))
    );
    files = Object.fromEntries(results.map((content, i) => [`./${mdxFiles[i]}`, content]));
  } else {
    if (!fullPath.endsWith('.mdx')) fullPath += '.mdx';
    // verify file exists
    if (!fs.existsSync(fullPath)) throw new Response('Not found', { status: 404 });
    mdxSource = await fsp.readFile(fullPath, 'utf8');
  }
  const { frontmatter, code } = await bundleMDX({
    source: mdxSource,
    files,
    cwd: postDir,
  });
  return { frontmatter, code };
}
