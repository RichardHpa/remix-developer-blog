import { useMemo } from 'react';
import { LoaderFunction, json, useLoaderData, Link } from 'remix';
import { getMDXComponent } from 'mdx-bundler/client';
import invariant from 'tiny-invariant';
import { getMDXPost } from '~/post';
import components from '~/utils/components';
import { Box, Button, Typography, Divider, Grid } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.slug, 'expected params.slug');
  return json(await getMDXPost(params.slug));
};

export default function Post() {
  const { code, frontmatter } = useLoaderData();

  const Component = useMemo(() => getMDXComponent(code), [code]);
  return (
    <Box>
      <Grid container spacing={2} justifyContent="space-between">
        <Grid item>
          <Typography variant="h4">{frontmatter.title}</Typography>
        </Grid>
        <Grid item>
          <Button component={Link} to="/posts" startIcon={<ArrowBackIcon />}>
            Back
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          {/* @ts-ignore */}
          <Component components={components} />
        </Grid>
      </Grid>
    </Box>
  );
}
