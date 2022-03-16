import React, { memo } from 'react';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MuiTable from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

// import CodeBlock from './CodeBlock';

const components = {
  p: Typography,
  h1: (() => {
    const H1 = (props: any) => <Typography {...props} component="h1" variant="h1" />;
    return memo(H1);
  })(),
  h2: (() => {
    const H2 = (props: any) => <Typography {...props} component="h2" variant="h2" />;
    return memo(H2);
  })(),
  h3: (() => {
    const H3 = (props: any) => <Typography {...props} component="h3" variant="h3" />;
    return memo(H3);
  })(),
  h4: (() => {
    const H4 = (props: any) => <Typography {...props} component="h4" variant="h4" />;
    return memo(H4);
  })(),
  h5: (() => {
    const H5 = (props: any) => <Typography {...props} component="h5" variant="h5" />;
    return memo(H5);
  })(),
  h6: (() => {
    const H6 = (props: any) => <Typography {...props} component="h6" variant="h6" />;
    return memo(H6);
  })(),
  blockquote: (() => {
    const Blockquote = (props: any) => (
      <Paper style={{ borderLeft: '4px solid grey', padding: 8 }} {...props} />
    );
    return memo(Blockquote);
  })(),
  ul: (() => {
    const Ul = (props: any) => <Typography {...props} component="ul" />;
    return memo(Ul);
  })(),
  ol: (() => {
    const Ol = (props: any) => <Typography {...props} component="ol" />;
    return memo(Ol);
  })(),
  li: (() => {
    const Li = (props: any) => <Typography {...props} component="li" />;
    return memo(Li);
  })(),
  table: (() => {
    const Table = (props: any) => <MuiTable {...props} />;
    return memo(Table);
  })(),
  tr: (() => {
    const Tr = (props: any) => <TableRow {...props} />;
    return memo(Tr);
  })(),
  td: (() => {
    const Td = ({ align, ...props }: any) => <TableCell align={align || undefined} {...props} />;
    return memo(Td);
  })(),
  tbody: (() => {
    const TBody = (props: any) => <TableBody {...props} />;
    return memo(TBody);
  })(),
  th: (() => {
    const Th = ({ align, ...props }: any) => <TableCell align={align || undefined} {...props} />;
    return memo(Th);
  })(),
  thead: (() => {
    const THead = (props: any) => <TableHead {...props} />;
    return memo(THead);
  })(),
  // code: CodeBlock,
  hr: Divider,
  input: (() => {
    const Input = (props: any) => {
      const { type } = props;
      if (type === 'checkbox') {
        return <Checkbox {...props} disabled={false} readOnly={true} />;
      }
      return <input {...props} />;
    };
    return memo(Input);
  })(),
  wrapper: (() => {
    const Wrapper = (props: any) => <div {...props} className="markdown-body" />;
    return memo(Wrapper);
  })(),
};

export default components;
