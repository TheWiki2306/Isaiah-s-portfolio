import express from "express";
import { submitContactForm } from "../controllers/contactController.js";

export const contactRouter = express.Router();

contactRouter.post("/sendMessage", submitContactForm);
