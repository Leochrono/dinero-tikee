import { BankLogo } from "../../styles/constUsuario";

interface CreditHeaderProps {
  institution: {
    logo: string;
    name: string;
  };
}

const CreditHeader = ({ institution }: CreditHeaderProps) => {
  return (
    <BankLogo>
      <img src={institution.logo} alt={institution.name} />
    </BankLogo>
  );
};

export default CreditHeader;