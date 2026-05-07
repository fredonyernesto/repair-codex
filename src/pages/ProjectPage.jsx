import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { getProject } from "../storage";

// :id in the route pattern is a placeholder. Whatever ends up in that 
// segement of the URL gets passed in via useParams. Visit /project/abc123
// useParams() returns { id: "abc123"}

function ProjectPage(){
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);

    // [id] in the dependency array means: re-run this effect whenever `id` changes.
    // If the user navigates from one project to another, the page re-fetches automatically.
    useEffect(() => {
        setProject(getProject(id));
        setLoading(false);
    }, [id]);

    // Guard clauses handle loading and missing data before the main render.
    // This pattern also makes it easy to swap in async data fetching later.
    if (loading) return <div style={{ padding: "2rem" }}>Loading...</div>

    if (!project) {
        return (
            <div style={{ maxWidth: "720px", margin: "0 auto", padding: "2rem", fontFamily: "system-ui, sans-serif"}}>
                <Link to="/">← Back to home</Link>
                <h1>Project not found</h1>
                <p>The project doesn't exist or may have been deleted.</p>
            </div>
        );
    }
    
    return(
        <div style={{ maxWidth: "720px", margin: "0 auto", padding: "2rem", fontFamily: "system-ui, sans-serif"}}>
            <Link to="/">← Back to home</Link>
            <h1>{project.title}</h1>
            <p style={{ color: "#555"}}>{project.description}</p>
            <hr />
            <h2>Steps</h2>
            {project.steps.map((step, index) =>(
                <div key={step.id} style={{ marginBottom: "2rem" }}>
                <h3>Step {index +1}</h3>
                <p>{step.text}</p>
                {step.image && (
                    <img 
                        src={step.image}
                        alt={`Step ${index + 1}`}
                        style={{ maxWidth: "100%", borderRadius: "4px"}}
                    />
                )}
                </div>
            ))};
        </div>
    );
}

export default ProjectPage;