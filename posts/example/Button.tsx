// import { Button as MuiButton } from '@mui/material';

const Button = ({ children }: any) => {
  return (
    <button
      style={{
        backgroundColor: 'red',
        width: '200px',
      }}
    >
      {children}
    </button>
  );
};

export default Button;
