import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 53px;
  background-color: #353535;
  color: #bdbbb0;
`;

// const Container = styled.div`
//   width: 100%;
//   height: 55px;
//   background: linear-gradient(to right, #353535, #1a1a1a); /* Gradient background */
//   color: #bdbbb0;
//   background-size: 200% 100%;
//   animation: gradientAnimation 3s infinite alternate;

//   @keyframes gradientAnimation {
//     from {
//       background-position: 200% 0;
//     }
//     to {
//       background-position: 0 0;
//     }
//   }
// `;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 30px;
`;

const Left = styled.div`
  flex: 2.2;
  align-items: center;
`;

const Right = styled.div`
  flex: 0.8;
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

const NavbarLink = styled(NavLink)`
  text-decoration: none;
  color: #d2d7df;
  font-size: 16px;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    color: white;
  }

  &.active {
    background-color: #5d737e;
    padding: 8px;
    border-radius: 11px;
    transition: background-color 0.3s ease-in-out;
  }
`;

const Logo = styled.h3`
  font-size: 16px;
  cursor: pointer;
  color: #d2d7df;
`;

const NavItem = styled.div`
  cursor: pointer;
`;

const Navbar = () => {
  return (
    <Container>
      <Wrapper>
        <Left>
          <Logo>
            <img
              src="public/generate a logo of tyre.png"
              alt=""
              style={{ width: "50px", height: "auto" }}
            />
            <NavbarLink to="/" activeClassName="active">
              TOH
            </NavbarLink>
          </Logo>
        </Left>
        <Right>
          <NavItem>
            <NavbarLink to="/tollLogin" activeClassName="active">
              Tollgate
            </NavbarLink>
          </NavItem>
          <NavItem>
            <NavbarLink to="/user" activeClassName="active">
              View-Reports
            </NavbarLink>
          </NavItem>
          <NavItem>
            <NavbarLink to="/dealer" activeClassName="active">
              Dealer
            </NavbarLink>
          </NavItem>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
