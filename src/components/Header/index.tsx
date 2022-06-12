import { FiPlusSquare } from "react-icons/fi";

import Logo from "../../assets/logo.svg";

import { Container } from "./styles";

interface HeaderProps {
  onRequestOpen: () => void;
}

export function Header({ onRequestOpen }: HeaderProps) {
  return (
    <Container>
      <header>
        <img src={Logo} alt="GoRestaurant" />
        <nav>
          <div>
            <button type="button" onClick={onRequestOpen}>
              <div className="text">Add dish</div>
              <div className="icon">
                <FiPlusSquare size={24} />
              </div>
            </button>
          </div>
        </nav>
      </header>
    </Container>
  );
}
