import { Router } from "express";
const router = Router()  

import *as productsCtrl from "../controllers/products.controller"

import { authJwt } from "../middlewares";
import { productLimiter } from "../middlewares/rateLimitMiddleware";

router.post("/", [authJwt.verifyToken, authJwt.isAdmin], productsCtrl.createProduct)

router.get("/", productLimiter, productsCtrl.getProducts)

router.get("/:productId", productsCtrl.getProducById)

router.put("/:productId", [authJwt.verifyToken, authJwt.isAdmin,productLimiter],productsCtrl.updateProductById)

router.delete("/:productId", [authJwt.verifyToken, authJwt.isAdmin, productLimiter], productsCtrl.deleteProductById)

export default router;
