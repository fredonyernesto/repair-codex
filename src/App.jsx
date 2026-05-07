import { Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import NewProjectPage from "./pages/NewProjectPage";
import ProjectPage from "./pages/ProjectPage";

function App(){
  return(
    // Routes is the dispatcher. Looks at the current URL and renders.
<Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/projects/new" element={<NewProjectPage />} />
  <Route path="/projects/:id" element={<ProjectPage />} />
</Routes>
  );
}

export default App;