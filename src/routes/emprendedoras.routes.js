import { Router } from "express";

const router = Router()
import *as emprenderodorasCtrl from "../controllers/emprendedora.controller"
import { emprendedorasLimiter } from "../middlewares/rateLimitMiddleware";

import { authJwt } from "../middlewares";

router.post("/", [authJwt.verifyToken, authJwt.isAdmin], emprenderodorasCtrl.createEmprendedora)

router.get("/", emprenderodorasCtrl.getEmprendedoras)

router.get("/:emprendedorasId", [authJwt.verifyToken, authJwt.isAdmin],emprenderodorasCtrl.getEmprendedoraById)

router.put("/:emprendedorasId", [authJwt.verifyToken, authJwt.isAdmin],emprenderodorasCtrl.updateEmprendedoraById)

router.delete("/:emprendedorasId", [authJwt.verifyToken, authJwt.isAdmin, emprendedorasLimiter],emprenderodorasCtrl.deleteEmprendedoraById)
 

export default router;

