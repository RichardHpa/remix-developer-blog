import { json, Link, useLoaderData } from 'remix';
import { Grid, Box, Typography, Card, CardContent, CardActions, Button } from '@mui/material';

import { getPosts } from '~/post';
import type { Post } from '~/post';

export const loader = async () => {
  return json(await getPosts());
};

export default function Posts() {
  const posts = useLoaderData<Post[]>();

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Posts
      </Typography>
      <Grid spacing={2} container>
        {posts.map(post => (
          <Grid item xs={12} sm={6} md={4} key={post.slug}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {post.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {post.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" component={Link} to={post.slug}>
                  Learn More
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
