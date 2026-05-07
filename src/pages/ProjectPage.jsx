import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { getProject, updateProject } from "../storage";

// :id in the route pattern is a placeholder. Whatever ends up in that 
// segement of the URL gets passed in via useParams. Visit /project/abc123
// useParams() returns { id: "abc123"}

function ProjectPage(){
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [commentName, setCommentName] = useState("");
    const [commentBody, setCommentBody] = useState("");

    

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

    

    function handleAddComment(){
        if (!commentName.trim() || !commentBody.trim()) {
            alert("Name and comment are both required.");
            return;
        }

        const newComment = {
            id: crypto.randomUUID(),
            name: commentName.trim(),
            body: commentBody.trim(),
            createdAt: Date.now(),
        }

        //Spread the existing project into a new object, then overwrite comments
        // with the old array plus the new entry appended to the end.
        // (project.comments || []) handles older saved projects that might predate this field.
        const updated = {
            ...project,
            comments: [...(project.comments || []), newComment],
        };

        updateProject(updated);

        // Re-read from storage after writing so the screen always reflects what was actually saved.
        // This is called read-after-write - slightly slower, but screen and storage stay in sync.
        setProject(getProject(id));
        setCommentName("");
        setCommentBody("");
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
            ))}
            <hr />
            <h2>Comments</h2>
            {project.comments && project.comments.length > 0 ? (
                project.comments.map((comment) => (
                    <div key={comment.id} style={{ marginBottom: "1rem", padding: "0.75rem", background: "#f4f4f4", borderRadius: "4px"}}>
                        <strong>{comment.name}</strong>
                        <p style={{ maring: "0.25rem 0 0 0"}}>{comment.body}</p>
                        </div>
                ))
            ) : (
                <p style ={{ color: "#888" }}>No comments yet.</p>
            )}
            <div style={{ marginTop: "1.5rem"}}>
                <input
                type="text"
                value={commentName}
                onChange={(e) => setCommentName(e.target.value)}
                placeholder="Your name"
                style={{ display: "block", width: "100%", padding: "0.5rem", marginBottom: "0.5rem"}}
                />
                <textarea
                value={commentBody}
                onChange={(e) => setCommentBody(e.target.value)}
                rows={3}
                placeholder="Your comment"
                style={{ display: "block", width: "100%", padding: "0.5rem", marginBottom: "0.5rem"}}
                />
                <button
                    onClick={handleAddComment}
                    style={{ background: "#2563eb", color: "white", padding: "0.5rem 1rem", border: "none", cursor: "pointer"}}
                >
                    Post Comment
                </button>
            </div>
        </div>
    );
}

export default ProjectPage;