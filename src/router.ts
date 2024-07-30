import { Router } from 'express'
import { createProduct } from './handlers/product';
import { body } from 'express-validator';
import { handleInputErrors } from './middleware';

const router = Router();

//Routing
router.get("/" , ( req , res ) => { 
    res.json( 'Desde GET' )
});

router.post("/" , 
     //Validacion de campos en el router
     body('name')
     .notEmpty().withMessage('El nombre del Producto no puede ir vacio'),
     body('price')
     .isNumeric().withMessage('Valor no valido')
     .notEmpty().withMessage('El precio del Producto no puede ir vacio')
     .custom( value => value > 0 ).withMessage('Precio no valido'),     
    handleInputErrors,
    createProduct 
);

export default router