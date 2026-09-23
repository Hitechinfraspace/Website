import { projects } from "./projects";
import "./projects.css";

const ProjectsPage = ({ setSelectedProject, setCurrentPage }) => {
  return (
    <div className="projects-page">
      <div className="projects-page__inner">
        <h1 className="projects-page__title animate-in fade-in slide-in-from-top-4 duration-500">
          Mission Critical Portfolio
        </h1>

        <div className="projects-page__grid">
          {projects.map((project) => (
            <button
              type="button"
              key={project.id}
              onClick={() => {
                setSelectedProject(project);
                setCurrentPage("projectDetails");
              }}
              className="project-card"
            >
              <img
                src={project.images[0]}
                alt={project.title}
                className="project-card__image"
              />

              <div className="project-card__overlay" />

              <div className="project-card__content">
                <p className="project-card__location">
                  {project.location}
                </p>
                <h3 className="project-card__title">
                  {project.title}
                </h3>
                <p className="project-card__hint">
                  Click to explore
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
