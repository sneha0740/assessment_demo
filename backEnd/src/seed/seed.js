
require("dotenv").config();

const driver = require("../config/database");

const seedDatabase = async () => {
  const session = driver.session();

  try {
    console.log("Starting database seeding...");

   

    await session.run(`
      MATCH (n)
      DETACH DELETE n
    `);

    console.log("Old data cleared.");

  

    await session.run(`
      CREATE
        (:Category {name: "Frontend Development"}),
        (:Category {name: "Backend Development"}),
        (:Category {name: "Full Stack Development"})
    `);


    await session.run(`
      CREATE
        (:Skill {name: "JavaScript"}),
        (:Skill {name: "React"}),
        (:Skill {name: "TypeScript"}),
        (:Skill {name: "HTML"}),
        (:Skill {name: "CSS"}),
        (:Skill {name: "Tailwind CSS"}),
        (:Skill {name: "Bootstrap"}),
        (:Skill {name: "Responsive Design"}),
        (:Skill {name: "Figma"}),
        (:Skill {name: "Redux"}),
        (:Skill {name: "Next.js"}),
        (:Skill {name: "Node.js"}),
        (:Skill {name: "Express.js"}),
        (:Skill {name: "REST API"}),
        (:Skill {name: "MongoDB"}),
        (:Skill {name: "SQL"}),
        (:Skill {name: "PostgreSQL"}),
        (:Skill {name: "Git"}),
        (:Skill {name: "GitHub"}),
        (:Skill {name: "Docker"})
    `);

    

    await session.run(`
      CREATE
        (:JobRole {name: "Frontend Developer"}),
        (:JobRole {name: "Backend Developer"}),
        (:JobRole {name: "Full Stack Developer"}),
        (:JobRole {name: "React Developer"}),
        (:JobRole {name: "Node.js Developer"}),
        (:JobRole {name: "UI Developer"}),
        (:JobRole {name: "Web Developer"}),
        (:JobRole {name: "Software Developer"}),
        (:JobRole {name: "JavaScript Developer"}),
        (:JobRole {name: "TypeScript Developer"})
    `);



    await session.run(`
      CREATE
        (:User {name: "Sneha"}),
        (:User {name: "Alex"}),
        (:User {name: "Rahul"}),
        (:User {name: "Priya"}),
        (:User {name: "Neha"}),
        (:User {name: "Aman"}),
        (:User {name: "Riya"}),
        (:User {name: "John"}),
        (:User {name: "Sarah"}),
        (:User {name: "Vikash"})
    `);

    console.log("Nodes created.");

    // =====================================================
    // RELATED SKILLS
    // EVERY SKILL HAS MULTIPLE RELATED SKILLS
    // =====================================================

    await session.run(`
      MATCH
        (js:Skill {name: "JavaScript"}),
        (react:Skill {name: "React"}),
        (ts:Skill {name: "TypeScript"}),
        (html:Skill {name: "HTML"}),
        (css:Skill {name: "CSS"}),
        (tailwind:Skill {name: "Tailwind CSS"}),
        (bootstrap:Skill {name: "Bootstrap"}),
        (responsive:Skill {name: "Responsive Design"}),
        (figma:Skill {name: "Figma"}),
        (redux:Skill {name: "Redux"}),
        (nextjs:Skill {name: "Next.js"}),
        (node:Skill {name: "Node.js"}),
        (express:Skill {name: "Express.js"}),
        (api:Skill {name: "REST API"}),
        (mongodb:Skill {name: "MongoDB"}),
        (sql:Skill {name: "SQL"}),
        (postgresql:Skill {name: "PostgreSQL"}),
        (git:Skill {name: "Git"}),
        (github:Skill {name: "GitHub"}),
        (docker:Skill {name: "Docker"})

      CREATE

        // JavaScript
        (js)-[:RELATED_TO]->(react),
        (js)-[:RELATED_TO]->(ts),
        (js)-[:RELATED_TO]->(node),
        (js)-[:RELATED_TO]->(express),
        (js)-[:RELATED_TO]->(nextjs),
        (js)-[:RELATED_TO]->(redux),
        (js)-[:RELATED_TO]->(git),

        // React
        (react)-[:RELATED_TO]->(js),
        (react)-[:RELATED_TO]->(ts),
        (react)-[:RELATED_TO]->(html),
        (react)-[:RELATED_TO]->(css),
        (react)-[:RELATED_TO]->(redux),
        (react)-[:RELATED_TO]->(nextjs),
        (react)-[:RELATED_TO]->(responsive),

        // TypeScript
        (ts)-[:RELATED_TO]->(js),
        (ts)-[:RELATED_TO]->(react),
        (ts)-[:RELATED_TO]->(node),
        (ts)-[:RELATED_TO]->(nextjs),
        (ts)-[:RELATED_TO]->(redux),
        (ts)-[:RELATED_TO]->(express),

        // HTML
        (html)-[:RELATED_TO]->(css),
        (html)-[:RELATED_TO]->(js),
        (html)-[:RELATED_TO]->(react),
        (html)-[:RELATED_TO]->(bootstrap),
        (html)-[:RELATED_TO]->(tailwind),
        (html)-[:RELATED_TO]->(responsive),
        (html)-[:RELATED_TO]->(figma),

        // CSS
        (css)-[:RELATED_TO]->(html),
        (css)-[:RELATED_TO]->(tailwind),
        (css)-[:RELATED_TO]->(bootstrap),
        (css)-[:RELATED_TO]->(responsive),
        (css)-[:RELATED_TO]->(figma),
        (css)-[:RELATED_TO]->(react),
        (css)-[:RELATED_TO]->(nextjs),

        // Tailwind
        (tailwind)-[:RELATED_TO]->(css),
        (tailwind)-[:RELATED_TO]->(html),
        (tailwind)-[:RELATED_TO]->(responsive),
        (tailwind)-[:RELATED_TO]->(react),
        (tailwind)-[:RELATED_TO]->(nextjs),

        // Bootstrap
        (bootstrap)-[:RELATED_TO]->(css),
        (bootstrap)-[:RELATED_TO]->(html),
        (bootstrap)-[:RELATED_TO]->(responsive),
        (bootstrap)-[:RELATED_TO]->(js),
        (bootstrap)-[:RELATED_TO]->(react),

        // Responsive Design
        (responsive)-[:RELATED_TO]->(css),
        (responsive)-[:RELATED_TO]->(html),
        (responsive)-[:RELATED_TO]->(tailwind),
        (responsive)-[:RELATED_TO]->(bootstrap),
        (responsive)-[:RELATED_TO]->(react),

        // Figma
        (figma)-[:RELATED_TO]->(css),
        (figma)-[:RELATED_TO]->(html),
        (figma)-[:RELATED_TO]->(responsive),
        (figma)-[:RELATED_TO]->(react),

        // Redux
        (redux)-[:RELATED_TO]->(react),
        (redux)-[:RELATED_TO]->(js),
        (redux)-[:RELATED_TO]->(ts),
        (redux)-[:RELATED_TO]->(nextjs),

        // Next.js
        (nextjs)-[:RELATED_TO]->(react),
        (nextjs)-[:RELATED_TO]->(js),
        (nextjs)-[:RELATED_TO]->(ts),
        (nextjs)-[:RELATED_TO]->(redux),
        (nextjs)-[:RELATED_TO]->(css),

        // Node
        (node)-[:RELATED_TO]->(js),
        (node)-[:RELATED_TO]->(ts),
        (node)-[:RELATED_TO]->(express),
        (node)-[:RELATED_TO]->(api),
        (node)-[:RELATED_TO]->(mongodb),
        (node)-[:RELATED_TO]->(sql),

        // Express
        (express)-[:RELATED_TO]->(node),
        (express)-[:RELATED_TO]->(api),
        (express)-[:RELATED_TO]->(mongodb),
        (express)-[:RELATED_TO]->(sql),
        (express)-[:RELATED_TO]->(js),

        // REST API
        (api)-[:RELATED_TO]->(node),
        (api)-[:RELATED_TO]->(express),
        (api)-[:RELATED_TO]->(mongodb),
        (api)-[:RELATED_TO]->(sql),
        (api)-[:RELATED_TO]->(git),

        // MongoDB
        (mongodb)-[:RELATED_TO]->(node),
        (mongodb)-[:RELATED_TO]->(express),
        (mongodb)-[:RELATED_TO]->(api),
        (mongodb)-[:RELATED_TO]->(js),

        // SQL
        (sql)-[:RELATED_TO]->(node),
        (sql)-[:RELATED_TO]->(express),
        (sql)-[:RELATED_TO]->(postgresql),
        (sql)-[:RELATED_TO]->(api),

        // PostgreSQL
        (postgresql)-[:RELATED_TO]->(sql),
        (postgresql)-[:RELATED_TO]->(node),
        (postgresql)-[:RELATED_TO]->(express),
        (postgresql)-[:RELATED_TO]->(api),

        // Git
        (git)-[:RELATED_TO]->(github),
        (git)-[:RELATED_TO]->(js),
        (git)-[:RELATED_TO]->(react),
        (git)-[:RELATED_TO]->(node),
        (git)-[:RELATED_TO]->(docker),

        // GitHub
        (github)-[:RELATED_TO]->(git),
        (github)-[:RELATED_TO]->(docker),
        (github)-[:RELATED_TO]->(js),
        (github)-[:RELATED_TO]->(node),

        // Docker
        (docker)-[:RELATED_TO]->(git),
        (docker)-[:RELATED_TO]->(github),
        (docker)-[:RELATED_TO]->(node),
        (docker)-[:RELATED_TO]->(express)
    `);

    

    await session.run(`
      MATCH
        (js:Skill {name: "JavaScript"}),
        (react:Skill {name: "React"}),
        (ts:Skill {name: "TypeScript"}),
        (html:Skill {name: "HTML"}),
        (css:Skill {name: "CSS"}),
        (tailwind:Skill {name: "Tailwind CSS"}),
        (bootstrap:Skill {name: "Bootstrap"}),
        (responsive:Skill {name: "Responsive Design"}),
        (figma:Skill {name: "Figma"}),
        (redux:Skill {name: "Redux"}),
        (nextjs:Skill {name: "Next.js"}),
        (node:Skill {name: "Node.js"}),
        (express:Skill {name: "Express.js"}),
        (api:Skill {name: "REST API"}),
        (mongodb:Skill {name: "MongoDB"}),
        (sql:Skill {name: "SQL"}),
        (postgresql:Skill {name: "PostgreSQL"}),
        (git:Skill {name: "Git"}),
        (github:Skill {name: "GitHub"}),
        (docker:Skill {name: "Docker"}),

        (frontend:JobRole {name: "Frontend Developer"}),
        (backend:JobRole {name: "Backend Developer"}),
        (fullstack:JobRole {name: "Full Stack Developer"}),
        (reactJob:JobRole {name: "React Developer"}),
        (nodeJob:JobRole {name: "Node.js Developer"}),
        (uiJob:JobRole {name: "UI Developer"}),
        (webJob:JobRole {name: "Web Developer"}),
        (softwareJob:JobRole {name: "Software Developer"}),
        (jsJob:JobRole {name: "JavaScript Developer"}),
        (tsJob:JobRole {name: "TypeScript Developer"})

      CREATE

        // JavaScript
        (js)-[:REQUIRED_FOR]->(frontend),
        (js)-[:REQUIRED_FOR]->(backend),
        (js)-[:REQUIRED_FOR]->(fullstack),
        (js)-[:REQUIRED_FOR]->(reactJob),
        (js)-[:REQUIRED_FOR]->(nodeJob),
        (js)-[:REQUIRED_FOR]->(webJob),
        (js)-[:REQUIRED_FOR]->(jsJob),

        // React
        (react)-[:REQUIRED_FOR]->(frontend),
        (react)-[:REQUIRED_FOR]->(fullstack),
        (react)-[:REQUIRED_FOR]->(reactJob),
        (react)-[:REQUIRED_FOR]->(webJob),
        (react)-[:REQUIRED_FOR]->(softwareJob),

        // TypeScript
        (ts)-[:REQUIRED_FOR]->(frontend),
        (ts)-[:REQUIRED_FOR]->(fullstack),
        (ts)-[:REQUIRED_FOR]->(reactJob),
        (ts)-[:REQUIRED_FOR]->(nodeJob),
        (ts)-[:REQUIRED_FOR]->(tsJob),
        (ts)-[:REQUIRED_FOR]->(softwareJob),

        // HTML
        (html)-[:REQUIRED_FOR]->(frontend),
        (html)-[:REQUIRED_FOR]->(reactJob),
        (html)-[:REQUIRED_FOR]->(uiJob),
        (html)-[:REQUIRED_FOR]->(webJob),
        (html)-[:REQUIRED_FOR]->(fullstack),

        // CSS
        (css)-[:REQUIRED_FOR]->(frontend),
        (css)-[:REQUIRED_FOR]->(fullstack),
        (css)-[:REQUIRED_FOR]->(reactJob),
        (css)-[:REQUIRED_FOR]->(uiJob),
        (css)-[:REQUIRED_FOR]->(webJob),
        (css)-[:REQUIRED_FOR]->(softwareJob),

        // Tailwind
        (tailwind)-[:REQUIRED_FOR]->(frontend),
        (tailwind)-[:REQUIRED_FOR]->(reactJob),
        (tailwind)-[:REQUIRED_FOR]->(uiJob),
        (tailwind)-[:REQUIRED_FOR]->(webJob),

        // Bootstrap
        (bootstrap)-[:REQUIRED_FOR]->(frontend),
        (bootstrap)-[:REQUIRED_FOR]->(uiJob),
        (bootstrap)-[:REQUIRED_FOR]->(webJob),
        (bootstrap)-[:REQUIRED_FOR]->(fullstack),

        // Responsive Design
        (responsive)-[:REQUIRED_FOR]->(frontend),
        (responsive)-[:REQUIRED_FOR]->(uiJob),
        (responsive)-[:REQUIRED_FOR]->(webJob),
        (responsive)-[:REQUIRED_FOR]->(reactJob),

        // Figma
        (figma)-[:REQUIRED_FOR]->(uiJob),
        (figma)-[:REQUIRED_FOR]->(frontend),
        (figma)-[:REQUIRED_FOR]->(webJob),

        // Redux
        (redux)-[:REQUIRED_FOR]->(reactJob),
        (redux)-[:REQUIRED_FOR]->(frontend),
        (redux)-[:REQUIRED_FOR]->(fullstack),

        // Next.js
        (nextjs)-[:REQUIRED_FOR]->(frontend),
        (nextjs)-[:REQUIRED_FOR]->(reactJob),
        (nextjs)-[:REQUIRED_FOR]->(fullstack),

        // Node.js
        (node)-[:REQUIRED_FOR]->(backend),
        (node)-[:REQUIRED_FOR]->(fullstack),
        (node)-[:REQUIRED_FOR]->(nodeJob),
        (node)-[:REQUIRED_FOR]->(softwareJob),

        // Express
        (express)-[:REQUIRED_FOR]->(backend),
        (express)-[:REQUIRED_FOR]->(nodeJob),
        (express)-[:REQUIRED_FOR]->(fullstack),

        // REST API
        (api)-[:REQUIRED_FOR]->(backend),
        (api)-[:REQUIRED_FOR]->(fullstack),
        (api)-[:REQUIRED_FOR]->(nodeJob),
        (api)-[:REQUIRED_FOR]->(softwareJob),

        // MongoDB
        (mongodb)-[:REQUIRED_FOR]->(backend),
        (mongodb)-[:REQUIRED_FOR]->(nodeJob),
        (mongodb)-[:REQUIRED_FOR]->(fullstack),

        // SQL
        (sql)-[:REQUIRED_FOR]->(backend),
        (sql)-[:REQUIRED_FOR]->(fullstack),
        (sql)-[:REQUIRED_FOR]->(nodeJob),
        (sql)-[:REQUIRED_FOR]->(softwareJob),

        // PostgreSQL
        (postgresql)-[:REQUIRED_FOR]->(backend),
        (postgresql)-[:REQUIRED_FOR]->(fullstack),
        (postgresql)-[:REQUIRED_FOR]->(nodeJob),

        // Git
        (git)-[:REQUIRED_FOR]->(frontend),
        (git)-[:REQUIRED_FOR]->(backend),
        (git)-[:REQUIRED_FOR]->(fullstack),
        (git)-[:REQUIRED_FOR]->(softwareJob),
        (git)-[:REQUIRED_FOR]->(webJob),

        // GitHub
        (github)-[:REQUIRED_FOR]->(frontend),
        (github)-[:REQUIRED_FOR]->(backend),
        (github)-[:REQUIRED_FOR]->(fullstack),
        (github)-[:REQUIRED_FOR]->(softwareJob),

        // Docker
        (docker)-[:REQUIRED_FOR]->(backend),
        (docker)-[:REQUIRED_FOR]->(fullstack),
        (docker)-[:REQUIRED_FOR]->(nodeJob),
        (docker)-[:REQUIRED_FOR]->(softwareJob)
    `);

    
    await session.run(`
      MATCH
        (frontend:JobRole {name: "Frontend Developer"}),
        (backend:JobRole {name: "Backend Developer"}),
        (fullstack:JobRole {name: "Full Stack Developer"}),
        (reactJob:JobRole {name: "React Developer"}),
        (nodeJob:JobRole {name: "Node.js Developer"}),
        (uiJob:JobRole {name: "UI Developer"}),
        (webJob:JobRole {name: "Web Developer"}),
        (softwareJob:JobRole {name: "Software Developer"}),
        (jsJob:JobRole {name: "JavaScript Developer"}),
        (tsJob:JobRole {name: "TypeScript Developer"}),

        (frontendCat:Category {name: "Frontend Development"}),
        (backendCat:Category {name: "Backend Development"}),
        (fullstackCat:Category {name: "Full Stack Development"})

      CREATE
        (frontend)-[:BELONGS_TO]->(frontendCat),
        (reactJob)-[:BELONGS_TO]->(frontendCat),
        (uiJob)-[:BELONGS_TO]->(frontendCat),
        (webJob)-[:BELONGS_TO]->(frontendCat),
        (jsJob)-[:BELONGS_TO]->(frontendCat),
        (tsJob)-[:BELONGS_TO]->(frontendCat),

        (backend)-[:BELONGS_TO]->(backendCat),
        (nodeJob)-[:BELONGS_TO]->(backendCat),

        (fullstack)-[:BELONGS_TO]->(fullstackCat),
        (softwareJob)-[:BELONGS_TO]->(fullstackCat)
    `);

    // =====================================================
    // USERS -> SKILLS
    // MULTIPLE USERS FOR EVERY SKILL
    // =====================================================

    await session.run(`
      MATCH
        (sneha:User {name: "Sneha"}),
        (alex:User {name: "Alex"}),
        (rahul:User {name: "Rahul"}),
        (priya:User {name: "Priya"}),
        (neha:User {name: "Neha"}),
        (aman:User {name: "Aman"}),
        (riya:User {name: "Riya"}),
        (john:User {name: "John"}),
        (sarah:User {name: "Sarah"}),
        (vikash:User {name: "Vikash"}),

        (js:Skill {name: "JavaScript"}),
        (react:Skill {name: "React"}),
        (ts:Skill {name: "TypeScript"}),
        (html:Skill {name: "HTML"}),
        (css:Skill {name: "CSS"}),
        (tailwind:Skill {name: "Tailwind CSS"}),
        (bootstrap:Skill {name: "Bootstrap"}),
        (responsive:Skill {name: "Responsive Design"}),
        (figma:Skill {name: "Figma"}),
        (redux:Skill {name: "Redux"}),
        (nextjs:Skill {name: "Next.js"}),
        (node:Skill {name: "Node.js"}),
        (express:Skill {name: "Express.js"}),
        (api:Skill {name: "REST API"}),
        (mongodb:Skill {name: "MongoDB"}),
        (sql:Skill {name: "SQL"}),
        (postgresql:Skill {name: "PostgreSQL"}),
        (git:Skill {name: "Git"}),
        (github:Skill {name: "GitHub"}),
        (docker:Skill {name: "Docker"})

      CREATE

        // Sneha
        (sneha)-[:HAS_SKILL]->(js),
        (sneha)-[:HAS_SKILL]->(react),
        (sneha)-[:HAS_SKILL]->(ts),
        (sneha)-[:HAS_SKILL]->(html),
        (sneha)-[:HAS_SKILL]->(css),
        (sneha)-[:HAS_SKILL]->(tailwind),
        (sneha)-[:HAS_SKILL]->(redux),
        (sneha)-[:HAS_SKILL]->(git),

        // Alex
        (alex)-[:HAS_SKILL]->(js),
        (alex)-[:HAS_SKILL]->(node),
        (alex)-[:HAS_SKILL]->(express),
        (alex)-[:HAS_SKILL]->(api),
        (alex)-[:HAS_SKILL]->(mongodb),
        (alex)-[:HAS_SKILL]->(sql),
        (alex)-[:HAS_SKILL]->(git),

        // Rahul
        (rahul)-[:HAS_SKILL]->(js),
        (rahul)-[:HAS_SKILL]->(ts),
        (rahul)-[:HAS_SKILL]->(react),
        (rahul)-[:HAS_SKILL]->(html),
        (rahul)-[:HAS_SKILL]->(css),
        (rahul)-[:HAS_SKILL]->(node),
        (rahul)-[:HAS_SKILL]->(mongodb),

        // Priya
        (priya)-[:HAS_SKILL]->(html),
        (priya)-[:HAS_SKILL]->(css),
        (priya)-[:HAS_SKILL]->(tailwind),
        (priya)-[:HAS_SKILL]->(bootstrap),
        (priya)-[:HAS_SKILL]->(responsive),
        (priya)-[:HAS_SKILL]->(figma),

        // Neha
        (neha)-[:HAS_SKILL]->(js),
        (neha)-[:HAS_SKILL]->(react),
        (neha)-[:HAS_SKILL]->(ts),
        (neha)-[:HAS_SKILL]->(html),
        (neha)-[:HAS_SKILL]->(css),
        (neha)-[:HAS_SKILL]->(redux),
        (neha)-[:HAS_SKILL]->(nextjs),

        // Aman
        (aman)-[:HAS_SKILL]->(js),
        (aman)-[:HAS_SKILL]->(node),
        (aman)-[:HAS_SKILL]->(express),
        (aman)-[:HAS_SKILL]->(api),
        (aman)-[:HAS_SKILL]->(sql),
        (aman)-[:HAS_SKILL]->(postgresql),

        // Riya
        (riya)-[:HAS_SKILL]->(react),
        (riya)-[:HAS_SKILL]->(ts),
        (riya)-[:HAS_SKILL]->(css),
        (riya)-[:HAS_SKILL]->(tailwind),
        (riya)-[:HAS_SKILL]->(responsive),
        (riya)-[:HAS_SKILL]->(figma),

        // John
        (john)-[:HAS_SKILL]->(js),
        (john)-[:HAS_SKILL]->(node),
        (john)-[:HAS_SKILL]->(mongodb),
        (john)-[:HAS_SKILL]->(sql),
        (john)-[:HAS_SKILL]->(git),
        (john)-[:HAS_SKILL]->(docker),

        // Sarah
        (sarah)-[:HAS_SKILL]->(react),
        (sarah)-[:HAS_SKILL]->(html),
        (sarah)-[:HAS_SKILL]->(css),
        (sarah)-[:HAS_SKILL]->(bootstrap),
        (sarah)-[:HAS_SKILL]->(responsive),
        (sarah)-[:HAS_SKILL]->(github),

        // Vikash
        (vikash)-[:HAS_SKILL]->(js),
        (vikash)-[:HAS_SKILL]->(ts),
        (vikash)-[:HAS_SKILL]->(node),
        (vikash)-[:HAS_SKILL]->(express),
        (vikash)-[:HAS_SKILL]->(postgresql),
        (vikash)-[:HAS_SKILL]->(docker)
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