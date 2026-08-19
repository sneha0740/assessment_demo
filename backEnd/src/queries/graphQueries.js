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
  MATCH (s:Skill)-[:RELATED_TO]->(related:Skill)
  WHERE s.name = $skill
  RETURN related.name AS skill
  ORDER BY related.name
`;

const getRecommendedJobs = `
  MATCH (s:Skill {name: $skill})
        -[:RELATED_TO*1..2]->
        (related:Skill)
        -[:REQUIRED_FOR]->
        (job:JobRole)
  RETURN DISTINCT job.name AS jobRole
  ORDER BY jobRole
`;

module.exports = {
  getAllSkills,
  getAllJobs,
  getSkillsForJob,
  getRelatedSkills,
  getRecommendedJobs,
};