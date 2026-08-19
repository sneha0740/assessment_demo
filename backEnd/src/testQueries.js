require("dotenv").config();

const driver = require("./config/database");

const {
  getAllSkills,
  getAllJobs,
  getSkillsForJob,
  getRelatedSkills,
  getRecommendedJobs,
} = require("./queries/graphQueries");

async function testQueries() {
  const session = driver.session();

  try {
    
    const skillsResult = await session.run(getAllSkills);

    console.log("\n--- ALL SKILLS ---");
    console.log(
      skillsResult.records.map((record) => record.get("name"))
    );

    const jobsResult = await session.run(getAllJobs);

    console.log("\n--- ALL JOBS ---");
    console.log(
      jobsResult.records.map((record) => record.get("name"))
    );

    
    const jobSkillsResult = await session.run(
      getSkillsForJob,
      {
        jobRole: "Frontend Developer",
      }
    );

    console.log("\n--- FRONTEND DEVELOPER SKILLS ---");
    console.log(
      jobSkillsResult.records.map((record) => record.get("skill"))
    );

    
    const relatedSkillsResult = await session.run(
      getRelatedSkills,
      {
        skill: "JavaScript",
      }
    );

    console.log("\n--- RELATED TO JAVASCRIPT ---");
    console.log(
      relatedSkillsResult.records.map((record) => record.get("skill"))
    );

    
    const recommendationResult = await session.run(
      getRecommendedJobs,
      {
        skill: "JavaScript",
      }
    );

    console.log("\n--- RECOMMENDED JOBS FOR JAVASCRIPT ---");
    console.log(
      recommendationResult.records.map((record) =>
        record.get("jobRole")
      )
    );

  } catch (error) {
    console.error("Query testing failed:", error);
  } finally {
    await session.close();
    await driver.close();
  }
}

testQueries();