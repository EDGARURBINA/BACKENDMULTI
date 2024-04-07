import { Router } from "express";
const router = Router()

import  *as authCtrl from "../controllers/auth.controller"
import accountLimiter from "../middlewares/rateLimitMiddleware";


router.post("/singup", authCtrl.singUp)

router.post("/singin",accountLimiter, authCtrl.singin)



export default router;
