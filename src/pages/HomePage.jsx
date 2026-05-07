import { useState, useEffect } from "react";
import { Link } from "react-router";
import { loadProjects } from "../storage";
import ProjectCard from "../components/ProjectCard";


// HomePage is what shows when the URL is "/".
function HomePage(){
    // Two pieces of state: the full list of projects, and the current search text.
    const [projects, setProjects] = useState([]);
    const [searchText, setSearchText] = useState("");

    // useEffect with an empty dependency array [] runs ONCE when the component mounts.
    // We use it here to load projects from storage when the home page first renders.
    useEffect(() =>{
        setProjects(loadProjects());
    }, []);

    // Filter the projects based on searchText.
    // toLowerCase() on both sides makes the search case-insenstitive.
    // .includes() is a substring match - "asus" matches "Opening my ASUS laptop".
    const filtered = projects.filter((p) => {
        const query = searchText.toLowerCase();
        return (
            p.title.toLowerCase().includes(query) ||
            p.description.toLowerCase().includes(query)
        );
    });

    return (
        <div style={{ maxWidth: "720px", margin: "0 auto", padding: "2rem", fontFamily: "system-ui, sans-serif"}}>
            <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem"}}>
            <h1 style={{ margin: 0}}>🛠 Repair Codex</h1>
            {/*This link is styled like a button via inline CSS. Same routing under the hood.*/}
            
            <Link 
            to="/projects/new"
            style={{ background: "#2563eb", color: "white", padding: "0.5rem 1rem", borderRadius: "4px", textDecoration: "none"}}
            >
            + New Project
            </Link> 
            </header>

            {/* Search bar. Controlled input, exactly like in the High Score Wall. */}
            <input
            type="text"
            placeholder="Search projects..."
            value={searchText}
            onChange={(e) => setSearchText (e.target.value)}
            style={{ width: "100%", padding: "0.6rem", marginBottom: "1.5rem", fontSize: "1rem"}}
            />

            {/* Three different render branches based on what the data looks like. */}
            {projects.length === 0 ? (
                <p>No projects yet. Click "+ New Project" to write your first tutorial.</p>
            ) : filtered.length === 0 ? (
                <p>No projects match "{searchText}".</p>
            ) : (
                <div>
                    {filtered.map((project) =>(
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default HomePage;