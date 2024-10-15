import React, { useEffect, useState } from 'react';
import * as categoriasService from '../../services/categorias/categoriasService'
import { Link } from 'react-router-dom';

const CategoriasPage = () => {

    const [categorias, setCategorias] = useState([])

    useEffect(()=>{
        handleGetCategorias();
    },[])

    const handleGetCategorias = async () => {
        try {
            const result = await categoriasService.GetCategorias();
            setCategorias(result);
        } catch (error) {
            console.error(error)
        }
    }

    const handleDeleteCategorias = async (id) => {
        try {
            await categoriasService.DeleteCategorias(id);
            handleGetCategorias();
        } catch (error) {
            console.error(error)
        }
    }

    return(
        <div className='container'>
            <div className='row d-flex justify-content-between'>
                <h3 className='col-md-10'>Lista de categorias</h3>
                <div className='col-md-2'>
                    <Link className="btn btn-success col-md-12" to={"/addCategorias/"}>Agregar +</Link>
                </div>
            </div>
            <div className='row'>
                <div className='col-lg-12'>
                <table className='table table-stripped'>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Nombre</th>
                                <th>Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categorias.length > 0 && categorias.map((data)=>(
                                <tr key={data}>
                                    <td>{data.id}</td>
                                    <td>{data.nombre}</td>
                                    <td>
                                        <Link className="btn btn-warning" to={"/categorias/"+data.id}>Editar</Link>
                                        <button className="btn btn-danger" onClick={() => handleDeleteCategorias(data.id)}>Eliminar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        </table>
                </div>
            </div>

        </div>
    )
}

export default CategoriasPage;