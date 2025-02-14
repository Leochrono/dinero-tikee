import { ReactNode } from 'react';
import { Box } from '@mui/material';
import Header from '@/components/home/header';

interface Props {
  children: ReactNode;
}

export const FullWidthLayout = ({ children }: Props) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
    <Header />
      <main>{children}</main>
    </Box>
    
  );
};
