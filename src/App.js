import './App.scss';
import { BrowserRouter, Routes, Route, } from 'react-router-dom';
import NotFound from "./components/NotFound.js";
import Home from './components/Home.js';
import VinhoDetalhado from './components/VinhoDetalhado.js';
import Admin from './components/Admin.js';
import ProtectedRoute from './ProtectedRoute.js';

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path="/vinho/:name" element={<VinhoDetalhado />} />

          <Route element={<ProtectedRoute />} >
            <Route path="/admin" element={<Admin />} />
          </Route>

          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}