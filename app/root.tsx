import { useMemo } from 'react';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useLoaderData,
} from 'remix';
import { getThemeSession } from './utils/theme.server';
import {
  CssBaseline,
  ThemeProvider as MuiThemeProvider,
  createTheme,
  Container,
} from '@mui/material';
import { ThemeProvider, useTheme } from './utils/themeProvider';
import { Navbar } from '~/components/Navbar';

import type { PaletteMode } from '@mui/material';
import type { LinksFunction, MetaFunction, LoaderFunction } from 'remix';
import type { Theme } from '~/utils/themeProvider';

export type LoaderData = {
  theme: Theme | null;
};

export const getTheme = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {}
      : {
          background: {
            default: '#111827',
            paper: '#111827',
          },
        }),
  },
});

export let links: LinksFunction = () => {
  return [];
};

export const meta: MetaFunction = () => {
  const description = `Remix Blog`;
  return {
    description,
    keywords: 'Remix,blog',
  };
};

export const loader: LoaderFunction = async ({ request }) => {
  const themeSession = await getThemeSession(request);

  const data: LoaderData = {
    theme: themeSession.getTheme(),
  };

  return data;
};

function Document({
  children,
  title = `Remix Blog`,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  const [theme] = useTheme();

  // Update the theme only if the mode changes
  const customTheme = useMemo(() => createTheme(getTheme(theme!)), [theme]);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>{title}</title>
        <Meta />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        <Links />
      </head>
      <body>
        <MuiThemeProvider theme={customTheme}>
          <CssBaseline />
          <Navbar />
          <Container maxWidth="md">{children}</Container>
        </MuiThemeProvider>

        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  );
}

export function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  );
}

export default function AppWithProviders() {
  const data = useLoaderData<LoaderData>();
  return (
    <ThemeProvider specifiedTheme={data.theme}>
      <App />
    </ThemeProvider>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  return (
    <Document title={`${caught.status} ${caught.statusText}`}>
      <div className="error-container">
        <h1>
          {caught.status} {caught.statusText}
        </h1>
      </div>
    </Document>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <Document title="Uh-oh!">
      <div className="error-container">
        <h1>App Error</h1>
        <pre>{error.message}</pre>
      </div>
    </Document>
  );
}
