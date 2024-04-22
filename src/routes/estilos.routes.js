import { Router } from "express";

const router = Router()
import *as estilosCtrl from "../controllers/estilos.controller"

import { authJwt } from "../middlewares";
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

router.post("/", [authJwt.verifyToken, authJwt.isAdmin, upload.single("img")] , estilosCtrl.createEstilo)

router.get("/", estilosCtrl.getEstilos)

router.put("/:Clave/:Nombre", [authJwt.verifyToken, authJwt.isAdmin, upload.single("img")], estilosCtrl.updateEstiloByClave)

router.delete("/:Clave", [authJwt.verifyToken, authJwt.isAdmin], estilosCtrl.deleteEstiloByClave)
 

export default router;

