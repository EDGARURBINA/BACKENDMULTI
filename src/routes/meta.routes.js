import { Router } from "express";
const router = Router()

import *as metaCtrl from "../controllers/meta.controller"

import { authJwt } from "../middlewares";

router.post("/",[authJwt.verifyToken, authJwt.isAdmin], metaCtrl.createMeta)

router.get("/",metaCtrl.getMetas)

router.get("/:metasId",metaCtrl.getMetaById)

router.put("/:metasId", [authJwt.verifyToken, authJwt.isAdmin], metaCtrl.updateMetaById)

router.delete("/:metasId", [authJwt.verifyToken, authJwt.isAdmin],metaCtrl.deleteMetaById)



export default router;