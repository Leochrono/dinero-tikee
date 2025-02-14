import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

const LogoContainer = styled(Link)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  padding: '8px',
  textDecoration: 'none',
  '&:hover': {
    opacity: 0.8
  },
  [theme.breakpoints.down('md')]: {
    display: 'none'
  }
}));

const LogoImage = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  '& img': {
    width: '202px',
    height: '202px',
    objectFit: 'contain',
    filter: 'brightness(1.2)',
    [theme.breakpoints.down('md')]: {
      width: '32px',
      height: '32px'
    }
  }
}));

const Logo = () => {
  return (
    <LogoContainer to="/">
      <LogoImage>
        <Box
          component="img"
          src="/assets/logo2.png"
          alt="Dinero Al Vuelo"
          sx={{
            maxWidth: '100%',
            height: 'auto',
          }}
        />
      </LogoImage>
    </LogoContainer>
  );
};

export default Logo;