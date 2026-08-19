
const getAllSkills = `
  MATCH (s:Skill)
  RETURN s.name AS name
  ORDER BY s.name
`;

const getAllJobs = `
  MATCH (j:JobRole)
  RETURN j.name AS name
  ORDER BY j.name
`;

const getSkillsForJob = `
  MATCH (s:Skill)-[:REQUIRED_FOR]->(j:JobRole)
  WHERE j.name = $jobRole
  RETURN s.name AS skill
  ORDER BY s.name
`;



const getRelatedSkills = `
  MATCH (s:Skill {name: $skill})
  MATCH (s)-[:RELATED_TO]-(related:Skill)

  RETURN DISTINCT related.name AS skill
  ORDER BY skill
`;



const getRecommendedJobs = `
  MATCH (s:Skill {name: $skill})

  OPTIONAL MATCH (s)-[:REQUIRED_FOR]->(directJob:JobRole)

  OPTIONAL MATCH (s)-[:RELATED_TO*1..2]-(related:Skill)
  OPTIONAL MATCH (related)-[:REQUIRED_FOR]->(relatedJob:JobRole)

  WITH
    directJob,
    relatedJob

  UNWIND
    CASE
      WHEN directJob IS NOT NULL AND relatedJob IS NOT NULL
        THEN [directJob.name, relatedJob.name]

      WHEN directJob IS NOT NULL
        THEN [directJob.name]

      WHEN relatedJob IS NOT NULL
        THEN [relatedJob.name]

      ELSE []
    END AS jobRole

  RETURN DISTINCT jobRole
  ORDER BY jobRole
`;

module.exports = {
  getAllSkills,
  getAllJobs,
  getSkillsForJob,
  getRelatedSkills,
  getRecommendedJobs,
};