require("dotenv").config();

const driver = require("../config/database");

const seedDatabase = async () => {
  const session = driver.session();

  try {
    console.log("Starting database seeding...");

    // Remove old data
    await session.run(`
      MATCH (n)
      DETACH DELETE n
    `);

    console.log("Old data cleared.");

    // Create Categories
    await session.run(
      `
      CREATE
        (:Category {name: $frontend}),
        (:Category {name: $backend}),
        (:Category {name: $fullstack})
      `,
      {
        frontend: "Frontend Development",
        backend: "Backend Development",
        fullstack: "Full Stack Development",
      }
    );

    // Create Skills
    await session.run(
      `
      CREATE
        (:Skill {name: $javascript}),
        (:Skill {name: $react}),
        (:Skill {name: $typescript}),
        (:Skill {name: $html}),
        (:Skill {name: $css}),
        (:Skill {name: $node}),
        (:Skill {name: $express}),
        (:Skill {name: $mongodb}),
        (:Skill {name: $sql}),
        (:Skill {name: $git})
      `,
      {
        javascript: "JavaScript",
        react: "React",
        typescript: "TypeScript",
        html: "HTML",
        css: "CSS",
        node: "Node.js",
        express: "Express.js",
        mongodb: "MongoDB",
        sql: "SQL",
        git: "Git",
      }
    );

    // Create Job Roles
    await session.run(
      `
      CREATE
        (:JobRole {name: $frontend}),
        (:JobRole {name: $backend}),
        (:JobRole {name: $fullstack}),
        (:JobRole {name: $react}),
        (:JobRole {name: $node})
      `,
      {
        frontend: "Frontend Developer",
        backend: "Backend Developer",
        fullstack: "Full Stack Developer",
        react: "React Developer",
        node: "Node.js Developer",
      }
    );

    // Create Users
    await session.run(
      `
      CREATE
        (:User {name: $user1}),
        (:User {name: $user2})
      `,
      {
        user1: "Sneha",
        user2: "Alex",
      }
    );

    console.log("Nodes created.");

    // Create Skill -> Related Skill relationships
    await session.run(`
      MATCH
        (js:Skill {name: "JavaScript"}),
        (react:Skill {name: "React"}),
        (ts:Skill {name: "TypeScript"}),
        (node:Skill {name: "Node.js"}),
        (express:Skill {name: "Express.js"}),
        (html:Skill {name: "HTML"}),
        (css:Skill {name: "CSS"})
      
      CREATE
        (js)-[:RELATED_TO]->(react),
        (js)-[:RELATED_TO]->(ts),
        (js)-[:RELATED_TO]->(node),
        (node)-[:RELATED_TO]->(express),
        (html)-[:RELATED_TO]->(css),
        (react)-[:RELATED_TO]->(typescript)
    `);

    // Create Skill -> Job relationships
    await session.run(`
      MATCH
        (js:Skill {name: "JavaScript"}),
        (react:Skill {name: "React"}),
        (ts:Skill {name: "TypeScript"}),
        (html:Skill {name: "HTML"}),
        (css:Skill {name: "CSS"}),
        (node:Skill {name: "Node.js"}),
        (express:Skill {name: "Express.js"}),
        (mongodb:Skill {name: "MongoDB"}),
        (sql:Skill {name: "SQL"}),
        (git:Skill {name: "Git"}),

        (frontend:JobRole {name: "Frontend Developer"}),
        (backend:JobRole {name: "Backend Developer"}),
        (fullstack:JobRole {name: "Full Stack Developer"}),
        (reactJob:JobRole {name: "React Developer"}),
        (nodeJob:JobRole {name: "Node.js Developer"})

      CREATE
        (js)-[:REQUIRED_FOR]->(frontend),
        (react)-[:REQUIRED_FOR]->(frontend),
        (ts)-[:REQUIRED_FOR]->(frontend),
        (html)-[:REQUIRED_FOR]->(frontend),
        (css)-[:REQUIRED_FOR]->(frontend),

        (js)-[:REQUIRED_FOR]->(backend),
        (node)-[:REQUIRED_FOR]->(backend),
        (express)-[:REQUIRED_FOR]->(backend),
        (mongodb)-[:REQUIRED_FOR]->(backend),

        (js)-[:REQUIRED_FOR]->(fullstack),
        (react)-[:REQUIRED_FOR]->(fullstack),
        (node)-[:REQUIRED_FOR]->(fullstack),
        (mongodb)-[:REQUIRED_FOR]->(fullstack),

        (js)-[:REQUIRED_FOR]->(reactJob),
        (react)-[:REQUIRED_FOR]->(reactJob),
        (ts)-[:REQUIRED_FOR]->(reactJob),

        (js)-[:REQUIRED_FOR]->(nodeJob),
        (node)-[:REQUIRED_FOR]->(nodeJob),
        (express)-[:REQUIRED_FOR]->(nodeJob),
        (sql)-[:REQUIRED_FOR]->(nodeJob),
        (git)-[:REQUIRED_FOR]->(nodeJob)
    `);

    // Create Job -> Category relationships
    await session.run(`
      MATCH
        (frontend:JobRole {name: "Frontend Developer"}),
        (backend:JobRole {name: "Backend Developer"}),
        (fullstack:JobRole {name: "Full Stack Developer"}),
        (reactJob:JobRole {name: "React Developer"}),
        (nodeJob:JobRole {name: "Node.js Developer"}),

        (frontendCat:Category {name: "Frontend Development"}),
        (backendCat:Category {name: "Backend Development"}),
        (fullstackCat:Category {name: "Full Stack Development"})

      CREATE
        (frontend)-[:BELONGS_TO]->(frontendCat),
        (reactJob)-[:BELONGS_TO]->(frontendCat),

        (backend)-[:BELONGS_TO]->(backendCat),
        (nodeJob)-[:BELONGS_TO]->(backendCat),

        (fullstack)-[:BELONGS_TO]->(fullstackCat)
    `);

    // Create User -> Skill relationships
    await session.run(`
      MATCH
        (sneha:User {name: "Sneha"}),
        (alex:User {name: "Alex"}),

        (js:Skill {name: "JavaScript"}),
        (react:Skill {name: "React"}),
        (html:Skill {name: "HTML"}),
        (css:Skill {name: "CSS"}),
        (node:Skill {name: "Node.js"}),
        (express:Skill {name: "Express.js"}),
        (mongodb:Skill {name: "MongoDB"})

      CREATE
        (sneha)-[:HAS_SKILL]->(js),
        (sneha)-[:HAS_SKILL]->(react),
        (sneha)-[:HAS_SKILL]->(html),
        (sneha)-[:HAS_SKILL]->(css),

        (alex)-[:HAS_SKILL]->(js),
        (alex)-[:HAS_SKILL]->(node),
        (alex)-[:HAS_SKILL]->(express),
        (alex)-[:HAS_SKILL]->(mongodb)
    `);

    console.log("Relationships created.");
    console.log("Database seeding completed successfully!");
  } catch (error) {
    console.error("Seeding failed:", error);
  } finally {
    await session.close();
    await driver.close();
  }
};

seedDatabase();