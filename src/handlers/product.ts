import { Request, Response } from "express"
import Product from "../models/Product.model"

export const getProducts = async ( req : Request , res: Response ) => { 
    try{ 
        const products = await Product.findAll({ 
            order: [ 
                ['price' , 'DESC']
            ]
        })
        res.json({ data: products })
    }catch( error ){ 
        console.log("🚀 ~ getProducts ~ error:", error);
    }
}

export const getProductById = async ( req : Request , res: Response ) => { 
    try{ 
        const { id } =  req.params;
        const product = await Product.findByPk( id );
        if(!product){ 
            return res.status(404).json({ 
                error: 'Producto No Encontrado'
            })
        }
        res.json({ data: product })
    }catch( error ){ 
        console.log("🚀 ~ getProducts ~ error:", error);
    }
}

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

export const updateProduct = async ( req : Request , res: Response ) => { 
    const { id } =  req.params;
    const product = await Product.findByPk( id );
    if(!product){ 
        return res.status(404).json({ 
            error: 'Producto No Encontrado'
        })
    }
    //Actualizar
    await product.update( req.body );
    await product.save();
    res.json({ data: product });
} 

export const updateAvailability = async ( req : Request , res: Response ) => { 
    const { id } =  req.params;
    const product = await Product.findByPk( id );
    if(!product){ 
        return res.status(404).json({ 
            error: 'Producto No Encontrado'
        })
    }
    //Actualizar
    await product.update( req.body );
    product.availability = !product.dataValues.availability
    await product.save();
    res.json({ data: product });
} 

export const deleteProduct = async ( req : Request , res: Response ) => { 
    const { id } =  req.params;
    const product = await Product.findByPk( id );
    if(!product){ 
        return res.status(404).json({ 
            error: 'Producto No Encontrado'
        })
    }
    //Eliminar de la base de datos
    await product.destroy();
    res.json({ data: 'Producto eliminado' });


} 