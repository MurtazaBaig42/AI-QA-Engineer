const express = require("express");

const router = express.Router();

const testController = require("../controllers/test.controller");

router.post("/run-test", testController.runTest);

module.exports = router;