1. Problem Statement

Finding a suitable career path usually involves understanding relationships between multiple entities.

For example:

A candidate knows JavaScript → JavaScript is required by React → React is required for Frontend Developer jobs → a company is hiring for Frontend Developer → a course can help improve React skills.

In a traditional relational database, these relationships would require multiple tables and JOIN operations.

CareerGraph models these connections directly as a graph so that users can explore career paths and related opportunities through graph traversals.

2. Use Case

CareerGraph is a small career exploration platform where users can:

Explore available jobs
View required skills for a job
Find companies hiring for specific jobs
Discover courses related to required skills
Explore industries
Find jobs based on a candidate's existing skills
Discover career paths through multiple relationships
Example

A user interested in becoming a Frontend Developer can explore:

Frontend Developer
        ↓
requires
        ↓
React
        ↓
related_to
        ↓
JavaScript
        ↓
learned_by
        ↓
JavaScript Course

The graph allows the application to traverse these relationships naturally.

3. Why a Graph Database?

A graph database is useful for this application because the most important information is not only the individual entities, but the relationships between them.

For example:

Candidate
   ↓ HAS_SKILL
JavaScript
   ↓ USED_IN
React
   ↓ REQUIRED_FOR
Frontend Developer
   ↓ HIRES_FOR
Company

A relational database could represent this using multiple tables such as:

candidates
skills
jobs
companies
candidate_skills
job_skills
company_jobs
courses
skill_courses

As the number of relationships increases, queries require more JOIN operations.

With a graph database, the relationships are first-class citizens.

This makes queries such as:

"Find jobs that match a candidate's skills and then find companies hiring for those jobs"

much more natural.

Benefits of the graph model
Natural representation of relationships
Easy multi-hop traversal
Less complicated relationship queries
Flexible data model
Good fit for recommendation and discovery use cases
Easier exploration of connected entities
4. Technology Stack
Frontend
React
JavaScript
HTML5
CSS3
Axios
Backend
Node.js
Express.js
JavaScript
Neo4j official JavaScript driver
Database
CognoDB
openCypher
Bolt protocol
Development
Git
GitHub
npm
5. High-Level Architecture
                    ┌──────────────────────┐
                    │       Browser        │
                    │      React UI        │
                    └──────────┬───────────┘
                               │
                               │ HTTP / REST
                               ▼
                    ┌──────────────────────┐
                    │     Express API      │
                    │      Node.js         │
                    └──────────┬───────────┘
                               │
                               │ Neo4j Driver
                               │ Bolt Protocol
                               ▼
                    ┌──────────────────────┐
                    │      CognoDB         │
                    │    Graph Database    │
                    └──────────────────────┘

The frontend communicates with the Node.js/Express backend.

The backend is responsible for:

API handling
Database connection
Parameterized Cypher queries
Error handling
Business logic

The backend connects to CognoDB using the official Neo4j JavaScript driver.

6. Graph Data Model
Nodes

The application uses the following node types:

Candidate
Candidate {
  id,
  name,
  email
}
Skill
Skill {
  id,
  name
}
Job
Job {
  id,
  title,
  experience
}
Company
Company {
  id,
  name,
  location
}
Course
Course {
  id,
  title,
  platform
}
Industry
Industry {
  id,
  name
}
7. Relationships

The graph contains typed relationships.

(Candidate)-[:HAS_SKILL]->(Skill)

(Job)-[:REQUIRES_SKILL]->(Skill)

(Company)-[:HIRES_FOR]->(Job)

(Job)-[:BELONGS_TO]->(Industry)

(Course)-[:TEACHES]->(Skill)

(Skill)-[:RELATED_TO]->(Skill)
8. Graph Diagram
                         ┌──────────────┐
                         │   Candidate  │
                         └──────┬───────┘
                                │
                           HAS_SKILL
                                │
                                ▼
                         ┌──────────────┐
                         │    Skill     │
                         └──────┬───────┘
                                │
                        REQUIRED_BY
                                │
                                ▼
                         ┌──────────────┐
                         │     Job      │
                         └──────┬───────┘
                                │
             ┌──────────────────┼──────────────────┐
             │                  │                  │
             ▼                  ▼                  ▼
       HIRES_FOR          BELONGS_TO          REQUIRES_SKILL
             │                  │
             ▼                  ▼
        ┌─────────┐       ┌───────────┐
        │ Company │       │ Industry  │
        └─────────┘       └───────────┘

                         ┌──────────────┐
                         │    Course    │
                         └──────┬───────┘
                                │
                              TEACHES
                                │
                                ▼
                         ┌──────────────┐
                         │    Skill     │
                         └──────────────┘
9. Why These Relationships?

The graph is designed around the questions the application needs to answer.

For example:

Candidate → Skills
Candidate -[:HAS_SKILL]-> Skill

This represents skills already known by a candidate.

Job → Skills
Job -[:REQUIRES_SKILL]-> Skill

This represents the skills required for a job.

Company → Job
Company -[:HIRES_FOR]-> Job

This connects companies to their job opportunities.

Course → Skill
Course -[:TEACHES]-> Skill

This allows the application to recommend learning resources.

10. CognoDB Setup

Create a CognoDB account:

https://console.cognodb.com/signup

Create a free C0 instance from the CognoDB console.

After creating the instance, CognoDB provides:

Bolt URI
Username
Password

The connection URI has the following format:

bolt+s://<instance-id>.databases.cognodb.cloud

The username is:

cognodb

The generated password should be stored securely.

11. Environment Variables

Database credentials are never committed to GitHub.

Create a .env file in the backend:

COGNODB_URI=bolt+s://your-instance.databases.cognodb.cloud
COGNODB_USERNAME=cognodb
COGNODB_PASSWORD=your_password

PORT=5000

The .env file must be included in .gitignore.

.env
node_modules/
Important

Never commit:

COGNODB_PASSWORD

or any other database credentials to GitHub.

12. Database Connection

The backend uses the official Neo4j JavaScript driver.

Example:

const neo4j = require("neo4j-driver");

const driver = neo4j.driver(
  process.env.COGNODB_URI,
  neo4j.auth.basic(
    process.env.COGNODB_USERNAME,
    process.env.COGNODB_PASSWORD
  )
);

CognoDB supports the Neo4j driver because it communicates using the Bolt protocol and supports openCypher.

13. Project Structure
CareerGraph/
│
├── backEnd/
│   │
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   │
│   │   ├── queries/
│   │   │   └── graphQueries.js
│   │   │
│   │   ├── seed/
│   │   │   └── seed.js
│   │   │
│   │   ├── controllers/
│   │   │   └── graphController.js
│   │   │
│   │   ├── routes/
│   │   │   └── graphRoutes.js
│   │   │
│   │   └── app.js
│   │
│   ├── .env
│   ├── .gitignore
│   └── package.json
│
├── frontEnd/
│   │
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── .gitignore
│
├── README.md
└── .gitignore
14. Seed Data

The repository contains a seed script that creates realistic graph data.

The seed data includes:

Candidates
Skills
Jobs
Companies
Courses
Industries
Relationships between them

Example:

Candidate: Sneha

Skills:
  JavaScript
  React
  HTML
  CSS

Example jobs:

Frontend Developer
React Developer
Full Stack Developer
Backend Developer

Example companies:

TechCorp
InnovateLabs
CloudWorks

Example courses:

Advanced React
JavaScript Fundamentals
Node.js Backend Development

The seed script can be executed using:

npm run seed
15. Cypher Queries

All database queries are stored separately from the application logic.

This makes the query layer easier to:

understand
test
maintain
modify
Query 1 — Get All Jobs
MATCH (j:Job)
RETURN j
ORDER BY j.title

This retrieves all available jobs.

16. Query 2 — Get Skills Required by a Job
MATCH (j:Job {id: $jobId})-[:REQUIRES_SKILL]->(s:Skill)
RETURN s
ORDER BY s.name

The $jobId parameter is passed separately through the Neo4j driver.

No string concatenation is used.

17. Query 3 — Find Companies Hiring for a Job
MATCH (c:Company)-[:HIRES_FOR]->(j:Job {id: $jobId})
RETURN c
ORDER BY c.name

This finds companies connected to a specific job.

18. Multi-Hop Graph Query

The application includes queries that traverse multiple relationships.

Example:

MATCH (c:Candidate {id: $candidateId})
      -[:HAS_SKILL]->(s:Skill)
      <-[:REQUIRES_SKILL]-(j:Job)
      <-[:HIRES_FOR]-(company:Company)
RETURN DISTINCT
       j.title AS job,
       company.name AS company,
       collect(s.name) AS matchingSkills
ORDER BY job

This query performs a multi-hop traversal:

Candidate
   ↓
HAS_SKILL
   ↓
Skill
   ↑
REQUIRES_SKILL
   ↑
Job
   ↑
HIRES_FOR
   ↑
Company

This is one of the key reasons a graph database fits this application.

19. Query That Is Awkward in a Relational Database

One of the application's graph queries finds career opportunities through connected skills.

Example:

MATCH (c:Candidate {id: $candidateId})
      -[:HAS_SKILL]->(s:Skill)
      <-[:REQUIRES_SKILL]-(j:Job)
      -[:REQUIRES_SKILL]->(otherSkill:Skill)
      <-[:TEACHES]-(course:Course)
RETURN DISTINCT
       j.title AS job,
       otherSkill.name AS skill,
       course.title AS course
ORDER BY j.title

This traverses:

Candidate
   ↓
Skill
   ↓
Job
   ↓
Required Skill
   ↓
Course

In a relational schema this would require several JOIN tables.

The graph query directly follows the relationships.

20. Parameterized Queries

All dynamic values are passed as parameters.

Correct
const result = await session.run(
  `
  MATCH (j:Job {id: $jobId})
  RETURN j
  `,
  {
    jobId
  }
);
Not used
const query = `
  MATCH (j:Job {id: '${jobId}'})
  RETURN j
`;

Parameterized queries are used to improve:

security
query safety
maintainability
query reuse
21. API Endpoints

The backend exposes REST APIs for the frontend.

Get Jobs
GET /api/jobs
Get Job Details
GET /api/jobs/:id
Get Job Skills
GET /api/jobs/:id/skills
Get Companies Hiring
GET /api/jobs/:id/companies
Career Recommendations
GET /api/candidates/:id/recommendations
Related Courses
GET /api/skills/:id/courses
22. Frontend Application

The frontend provides a simple interface for exploring the graph.

Users can:

View jobs
Select a job
View required skills
View companies hiring for the job
Explore related courses
View career recommendations
23. UI/UX

The application focuses on a clean and simple experience.

Main UI sections
┌─────────────────────────────────────────────┐
│              CareerGraph                    │
│       Explore Jobs & Career Paths           │
├─────────────────────────────────────────────┤
│                                             │
│  Search / Select Job                        │
│                                             │
├─────────────────────────────────────────────┤
│                                             │
│  Job Details                                │
│                                             │
│  Required Skills                            │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐       │
│  │ React   │ │ JS      │ │ CSS     │       │
│  └─────────┘ └─────────┘ └─────────┘       │
│                                             │
├─────────────────────────────────────────────┤
│                                             │
│  Companies Hiring                           │
│                                             │
│  Company A       Company B       Company C  │
│                                             │
├─────────────────────────────────────────────┤
│                                             │
│  Recommended Learning                       │
│                                             │
└─────────────────────────────────────────────┘
24. Loading State

While API/database data is being fetched, the application displays a loading state.

Example:

Loading jobs...

This prevents the user from thinking that the application is frozen.

25. Empty State

When no data is available, the application displays a meaningful empty state.

Example:

No jobs found.

Try selecting another category or skill.
26. Error Handling

The application handles database/API failures gracefully.

If CognoDB becomes unavailable, the API returns an appropriate error response instead of crashing the server.

Example:

{
  "success": false,
  "message": "Unable to connect to graph database"
}

The frontend displays a user-friendly message:

Something went wrong.

We couldn't load the career data.
Please try again.
27. Database Unreachable Handling

The application does not expose database credentials to the frontend.

The connection flow is:

Frontend
   ↓
Backend API
   ↓
Neo4j Driver
   ↓
CognoDB

If CognoDB is unreachable:

CognoDB
   X
Backend
   ↓
Error Handler
   ↓
Frontend
   ↓
User-friendly Error Message
28. Running the Project Locally
Step 1 — Clone Repository
git clone 
cd CareerGraph
Step 2 — Install Backend Dependencies
cd backEnd
npm install
Step 3 — Configure Environment Variables

Create:

backEnd/.env

Add:

COGNODB_URI=bolt+s://db-64f32b21.databases.cognodb.com
COGNODB_USERNAME=cognodb
COGNODB_PASSWORD=a26f5f13d74b73a37755bb8a9d85730a

PORT=5000
Step 4 — Seed Database

Run:

npm run seed

This creates the required nodes and relationships in CognoDB.

Step 5 — Start Backend
npm run dev

Backend will run on:

http://localhost:5000
Step 6 — Install Frontend Dependencies

Open another terminal:

cd frontEnd
npm install
Step 7 — Start Frontend
npm run dev

Open the URL shown by Vite, for example:

http://localhost:5173
29. Environment Security

Sensitive configuration is stored using environment variables.

The following files should never be committed:

.env
.env.local

The .gitignore contains:

node_modules/
.env
.env.local

Only safe configuration examples are documented in the repository.

30. Important Files
Database Connection
backEnd/src/config/db.js

Responsible for establishing the CognoDB connection.

Graph Queries
backEnd/src/queries/graphQueries.js

Contains Cypher queries used by the application.

Seed Script
backEnd/src/seed/seed.js

Creates realistic graph data.

API Routes
backEnd/src/routes/

Defines application endpoints.

Frontend
frontEnd/src/

Contains the React application and UI components.



Add screenshot here:

![Dashboard]
Job Details

Add screenshot here:

![Job Details]
Career Recommendations

Add screenshot here:

![Recommendations]


A short screen recording demonstrates the complete application flow.

The video covers:

Opening the application
Exploring jobs
Selecting a job
Viewing required skills
Viewing companies
Exploring related courses
Showing graph-based recommendations

Screen Recording:

ADD_SCREEN_RECORDING_LINK_HERE



35. Design Decisions
Why Node.js + Express?

Node.js provides a lightweight backend for exposing REST APIs, while Express keeps the API structure simple and maintainable.

Why React?

React provides a component-based architecture that makes it easy to build an interactive exploration interface.

Why CognoDB?

CognoDB supports openCypher over Bolt and works with the official Neo4j driver, allowing the application to use standard graph database tooling.

Why Graph Instead of Relational?

The core operations of this application involve traversing relationships:

Candidate
   ↓
Skill
   ↓
Job
   ↓
Company

and:

Candidate
   ↓
Skill
   ↓
Job
   ↓
Required Skill
   ↓
Course

These relationship-heavy queries are where a graph model provides the most value.

36. Future Improvements

Possible future improvements include:

Authentication
Personalized career recommendations
Skill-gap analysis
Graph visualization
Job search filters
Salary-based recommendations
Location-based job discovery
AI-powered career suggestions
More advanced graph analytics
Admin dashboard for managing graph data
37. Conclusion

CareerGraph demonstrates how a graph database can be used to model and explore highly connected career data.

The application uses:

React
   ↓
Express / Node.js
   ↓
Neo4j JavaScript Driver
   ↓
Bolt
   ↓
CognoDB

The main advantage of the graph model is that relationships between candidates, skills, jobs, companies, courses, and industries can be traversed naturally.

The project focuses on:

Graph-first data modeling
Meaningful relationships
Multi-hop traversal
Parameterized Cypher
Clean application architecture
Error handling
User-friendly UI
Maintainable code
