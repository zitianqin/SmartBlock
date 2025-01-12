import { HashRouter, Routes, Route } from "react-router-dom";
import Popup from "@/pages/popup";
import BlockedSite from "@/pages/blocked";
import Settings from "@/pages/settings";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Popup />} />
        <Route path="/blocked" element={<BlockedSite />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
