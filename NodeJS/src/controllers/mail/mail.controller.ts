import { Request, Response } from "express";
import * as handlebars from "handlebars";
import fs from 'fs';
import path from 'path';

//const templateRoute = path.join(__dirname, '..', 'utils', 'templates', 'bienvenida.hbs');
const templateRoute = path.join(__dirname, '../../utils/templates/bienvenida.hbs');

const postMethod = async(req: Request, res: Response) => {
    const {nombres, apellidos, identificacion} = req.body;
    console.log("mostrando el req", req.body)
    fs.readFile(templateRoute, 'utf-8', (err, data)=>{
        if(err) return res.status(500).json(err)

        try {

            //compilar la plantilla
            const compiledTemplate = handlebars.compile(data);

            //render template
            const dataToReplace = {
                nombres: nombres,
                apellidos: apellidos,
                identificacion: identificacion
            }

            const renderTemplate = compiledTemplate(dataToReplace);
            console.log(renderTemplate);
            return res.status(200).json({message: renderTemplate})
        

        } catch (error) {
            console.log("mostrando error", error)
            return res.status(500).json(err)
        }

    })
    
}


export {
    postMethod
}