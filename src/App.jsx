import { Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import NewProjectPage from "./pages/NewProjectPage";

function App(){
  return(
    // Routes is the dispatcher. Looks at the current URL and renders.
<Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/projects/new" element={<NewProjectPage />} />
</Routes>
  );
}

export default App;