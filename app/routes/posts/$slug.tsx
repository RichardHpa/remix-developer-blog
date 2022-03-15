import { useMemo } from 'react';
import { LoaderFunction, json, useLoaderData } from 'remix';
import { getMDXComponent } from 'mdx-bundler/client';
import invariant from 'tiny-invariant';
import { getMDXPost } from '~/post';

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.slug, 'expected params.slug');
  return json(await getMDXPost(params.slug));
};

export default function Post() {
  const { code, frontmatter } = useLoaderData();
  const Component = useMemo(() => getMDXComponent(code), [code]);
  return (
    <>
      <h1>{frontmatter.title}</h1>
      <div className="space-y-20">
        <Component />
      </div>
    </>
  );
}
