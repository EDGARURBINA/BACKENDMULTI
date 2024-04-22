import { Router } from "express";
const router = Router()

import  *as authCtrl from "../controllers/auth.controller"
import { accountLimiter } from "../middlewares/rateLimitMiddleware";


router.post("/singin", accountLimiter,authCtrl.singin)

router.put("/updateAdmin", [accountLimiter],authCtrl.updateAdmin)



export default router;
