import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Navbar } from 'react-bootstrap';

const Header = () => {
  return (
    <header>
      <Container>
        <Navbar>
          <Navbar.Brand>Blog</Navbar.Brand>
          <ul>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </Navbar>
      </Container>
    </header>
  );
};

export default Header;
