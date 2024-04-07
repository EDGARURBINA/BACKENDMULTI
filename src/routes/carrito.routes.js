import { Router } from "express";
const router = Router()

import *as carritoCtrl from "../controllers/carrito.controller"
import { carritoLimiter } from "../middlewares/rateLimitMiddleware";

router.post("/",[carritoLimiter], carritoCtrl.createCarrito)

router.get("/", carritoCtrl.getCarritos)

router.get("/:carritoId", [carritoLimiter] ,carritoCtrl.getCartById)

router.put("/:carritoId", carritoCtrl.updateCarritoById)

router.delete("/:carritoId",[carritoLimiter], carritoCtrl.deleteCarritoById)

export default router;