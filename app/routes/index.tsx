import { Link } from 'remix';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export default function Index() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Button component={Link} to="/posts">
        View all Posts
      </Button>
    </Box>
  );
}
