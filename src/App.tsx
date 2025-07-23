import { Routes, Route } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { CoinDetail } from "./pages/CoinDetail";
import { Sidebar } from "./components/Sidebar";

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/coin/:coinId" element={<CoinDetail />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
