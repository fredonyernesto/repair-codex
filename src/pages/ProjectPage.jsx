import { useParams, Link } from "react-router";

// :id in the route pattern is a placeholder. Whatever ends up in that 
// segement of the URL gets passed in via useParams. Visit /project/abc123
// useParams() returns { id: "abc123"}

function ProjectPage(){
    const { id } = useParams();

    return(
        <div style={{ maxWidth: "720", margin: "0 auto", padding: "2rem", fontFamily: "system-ui, sans-serif"}}>
            <Link to="/">← Back to home</Link>
            <h1>Project {id}</h1>
            <p>This is where the steps will go</p>
        </div>
    )
}

export default ProjectPage;