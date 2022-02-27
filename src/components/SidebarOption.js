import { OptionContainer } from "../styles/Sidebar.styled.js";

export default function SidebarOption({ title, Icon }) {
  return (
    <OptionContainer>
      {Icon && <Icon />}
      <p>{title}</p>
    </OptionContainer>
  );
}
