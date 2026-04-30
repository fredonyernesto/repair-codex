import { Link } from "react-router";

// NewProjectPage is what shows when the URL is "/projects/new"
function NewProjectPage() {
    return (
        <div>
            <h1>New Project</h1>
            <p>This is where the form will go.</p>
            <Link to="/">← Back to home</Link>
        </div>
    )
}

export default NewProjectPage;