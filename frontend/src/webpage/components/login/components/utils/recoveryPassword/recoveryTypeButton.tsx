import React from 'react';
import { RecoveryButton } from "@/components/login/components/styles/constpassword";
import { RecoveryType } from './useRecovery';
import { 
  LockReset, 
  RestartAlt, 
  SyncAlt 
} from "@mui/icons-material";

interface RecoveryTypeButtonProps {
  type: RecoveryType;
  currentType: RecoveryType | "";
  onClick: (type: RecoveryType) => void;
}

export const RecoveryTypeButton: React.FC<RecoveryTypeButtonProps> = ({ 
  type, 
  currentType, 
  onClick 
}) => {
  const buttonConfig = {
    "password": {
      icon: <LockReset />,
      label: "Recuperar Contraseña"
    },
    "user": {
      icon: <RestartAlt />,
      label: "Recuperar Usuario"
    },
    "both": {
      icon: <SyncAlt />,
      label: "Recuperar Ambos"
    }
  };

  const { icon, label } = buttonConfig[type];

  return (
    <RecoveryButton
      onClick={() => onClick(type)}
      className={currentType === type ? "selected" : ""}
    >
      {icon}
      {label}
    </RecoveryButton>
  );
};