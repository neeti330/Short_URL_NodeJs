const express = require("express");

const {
  handleGenerateNewShortURL,
  handleGetAnalytics,
  handleRedirectionUrl,
} = require("../controllers/url");

const router = express.Router();

router.post("/", handleGenerateNewShortURL);

router.get("/analytics/:shortId", handleGetAnalytics);

router.get("/:shortId", handleRedirectionUrl);

module.exports = router;
