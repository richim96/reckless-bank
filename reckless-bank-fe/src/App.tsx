import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import AccountPage from "./components/AccountPage";

function App() {
  return (
    <BrowserRouter>
      <h1 className="text-2xl font-bold mb-6 text-center">Reckless Bank</h1>
      <br/>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/account" element={<AccountPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;