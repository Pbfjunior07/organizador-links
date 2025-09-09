const express = require("express");
const router = express.Router();
const linksController = require("../controllers/links.controller");

router.get("/", linksController.getLinks);
router.post("/", linksController.createLink);
router.put("/:id", linksController.update);
router.delete("/:id", linksController.deleteLink);

module.exports = router;