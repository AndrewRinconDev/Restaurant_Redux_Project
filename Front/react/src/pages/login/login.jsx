import React, { useEffect, useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import HomePage from "../home/home";
import ClientesPage from "../clientes/clientes";
import axios from "axios";
import { BASE_URL } from "../../config";
import CryptoJS from "crypto-js";
import * as loginService from "../../services/login/loginService";
import { useDispatch } from "react-redux";
import { setUserDataAction } from "../../redux/slices/usuarioSlice";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorLogin, setErrorLogin] = useState("");
  const [email, setEmail] = useState("");
  const [clave, setClave] = useState("");

  //useEffect(()=>{}) // Ciclo de vida, se le conoce como fase de actualización o constante monitoreo, se va a ejecutar siempre, cada que detecte que hay un cambio en un hook, sin importar el hook que sea.
  //useEffect(()=>{},[]) // Ciclo de vida, se le conoce como fase de montaje, se ejecuta una sola vez cuando carga el componente, sin importar que los demás hooks states cambien de estado.
  //useEffect(()=>{},[usuario]) // Ciclo de vida, se le conoce como fase de actualización, se ejecuta cuando carga el componente y cuando detecta que hay un cambio, en el hook state que tiene como dependencia.

  // useEffect(()=>{
  //     console.log("Mostrando mensaje")
  // })

  useEffect(() => {
    // const password = "contraseña123";
    // const encryptedPassword = encryptPassword(password);

    // console.log("Contraseña cifrada:", encryptedPassword.ciphertext);
    // console.log("Clave secreta:", encryptedPassword.key);

    // const decryptedPassword = decryptPassword(
    //   encryptedPassword.ciphertext,
    //   encryptedPassword.key
    // );

    // console.log("Contraseña descifrada:", decryptedPassword);

    var key = CryptoJS.enc.Hex.parse("7365637265745f6b65795f24262f4624");

    var iv = CryptoJS.enc.Hex.parse("7365637265745f69765f282425222628");

    var cipherData = CryptoJS.AES.encrypt("1234", key, { iv: iv });

    var data = CryptoJS.AES.decrypt(cipherData, key, { iv: iv });
    console.log(cipherData.toString());
    console.log(data.toString(CryptoJS.enc.Utf8));
  }, []);

  // useEffect(()=>{
  //     console.log("Mostrando mensaje")
  // },[email])

  // useEffect(()=>{
  //     return () => {
  //         console.log("Destruyendo el componente")
  //     }
  // },[])

  // const handleLogin = async () => {
  //     try {
  //         const payload = {
  //             correo: email,
  //             clave: clave
  //         }
  //         const {data} = await axios.post(`${BASE_URL}/usuarios/login`, payload);
  //         console.log(data);
  //         localStorage.setItem('jwt_token', JSON.stringify(data.jwt))

  //     } catch (error) {
  //         console.log(error)
  //     }
  // }

  const handleLogin = async () => {
    try {
      if (email === "" || clave === "") {
        setErrorLogin("Debes ingresar un correo y una contraseña");
        return;
      }
      const payload = {
        correo: email,
        clave: clave,
      };
      const result = await loginService.intentLogin(payload);

      localStorage.setItem("jwt_token", result.jwt);
      dispatch(setUserDataAction(result.userData));
      navigate("/pedidos");
    } catch (error) {
      console.log(error);
      setErrorLogin("Usuario o contraseña incorrectos");
    }
  };

  return (
    <section style={{ height: "100vh" }}>
      <div className="container h-100 d-flex justify-content-center align-items-center">
        <div className="row d-flex justify-content-center w-100">
          <form className="col-lg-6">
            <div className="card">
              <div className="card-body">
                <div className="card-title text-center">Login</div>

                <div className="mb-3">
                  <label>Correo</label>
                  <input
                    type="email"
                    id="email"
                    onBlur={(e) => setEmail(e.target.value)}
                    className="form-control"
                    name="correo"
                  />
                </div>

                <div className="mb-3">
                  <label>Clave</label>
                  <input
                    type="password"
                    id="password"
                    onBlur={(e) => setClave(e.target.value)}
                    className="form-control"
                    name="clave"
                  />
                </div>

                <div className="mb-3">
                  <button
                    type="button"
                    onClick={() => handleLogin()}
                    className="btn btn-success"
                  >
                    Enviar
                  </button>
                </div>

                <div className="mb-3">
                  <p className="text-danger">{errorLogin}</p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      {/* <HomePage emailProp={email}/>
        <ClientesPage emailProp={email} /> */}
    </section>
  );
};

export default LoginPage;
