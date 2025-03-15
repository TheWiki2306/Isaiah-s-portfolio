import express from "express";

const MainRouter = express.Router();

MainRouter.get("", async (req, res) => {
  res.render("main");
});

export default MainRouter;
