import { Link } from "react-router-dom";

function Dashboard() {

  const skills = [
    "Docker",
    "Kubernetes",
    "AWS",
    "Terraform",
    "Jenkins",
    "Linux",
    "Git"
  ];

  const projects = [
    {
      name: "TalentSphere CICD Platform",
      tech: "React + Spring Boot + Docker"
    },
    {
      name: "AWS EKS Deployment",
      tech: "Terraform + Kubernetes"
    }
  ];

  return (
    <div className="landing">

      <section className="hero">

        <h1>TalentSphere</h1>

        <h2>
          Build • Deploy • Scale
        </h2>

        <p>
          Modern Portfolio Platform powered by
          React, Spring Boot, Docker, Kubernetes
          and AWS.
        </p>

        <div className="hero-buttons">

          <Link to="/login">
            <button>Login</button>
          </Link>

          <Link to="/register">
            <button>Register</button>
          </Link>

        </div>

      </section>

      <section className="section">

        <h2>Technology Stack</h2>

        <div className="skills-grid">

          <div className="badge">React</div>
          <div className="badge">Spring Boot</div>
          <div className="badge">MySQL</div>
          <div className="badge">Docker</div>
          <div className="badge">Kubernetes</div>
          <div className="badge">AWS</div>

        </div>

      </section>

      <section className="section">

        <h2>Projects</h2>

        <div className="project-grid">

          {projects.map((project, index) => (

            <div
              className="project-card"
              key={index}
            >
              <h3>{project.name}</h3>
              <p>{project.tech}</p>
            </div>

          ))}

        </div>

      </section>

      <section className="section">

        <h2>Skills</h2>

        <div className="skills-grid">

          {skills.map((skill, index) => (

            <div
              className="badge"
              key={index}
            >
              {skill}
            </div>

          ))}

        </div>

      </section>

    </div>
  );
}

export default Dashboard;
