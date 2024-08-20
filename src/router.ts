import { Router } from 'express'
import { createProduct, deleteProduct, getProductById, getProducts, updateAvailability, updateProduct } from './handlers/product';
import { body, param } from 'express-validator';
import { handleInputErrors } from './middleware';

const router = Router();

/**
 * @swagger
 *  components:
 *      schemas:
 *          Product:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                      description: The product ID
 *                      example: 1
 *                  name:
 *                      type: string
 *                      description: The product name
 *                      example: Computador personalizado
 *                  price:
 *                      type: integer
 *                      description: The product price
 *                      example: 300
 *                  availability:
 *                      type: boolean
 *                      description: The product availability
 *                      example: true
 * 
 */

/**
 * @swagger
 * /api/products:
 *      get:
 *          summary: Get a list of products
 *          tags:
 *              - Products
 *          description: Return a list of products
 *          responses:
 *                  '200':
 *                      description: Successful response
 *                      content:
 *                          application/json:
 *                              schema:
 *                                  type: array
 *                                  items: 
 *                                      $ref: '#/components/schemas/Product'
 * 
 * 
 */
router.get("/" , getProducts );



/**
 * @swagger
 * /api/products/{id}:
 *  get:
 *      summary: Get a product by ID
 *      tags:
 *            - Products
 *      description: Return a product based in its unique ID
 *      parameters:
 *          - in: path
 *            name: id
 *            description: The ID of the product to retrieve
 *            required: true
 *            schema:
 *                  type: integer
 *      responses:
 *          200:
 *              description: Succesful Response
 *              content:
 *                   application/json:
 *                       schemas:
 *                          $ref: '#/components/schemas/Product'
 *          404:
 *              description: Not found
 *          400:
 *              description: Bad Request - Invalid ID
 */
router.get("/:id" , 
    param('id').isInt().withMessage('El ID no es valido'),
    handleInputErrors,
    getProductById 
);


/**
 * @swagger
 * /api/products:
 *  post:
 *      summary: Creates a new Product
 *      tags:
 *          - Products
 *      description: Returns a new record in the database
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: "Monitor 50 Pulgadas"
 *                          price:
 *                              type: number
 *                              example: 399
 *      responses:
 *              201:
 *                  description: Product created successfully
 *              400:
 *                  description: Bad Request - invalid input data
 */
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

/**
 * @swagger
 * /api/products/{id}:
 *  put:
 *      summary: Updates a product with user input
 *      tags:
 *          - Products
 *      description: Return the update product
 *      parameters:
 *          - in: path
 *            name: id
 *            description: The ID of the product to retrieve
 *            required: true
 *            schema:
 *                  type: integer
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: "Monitor 50 Pulgadas"
 *                          price:
 *                              type: number
 *                              example: 399
 *                          availability:
 *                              type: boolean
 *                              example: true
 *      responses:
 *          200:
 *              description: Successful response
 *              content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad request - Invalid ID or invalid data
 *          404:
 *              description: Product Not Found
 *          
 */

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

/**
 * @swagger
 * /api/products/{id}:
 *  patch:
 *      summary: Update product availability
 *      tags:
 *          - Products
 *      description: Returns the updated availability
 *      parameters:
 *          - in: path
 *            name: id
 *            description: The ID of the product to retrieve
 *            required: true
 *            schema:
 *                  type: integer
 *      responses:
 *          200:
 *              description: Successful response
 *              content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad request - Invalid ID
 *          404:
 *              description: Product Not Found
 */

router.patch("/:id" , 
    param('id').isInt().withMessage('El ID no es valido'),
    handleInputErrors,
    updateAvailability 
)

/**
 * @swagger
 * /api/products/{id}:
 *  delete:
 *      summary: Delete a product by a given ID
 *      tags:
 *          - Products
 *      descrition: Returns a confirmation message
 *      parameters:
 *          - in: path
 *            name: id
 *            description: The ID of the product to delete
 *            required: true
 *            schema:
 *                  type: integer
 *      responses:
 *          200:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                    schema:
 *                      type: object
 *                      properties: 
 *                          data:
 *                              type: string
 *                              description: Producto eliminado  
 *                              example: Producto eliminado  
 *                      
 *          400:
 *              description: Bad request - Invalid ID
 *          404:
 *              description: Product Not Found
 *      
 */
router.delete('/:id' , 
    param('id').isInt().withMessage('El ID no es valido'),
    handleInputErrors,
    deleteProduct
)
export default router