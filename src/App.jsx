import { Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import ChatPage from "./Pages/ChatPage";
import { Toaster } from "sonner";
import EditorPage from "./Pages/EditorPage";

function App() {
  return (
    <div className="w-full h-full z-20">
      <Toaster />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/chats" element={<ChatPage />} />
        <Route exact path="/editor" element={<EditorPage />} />
      </Routes>
    </div>
  );
}

export default App;
