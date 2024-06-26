import { Router } from "express";

const router = Router()
import *as emprenderodorasCtrl from "../controllers/emprendedora.controller"
import { emprendedorasLimiter } from "../middlewares/rateLimitMiddleware";
import { createEmprendedora } from "../controllers/emprendedora.controller";

import { authJwt } from "../middlewares";
import { validateImgField } from "../middlewares/authImg";
const multer = require('multer');
const path = require('path');
const mime = require('mime-types');


const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: Infinity,
  },
  fileFilter: (req, file, callback) => {
    const allowedMimes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (allowedMimes.includes(file.mimetype)) {
      callback(null, true);
    } else {
      callback(new Error('Solo se permiten archivos JPEG, PNG o JPG')); 
    }
  },
});

router.post("/", [authJwt.verifyToken, authJwt.isAdmin, upload.single("img")] , emprenderodorasCtrl.createEmprendedora)

router.get("/", emprenderodorasCtrl.getEmprendedoras)

router.get("/:NumeroCliente", emprenderodorasCtrl.getEmprendedoraByNumeroCliente)

router.put("/:NumeroCliente", [authJwt.verifyToken, authJwt.isAdmin, upload.single("img")], emprenderodorasCtrl.updateEmprendedoraByNumeroCliente)

router.delete("/:numeroCliente", [authJwt.verifyToken, authJwt.isAdmin],emprenderodorasCtrl.deleteEmprendedoraByNumeroCliente)
  

export default router;

