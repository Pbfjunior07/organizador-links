const express = require("express");
const router = express.Router();
const linksController = require("../controllers/links.controller");

router.get("/", linksController.getAllLinks);
router.post("/", linksController.createLink);
router.put("/:id", linksController.updateLink);
router.delete("/:id", linksController.deleteLink);

module.exports = router;