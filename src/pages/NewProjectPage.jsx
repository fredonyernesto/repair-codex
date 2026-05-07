import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { addProject } from "../storage";
import { compressImage } from "../imageCompress"; 

// NewProjectPage is what shows when the URL is "/projects/new"
function NewProjectPage() {
    // useNavigate lets your code change the URL without a click.
    // We use it after saving so the user lands on their new proejct automatically.
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    // Steps need a stable id per item so React can track them across re-renders
    // (this is what the `key` prop in JSX is matching against).
    // crypto.randomUUID() is abrowser built-in - no library needed.
    const [steps, setSteps] = useState([
        { id: crypto.randomUUID(), text: "", image: null },
    ]);

    // The functional setState pattern: the function receives the latest state
    // at the moment React applies the update. Safer than setSteps([...steps])
    // when async or rapid updates are invovled. Build the habit now
    function updateStepText(stepId, newText){
        setSteps((current) => 
        current.map((s) => (s.id === stepId ? { ...s, text: newText } : s))
    );
    }

    function addStep() {
        setSteps((current) => [
            ...current,
            { id: crypto.randomUUID(), text: "", image: null },
        ]);
    }

    function removeStep(stepId){
        setSteps((current) => current.filter((s) => s.id !== stepId));
    }

    function handleSubmit() {
        // Cheap validation. Reject empty title, reject zero non-empty steps.
        if (!title.trim()) {
            alert("Title is required.");
            return;
        }
        const cleanSteps = steps.filter((s) => s.text.trim() !== "");
        if (cleanSteps.length === 0) {
            alert("Add at least one step with text.");
            return;
        }
        const project = {
            id: crypto.randomUUID(),
            title: title.trim(),
            description: description.trim(),
            createdAt: Date.now(),
            steps: cleanSteps,
            comments: [],
        };

    // async because we're awaiting a Promise. The function pauses at await
    // until compressImage finishes, then continue with the result.
    async function handleImageUpload(stepId, file) {
        if (!file) return;
        try{
            const compressed = await compressImage(file);
            setSteps((current) =>
                current.map((s) => (s.id === stepId ? { ...s, image: compressed } : s))
            );
        } catch (err) {
            console.error("compression failed:", err);
            alert("Could not process that image. Try a different one.");
        }
    }

        addProject(project);
        // Redirect to the freshly-saved project so the user sees is it persisted.
        navigate(`/projects/${project.id}`);
    }
    return (
        
            <div style={{ maxWidth: "720px", margin: "0 auto", padding: "2rem", fontFamily: "system-ui, sans-serif"}}>
                <Link to="/">← Back to home</Link>
                <h1>New Project</h1>

                <label style={{ display: "block", marginBottom: "1rem"}}>
                    Title
                    <input 
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)} 
                    style={{ display: "block", width: "100%", padding: "0.5rem", marginTop: "0.25rem"}}
                    />
                </label>

                <label style={{ display: "block", marginBottom: "1rem"}}>
                    Description
                    <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    style={{display: "block", width: "100%", padding: "0.5rem", marginTop: "0.25rem"}}
                    />
                </label>

                <h2>Steps</h2>
                {steps.map((step, index) => (
                    <div key={step.id} style={{ marginBottom: "1rem", padding: "1rem", border: "1px solid #ddd", borderRadius: "4px"}}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                            <strong>Step {index + 1}</strong>
                            {steps.length > 1 && (
                                <button onClick={() => removeStep(step.id)}>remove</button>
                            )}
                        </div>
                        <textarea
                        value={step.text}
                        onChange ={(e) => updateStepText(step.id, e.target.value)}
                        rows={3}
                        placeholder="What do you do in this step?"
                        style={{ display: "block", width: "100%", padding: "0.5rem", marginTop: "0.5rem"}}
                        />   
                        {/* accept="image/" hints to mobile browsers to offer the camera as an option. */}  
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(step.id, e.target.files[0])}
                            style={{ marginTop: "0.5rem" }}
                        />
                        {/* The && short-circuit only renders <img> when step.image has a value. */}
                        {step.imgage && (
                            <img
                                src={step.image}
                                alt={`Step ${index + 1}`}
                                style={{ maxWidth: "100%", marginTop: "0.5rem", borderRadius: "4px"}}
                            />
                        )}
                    </div>
                ))}

                <button onClick={addStep}>+ Add Step</button>
                <hr sytle={{ margin: "2rem 0"}} />

                <button
                onClick={handleSubmit}
                stytle={{ background: "#2563eb", color: "white", padding: " 0.6rem 1.2rem", borderRadius: "4px", border: "none", fontSize: "1rem", cursor: "pointer"}}
                >
                    Save Project
                </button>
            </div>
        
    )
}

export default NewProjectPage;