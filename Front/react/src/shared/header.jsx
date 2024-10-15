import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import cartIcon from '../assets/cart.svg';
import './header.css';

const HeaderComponent = () => {
   //Operacion de lectura de redux - opc1
  const {nombres, role} = useSelector(state => state.usuarioStore.userData)
  const {cantidadProductos} = useSelector(state => state.pedidoStore)

    return(
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Link to ="/" className="navbar-brand">Pedidos Restaurante | {role}</Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to="/" className='nav-link'>Home</Link>
            <Link to="/clientes" className='nav-link'>Clientes</Link>
            <Link to="/productos" className='nav-link'>Productos</Link>
            <Link to="/categorias" className='nav-link'>Categorias</Link>
            <Link to="/pedidos" className='nav-link'>Pedidos</Link>
            <Link to="/usuarios" className='nav-link'>Usuarios</Link>
            {/* <Link to="/login" className='nav-link'>login</Link> */}
          </Nav>
        </Navbar.Collapse>
        Bienvenido, {nombres} &nbsp;
        <Link className='btn btn-outline-secondary' to="/carrito">
          <img src={cartIcon} alt="cart icon" />
          <span className='count-products'>{cantidadProductos}</span>
        </Link>
      </Container>
    </Navbar>
  );
}
export default HeaderComponent;