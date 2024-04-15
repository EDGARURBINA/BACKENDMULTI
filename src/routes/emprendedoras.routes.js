import { Router } from "express";

const router = Router()
import *as emprenderodorasCtrl from "../controllers/emprendedora.controller"
import { emprendedorasLimiter } from "../middlewares/rateLimitMiddleware";

import { authJwt } from "../middlewares";

router.post("/", [authJwt.verifyToken, authJwt.isAdmin], emprenderodorasCtrl.createEmprendedora)

router.get("/", emprenderodorasCtrl.getEmprendedoras)

router.put("/:numeroCliente", [authJwt.verifyToken, authJwt.isAdmin],emprenderodorasCtrl.updateEmprendedoraByNumeroCliente)

router.delete("/:emprendedorasId", [authJwt.verifyToken, authJwt.isAdmin, emprendedorasLimiter],emprenderodorasCtrl.deleteEmprendedoraById)
 

export default router;

