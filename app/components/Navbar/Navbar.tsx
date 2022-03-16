import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';

import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';

import { Theme, useTheme } from '~/utils/themeProvider';

const pages = ['Blog'];

export const Navbar = () => {
  const [theme, setTheme] = useTheme();

  const toggleTheme = () => {
    setTheme((prevTheme: any) => (prevTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT));
  };

  return (
    <AppBar position="static" color="inherit" elevation={0}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" noWrap component="div">
            Remix Blog
          </Typography>

          {pages.map(page => (
            <Button color="inherit" key={page} sx={{ my: 2, display: 'block' }}>
              {page}
            </Button>
          ))}

          <Box>
            <Tooltip title={theme === Theme.LIGHT ? 'Light Mode' : 'Dark Mode'}>
              <IconButton
                aria-label={theme === Theme.LIGHT ? 'Light Mode' : 'Dark Mode'}
                onClick={toggleTheme}
                sx={{ mr: 1 }}
              >
                {theme === Theme.LIGHT ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />}
              </IconButton>
            </Tooltip>
            <Tooltip title="Open settings">
              <IconButton sx={{ p: 0 }}>
                <Avatar>RH</Avatar>
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
