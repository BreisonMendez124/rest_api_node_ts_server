import { Router } from 'express'
import { createProduct, deleteProduct, getProductById, getProducts, updateAvailability, updateProduct } from './handlers/product';
import { body, param } from 'express-validator';
import { handleInputErrors } from './middleware';

const router = Router();

//Routing
router.get("/" , getProducts );

router.get("/:id" , 
    param('id').isInt().withMessage('El ID no es valido'),
    handleInputErrors,
    getProductById 
);

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

router.put("/:id" , 
    //Validacion de campos en el router
    param('id').isInt().withMessage('El ID no es valido'),
    body('name')
        .notEmpty().withMessage('El nombre del Producto no puede ir vacio'),
    body('price')
        .isNumeric().withMessage('Valor no valido')
        .notEmpty().withMessage('El precio del Producto no puede ir vacio')
        .custom( value => value > 0 ).withMessage('Precio no valido'),
    body('availability')
        .isBoolean().withMessage('Estado no valido'),
    handleInputErrors,
    updateProduct
)

router.patch("/:id" , 
    param('id').isInt().withMessage('El ID no es valido'),
    handleInputErrors,
    updateAvailability 
)

router.delete('/:id' , 
    param('id').isInt().withMessage('El ID no es valido'),
    handleInputErrors,
    deleteProduct
)
export default router