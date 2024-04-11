import { Router } from "express";

const router = Router()

import *as estilosCtrl from "../controllers/estilos.controller"

router.post("/", estilosCtrl.createEstilo)

router.get("/", estilosCtrl.getEstilos)

router.get("/:estiloId", estilosCtrl.getEstilosById)

router.put("/:estiloId",estilosCtrl.updateEstiloById)

router.delete("/:estiloId",estilosCtrl.deleteEstiloById)




export default router;
