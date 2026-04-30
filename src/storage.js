// All localStorage interaction for the app lives in this file.
// Every other file imports these helpers instead of touching localStorage directly.
// If we ever swap localStorage for INdexDB or a real backend,
// we change One File and the rest of the app keeps working.

const STORAGE_KEY = "repair-codex:projects";

// Read all projects from localStorage. Returns an empty array if none exist.
export function loadProjects() {
    const raw = localStorage.getItem(STORAGE_KEY);
    // If nothing is stored yet, return an empty array so the caller can map() over it safely.
    if (!raw) return [];
    // JSON.parse converts the stored string back into a real JS array of objects
    return JSON.parse(raw);
}

// Overwrite the entire projects list. Used by addProject, deleteProject, etc.
export function saveProjects(projects){
    // JSON.stringify converts the array of objects into a single string for storage.
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

// Add a single new project to the existing list and save.
export function addProject(project){
    const projects = loadProjects();    // Get current list.
    projects.unshift(project)           // unshift adds to the FRONT (newest first).
    saveProjects(projects);             // Save the updated list back.
    return project;                     // Return the project so the caller can use it.             
}

// Look up one project by id. Returns null if not found.
export function getProject(id){
    const projects = loadProjects();
    // .find() returns the first item where the function returns true, or undefined.
    // We coerce undefined to null so callers can write `if (!project)` cleanly.
    return projects.find((p) => p.id === id) || null;
}

//Update on project (used when adding a comment to it).
// We replace the matching project with the updated version and save the whole list.
export function updateProject(updatedProject){
    const projects = loadProjects();
    const index = projects.findIndex((p) => p.id === updatedProject.id);
    // findIndex returns -1 if no match. Bail out silently if the project doesn't exist.
    if (index === -1) return;
    projects[index] = updatedProject;
    saveProjects(projects);
}