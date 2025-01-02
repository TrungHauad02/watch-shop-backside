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
 *     summary: Get all products
 *     tags:
 *       - Product
 *     responses:
 *       200:
 *         description: Products found
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

export const productRoute = router;
