import { Router, Request, Response } from "express";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.send(
    `<h1 style="text-align:center; margin-top:25vh">Soulscript server</h1>`
  );
});

export default router;
