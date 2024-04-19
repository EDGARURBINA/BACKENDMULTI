import { Router } from "express";
const router = Router()  

import *as productsCtrl from "../controllers/products.controller"

import { authJwt } from "../middlewares";
import { productLimiter } from "../middlewares/rateLimitMiddleware";

router.post("/", [authJwt.verifyToken, authJwt.isAdmin], productsCtrl.createProduct)

router.get("/", productsCtrl.getProducts)

router.put("/:Clave", [authJwt.verifyToken, authJwt.isAdmin],productsCtrl.updateProductByClave)

router.delete("/:Clave", [authJwt.verifyToken, authJwt.isAdmin], productsCtrl.deleteProductByClave)

export default router;
