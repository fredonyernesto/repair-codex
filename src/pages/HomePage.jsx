import { Link } from "react-router";

// HomePage is what shows when the URL is "/".
function HomePage(){
    return (
        <div>
            <h1>Repair Codex</h1>
            <p>This is the home page. Soon it will list your projects.</p>
            <Link to="/projects/new">+ New Project</Link> 
        </div>
    )
}

export default HomePage;