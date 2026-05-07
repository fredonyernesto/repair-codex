import { Link } from "react-router";

//A single card on the home page representing one project.
// We pass the full project object as a prop and pull out what we need.
function ProjectCard({ project }) {
    // Find the first step that has an image, to use as the card's thumbnail.
    // .find() returns the first match or undefined.

    const firstImageStep = project.steps.find((s) => s.image);
    const thumbnail = firstImageStep ? firstImageStep.image : null;

    // Format the date nicely. toLocaleDateString picks a sensisble default for the user's locale.
    const dateLabel = new Date(project.createdAt).toLocaleDateString();

    
    return(
        // Wrap the whole card in a link so clicking anywhere on it navigates to the project.
        <Link 
        to={`/projects/${project.id}`}
        style={{
            display: "flex",
            gap: "1rem",
            padding: "1rem",
            marginBottom: "1rem",
            border: "1px solid #ddd",
            borderRadius: "6px",
            textDecoration: "none",
            color: "inherit", // Overide the defualt blue link color.
        }}
        > 
        {thumbnail && (
            <img
            src={thumbnail}
            alt=""             // Empty alt because the title carries the meaning; this image is decorative.
            style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "4px"}}
            />
        )}
        <div style={{ flex: 1}}>
            <h2 style={{ margin: "0 0 0.25rem 0", fontSize: "1.1rem"}}>{project.title}</h2>
            <p style ={{margin: "0 0 0.5rem 0", color: "#555", fontSize: "0.9rem"}}>
                {project.description}
            </p>
            <small style={{ color: "#888"}}>
                {project.steps.length} step{project.steps.length === 1 ? "" : "s"} · {dateLabel}
            </small>
        </div>
        </Link>
    )
}

export default ProjectCard;