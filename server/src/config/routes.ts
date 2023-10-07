import { Router, Request, Response } from "express";
import userControllers from "src/app/controllers/userControllers";
import { authenticateUser } from "src/middlewares/userAuthentication";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.send(
    `<h1 style="text-align:center; margin-top:25vh">Soulscript server</h1>`
  );
});

router.post("/user/signup", userControllers.signup);
router.post("/user/login", userControllers.login);
router.get("/user/details", authenticateUser, userControllers.details);

export default router;
