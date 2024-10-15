import { createBrowserRouter } from "react-router-dom";
import HomePage from './pages/home/home'
import CategoriasPage from "./pages/categorias/categorias";
import ProductosPage from "./pages/productos/productos";
import ClientesPage from "./pages/clientes/clientes";
import PedidosPage from "./pages/pedidos/pedidos";
import LoginPage from "./pages/login/login";
import UsuariosPage from "./pages/usuarios/usuarios";
import MainLayout from "./layouts/main-layout";
import ReduxDemoPage from './pages/redux-demo/redux-demo'
import ContactoStepManualPage from "./pages/contacto/step-manual";
import ContactoStepReduxPage from "./pages/contacto/step-redux";
import VerCategoriasPage from "./pages/categorias/ver/verCategorias";
import CarritoPage from "./pages/carrito/carrito";
import VerUsuariosPage from "./pages/usuarios/ver/verUsuarios";
import VerClientesPage from "./pages/clientes/ver/verClientes";
import VerProductosPage from "./pages/productos/ver/verProductos";
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout/>,
      children: [
        {
          path: "/",
          element: <HomePage/>,
        },
        {
          path: "/categorias",
          element: <CategoriasPage/>,
        },
        {
          path: "/categorias/:id",
          element: <VerCategoriasPage/>,
        },
        {
          path: "/addCategorias/",
          element: <VerCategoriasPage/>,
        },
        {
          path: "/productos",
          element: <ProductosPage/>,
        },
        {
          path: "/productos/:id",
          element: <VerProductosPage/>,
        },
        {
          path: "/addProductos",
          element: <VerProductosPage/>,
        },
        {
          path: "/pedidos",
          element: <PedidosPage/>,
        },
        {
          path: "/carrito",
          element: <CarritoPage/>,
        },
        {
          path: "/usuarios",
          element: <UsuariosPage/>,
        },
        {
          path: "/usuarios/:id",
          element: <VerUsuariosPage/>,
        },
        {
          path: "/addUsuarios",
          element: <VerUsuariosPage/>,
        },
        {
          path: "/clientes",
          element: <ClientesPage/>,
        },
        {
          path: "/clientes/:id",
          element: <VerClientesPage/>,
        },
        {
          path: "/addClientes",
          element: <VerClientesPage/>,
        },
        {
          path: "/redux-demo",
          element: <ReduxDemoPage/>,
        },
        {
          path: "/contacto-manual",
          element: <ContactoStepManualPage/>,
        },
        {
          path: "/contacto-redux",
          element: <ContactoStepReduxPage/>,
        }
      ]
    },
    {
      path: "/login",
      element: <LoginPage/>,
    }
  ]);

export default router;