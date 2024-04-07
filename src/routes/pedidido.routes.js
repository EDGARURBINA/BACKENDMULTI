import { Router } from "express";

const router = Router()

import *as pedidosCtrl from "../controllers/pedidos.controller"

router.post("/", pedidosCtrl.crearPedido)

router.get ("/", pedidosCtrl.getPedidos)

router.get("/:pedidoId", pedidosCtrl.getPedidoById)

router.put("/:pedidoId",pedidosCtrl.actualizarPedidoById)

router.delete("/:pedidoId", pedidosCtrl.deletePedidoById)


export default router;
