import { WelcomeSection } from "../../styles/constUsuario";
import { UserProfile } from "@/src/core/types/user.types";

interface WelcomeSectionProps {
  userProfile: UserProfile | null;
}

const WelcomeSectionComponent = ({ userProfile }: WelcomeSectionProps) => {
  return (
    <WelcomeSection>
      Hola
      <span className="highlight">{userProfile?.nombres}</span>
    </WelcomeSection>
  );
};

export default WelcomeSectionComponent;