import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API_URL = "http://localhost:5000/api";

function App() {
  const [skills, setSkills] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState("");
  const [relatedSkills, setRelatedSkills] = useState([]);
  const [recommendedJobs, setRecommendedJobs] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Load all skills when page opens
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setError("");

        const response = await axios.get(`${API_URL}/skills`);

        setSkills(response.data.data);
      } catch (error) {
        console.error(error);
        setError("Unable to load skills. Please try again.");
      }
    };

    fetchSkills();
  }, []);

  
  const handleExplore = async () => {
    if (!selectedSkill) {
      return;
    }

    try {
      setLoading(true);
      setError("");

      const [relatedResponse, jobsResponse] = await Promise.all([
        axios.get(
          `${API_URL}/skills/${encodeURIComponent(
            selectedSkill
          )}/related`
        ),

        axios.get(
          `${API_URL}/recommendations/${encodeURIComponent(
            selectedSkill
          )}`
        ),
      ]);

      setRelatedSkills(relatedResponse.data.data);
      setRecommendedJobs(jobsResponse.data.data);
    } catch (error) {
      console.error(error);

      setError(
        "Unable to load recommendations. Please try again."
      );

      setRelatedSkills([]);
      setRecommendedJobs([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="logo">
          Skill<span>Graph</span>
        </div>

        <div className="header-text">
          Graph-powered career discovery
        </div>
      </header>

      {/* Hero */}
      <main className="container">
        <section className="hero">
          <p className="eyebrow">CAREER GRAPH</p>

          <h1>
            Discover where your
            <span> skills can take you.</span>
          </h1>

          <p className="description">
            Select a skill to discover related technologies and
            career opportunities through connected knowledge.
          </p>

          {/* Search Box */}
          <div className="search-box">
            <select
              value={selectedSkill}
              onChange={(e) => setSelectedSkill(e.target.value)}
            >
              <option value="">Select a skill</option>

              {skills.map((skill) => (
                <option key={skill.name} value={skill.name}>
                  {skill.name}
                </option>
              ))}
            </select>

            <button
              onClick={handleExplore}
              disabled={!selectedSkill || loading}
            >
              {loading ? "Exploring..." : "Explore"}
            </button>
          </div>

          {/* Error */}
          {error && (
            <div className="error">
              {error}
            </div>
          )}
        </section>

        {/* Results */}
        <section className="results">
          {/* Related Skills */}
          <div className="card">
            <div className="card-header">
              <div>
                <p className="card-label">CONNECTIONS</p>
                <h2>Related Skills</h2>
              </div>

              <div className="icon">↗</div>
            </div>

            {loading ? (
              <p className="state">Finding related skills...</p>
            ) : relatedSkills.length > 0 ? (
              <div className="tags">
                {relatedSkills.map((skill) => (
                  <div className="tag" key={skill}>
                    {skill}
                  </div>
                ))}
              </div>
            ) : (
              <p className="state">
                Select a skill to explore its connections.
              </p>
            )}
          </div>

          {/* Recommended Jobs */}
          <div className="card">
            <div className="card-header">
              <div>
                <p className="card-label">CAREER PATHS</p>
                <h2>Recommended Jobs</h2>
              </div>

              <div className="icon">→</div>
            </div>

            {loading ? (
              <p className="state">
                Finding career opportunities...
              </p>
            ) : recommendedJobs.length > 0 ? (
              <div className="jobs">
                {recommendedJobs.map((job) => (
                  <div className="job" key={job}>
                    <div className="job-dot"></div>

                    <span>{job}</span>

                    <span className="arrow">→</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="state">
                Your recommended career paths will appear here.
              </p>
            )}
          </div>
        </section>

        {/* Graph Explanation */}
        <section className="graph-section">
          <p className="card-label">HOW IT WORKS</p>

          <h2>Explore the career graph</h2>

          <div className="graph">
            <div className="graph-node main-node">
              {selectedSkill || "Your Skill"}
            </div>

            <div className="line">
              <span>RELATED_TO</span>
            </div>

            <div className="graph-node">
              Related Skills
            </div>

            <div className="line">
              <span>REQUIRED_FOR</span>
            </div>

            <div className="graph-node">
              Job Roles
            </div>
          </div>
        </section>
      </main>

      <footer>
        SkillGraph · Powered by CognoDB
      </footer>
    </div>
  );
}

export default App;