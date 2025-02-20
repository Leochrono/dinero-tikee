import React from "react";
import { LockReset, RestartAlt } from "@mui/icons-material";
import { RecoveryButton } from "@/components/login/components/styles/constpassword";
import { RecoveryType } from "./useRecovery";

interface RecoveryTypeButtonProps {
  type: RecoveryType;
  currentType: RecoveryType | "";
  onClick: (type: RecoveryType) => void;
}

export const RecoveryTypeButton: React.FC<RecoveryTypeButtonProps> = ({
  type,
  currentType,
  onClick,
}) => {
  const buttonConfig = {
    password: {
      icon: <LockReset />,
      label: "Recuperar Contraseña",
    },
    unlock: {
      icon: <RestartAlt />,
      label: "Desbloquear Usuario",
    },
  } as const;

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