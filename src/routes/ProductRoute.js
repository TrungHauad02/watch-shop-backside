import express from "express";
import { productController } from "../controllers/ProductController.js";

/**
 * @swagger
 * tags:
 *   name: Product
 *   description: Product management
 */

const router = express.Router();

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products with pagination, sorting, and filtering
 *     tags:
 *       - Product
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: size
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: Sorting criteria in the format field1,-field2
 *       - in: query
 *         name: filter
 *         schema:
 *           type: string
 *         description: JSON string for filtering products
 *
 */
router.get("/", productController.getAllProduct);

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     tags:
 *       - Product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Product Name"
 *               productId:
 *                 type: string
 *                 example: "PROD123"
 *               brandId:
 *                 type: string
 *                 example: "BRAND123"
 *               categoryId:
 *                 type: string
 *                 example: "CAT123"
 *               quantity:
 *                 type: number
 *                 example: 10
 *               price:
 *                 type: number
 *                 example: 100
 *               discount:
 *                 type: number
 *                 example: 10
 *               details:
 *                 type: object
 *                 properties:
 *                   caseSize:
 *                     type: number
 *                     example: 42
 *                   caseThickness:
 *                     type: number
 *                     example: 10
 *                   waterResistance:
 *                     type: number
 *                     example: 50
 *                   powerReserve:
 *                     type: number
 *                     example: 48
 *                   caseMaterial:
 *                     type: string
 *                     example: "Stainless Steel"
 *                   strapMaterial:
 *                     type: string
 *                     example: "Leather"
 *                   movement:
 *                     type: string
 *                     example: "Automatic"
 *                   glassType:
 *                     type: string
 *                     example: "Sapphire"
 *                   functions:
 *                     type: array
 *                     items:
 *                       type: string
 *                     example: ["Chronograph", "Date"]
 *                   origin:
 *                     type: string
 *                     example: "Switzerland"
 *                   gender:
 *                     type: string
 *                     enum: ["male", "female", "unisex"]
 *                     example: "unisex"
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Bad request
 */
router.post("/", productController.createProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags:
 *       - Product
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID
 *     responses:
 *       200:
 *         description: Product found
 *       404:
 *         description: Product not found
 */
router.get("/:id", productController.getProductById);

/**
 * @swagger
 * /api/products/{id}:
 *   patch:
 *     summary: Update a product by ID
 *     tags:
 *       - Product
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Updated Product Name"
 *               brandId:
 *                 type: string
 *                 example: "UPDATED_BRAND123"
 *               categoryId:
 *                 type: string
 *                 example: "UPDATED_CAT123"
 *               quantity:
 *                 type: number
 *                 example: 20
 *               price:
 *                 type: number
 *                 example: 150
 *               discount:
 *                 type: number
 *                 example: 5
 *               details:
 *                 type: object
 *                 properties:
 *                   caseSize:
 *                     type: number
 *                     example: 44
 *                   caseThickness:
 *                     type: number
 *                     example: 12
 *                   waterResistance:
 *                     type: number
 *                     example: 100
 *                   powerReserve:
 *                     type: number
 *                     example: 72
 *                   caseMaterial:
 *                     type: string
 *                     example: "Titanium"
 *                   strapMaterial:
 *                     type: string
 *                     example: "Rubber"
 *                   movement:
 *                     type: string
 *                     example: "Quartz"
 *                   glassType:
 *                     type: string
 *                     example: "Mineral"
 *                   functions:
 *                     type: array
 *                     items:
 *                       type: string
 *                     example: ["Alarm", "Timer"]
 *                   origin:
 *                     type: string
 *                     example: "Japan"
 *                   gender:
 *                     type: string
 *                     enum: ["male", "female", "unisex"]
 *                     example: "male"
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Product not found
 */
router.patch("/:id", productController.updateProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags:
 *       - Product
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 */
router.delete("/:id", productController.deleteProductById);

export const productRoute = router;
