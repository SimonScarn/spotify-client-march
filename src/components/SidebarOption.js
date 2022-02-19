import "../styles/Sidebar.css";
import { OptionContainer } from "../styles/Sidebar.styled.js";

export default function SidebarOption({ title, Icon }) {
  return (
    <OptionContainer>
      {Icon && <Icon className="sidebar__option--icon" />}
      <p>{title}</p>
    </OptionContainer>
  );
}
