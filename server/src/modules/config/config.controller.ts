import { Router } from "express";
import { authenticate, permitAdmin } from "../../middlewares/authentication";

const router = Router()

router.get('/', authenticate, permitAdmin, async (req, res) => {
  return res.status(204).end()
})

export default router