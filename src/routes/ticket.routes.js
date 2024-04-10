import { Router } from "express";
const router = Router()


import *as ticketCtrl from "../controllers/ticket.controller"

router.post("/", ticketCtrl.createTicket)

router.get("/",ticketCtrl.getTickets)

router.put("/:ticketId",ticketCtrl.updateTicket)

router.delete("/:ticketId",ticketCtrl.deleteTicket )


export default router;
