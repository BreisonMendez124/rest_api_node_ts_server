import { Request, Response } from "express"
import Product from "../models/Product.model"

export const createProduct = async( req : Request , res: Response ) => { 

    //Validacion de campos en una funcion asincrona
    // await check('name')
    //         .notEmpty().withMessage('El nombre del Producto no puede ir vacio')
    //         .run( req )
    // await check('price')
    //         .isNumeric().withMessage('Valor no valido')
    //         .notEmpty().withMessage('El precio del Producto no puede ir vacio')
    //         .custom( value => value > 0 ).withMessage('Precio no valido')
    //         .run( req )

    //Creacion del producto
    try {
        const product = await Product.create( req.body );
        res.json({ 
            ok: true,
            msg:'Producto guardado con exito!',
            data: product 
        })
    } catch (error) {
        console.log("🚀 ~ createProduct ~ error:", error)
    }
}