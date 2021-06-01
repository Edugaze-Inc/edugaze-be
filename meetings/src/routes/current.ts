import express, { Request, Response } from "express";
import { baseUrl } from "../config";

const router = express.Router();

router.get(`${baseUrl}/current`, (req: Request, res: Response) => {

});

export { router as currentMeetingsRouter };