const driver = require("../config/database");

const {
  getAllSkills,
  getAllJobs,
  getSkillsForJob,
  getRelatedSkills,
  getRecommendedJobs,
} = require("../queries/graphQueries");

const getSkills = async (req, res) => {
  const session = driver.session();

  try {
    const result = await session.run(getAllSkills);

    const skills = result.records.map((record) => ({
      name: record.get("name"),
    }));

    res.json({
      success: true,
      data: skills,
    });
  } catch (error) {
    console.error("Get skills error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch skills",
    });
  } finally {
    await session.close();
  }
};

const getJobs = async (req, res) => {
  const session = driver.session();

  try {
    const result = await session.run(getAllJobs);

    const jobs = result.records.map((record) => ({
      name: record.get("name"),
    }));

    res.json({
      success: true,
      data: jobs,
    });
  } catch (error) {
    console.error("Get jobs error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch jobs",
    });
  } finally {
    await session.close();
  }
};

const getJobSkills = async (req, res) => {
  const session = driver.session();

  try {
    const { job } = req.params;

    const result = await session.run(getSkillsForJob, {
      jobRole: job,
    });

    const skills = result.records.map((record) =>
      record.get("skill")
    );

    res.json({
      success: true,
      job,
      data: skills,
    });
  } catch (error) {
    console.error("Get job skills error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch job skills",
    });
  } finally {
    await session.close();
  }
};

const getRelated = async (req, res) => {
  const session = driver.session();

  try {
    const { skill } = req.params;

    const result = await session.run(getRelatedSkills, {
      skill,
    });

    const skills = result.records.map((record) =>
      record.get("skill")
    );

    res.json({
      success: true,
      skill,
      data: skills,
    });
  } catch (error) {
    console.error("Get related skills error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch related skills",
    });
  } finally {
    await session.close();
  }
};

const getRecommendations = async (req, res) => {
  const session = driver.session();

  try {
    const { skill } = req.params;

    const result = await session.run(getRecommendedJobs, {
      skill,
    });

    const jobs = result.records.map((record) =>
      record.get("jobRole")
    );

    res.json({
      success: true,
      skill,
      data: jobs,
    });
  } catch (error) {
    console.error("Recommendation error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to generate recommendations",
    });
  } finally {
    await session.close();
  }
};

module.exports = {
  getSkills,
  getJobs,
  getJobSkills,
  getRelated,
  getRecommendations,
};