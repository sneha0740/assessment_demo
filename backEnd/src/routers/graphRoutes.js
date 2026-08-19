const express = require("express");

const {
  getSkills,
  getJobs,
  getJobSkills,
  getRelated,
  getRecommendations,
} = require("../controllers/graphController");

const router = express.Router();

router.get("/skills", getSkills);

router.get("/jobs", getJobs);

router.get("/jobs/:job/skills", getJobSkills);

router.get("/skills/:skill/related", getRelated);

router.get("/recommendations/:skill", getRecommendations);

module.exports = router;