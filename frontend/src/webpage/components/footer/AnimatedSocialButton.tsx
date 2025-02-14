import React from 'react';
import { IconButton, SvgIcon, styled } from '@mui/material';

interface AnimatedIconButtonProps {
  hoverColor: string;
  label: string;
}

const AnimatedIconButton = styled(IconButton, {
  shouldForwardProp: prop => prop !== 'hoverColor' && prop !== 'label',
})<AnimatedIconButtonProps>(({ theme, hoverColor, label }) => ({
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.3s ease',
  margin: theme.spacing(0, 1),
  color: 'white',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '100%',
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: hoverColor === 'instagram' ? 'transparent' : hoverColor,
    backgroundImage:
      hoverColor === 'instagram'
        ? 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)'
        : 'none',
    transition: 'all 0.3s ease',
    zIndex: 0,
  },
  '& svg': {
    position: 'relative',
    zIndex: 1,
    transition: 'all 0.3s ease',
  },
  '&:hover': {
    '&::before': {
      top: '0',
    },
    '& svg': {
      color:
        label === 'WhatsApp' || label === 'Facebook'
          ? 'white'
          : hoverColor === 'instagram'
            ? 'white'
            : theme.palette.getContrastText(hoverColor),
    },
  },
}));

interface AnimatedSocialButtonProps {
  icon: typeof SvgIcon;
  label: string;
  hoverColor: string;
  onClick?: () => void;
}

const AnimatedSocialButton: React.FC<AnimatedSocialButtonProps> = ({ icon: Icon, label, hoverColor, onClick }) => {
  return (
    <AnimatedIconButton aria-label={label} hoverColor={hoverColor} label={label} onClick={onClick}>
      <Icon />
    </AnimatedIconButton>
  );
};

export default AnimatedSocialButton;
