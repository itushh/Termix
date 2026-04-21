import { BrowserRouter, Route, Routes } from "react-router-dom"
import Analyze from "./pages/Analyze"
import Header from "./components/Header"

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-dvh flex flex-col">
        <Header />
        <Routes>
          <Route path="/" element={<div className="flex-1 flex justify-center items-center">Lander</div>} />
          <Route path="/analyze" element={<Analyze />} />
          <Route path="/about" element={<div className="flex-1 flex justify-center items-center">About</div>} />
          <Route path="/contact" element={<div className="flex-1 flex justify-center items-center">Contact</div>} />
          <Route path="*" element={<div className="flex-1 flex justify-center items-center">404 | Not Found</div>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App