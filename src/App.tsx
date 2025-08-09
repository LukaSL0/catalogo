import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotFound from "./components/NotFound";
import Home from './components/Home';
import VinhoDetalhado from './components/VinhoDetalhado';
import Admin from './components/Admin';
import ProtectedRoute from './ProtectedRoute';
import { DataProvider } from "./contexts/DataContext";

const App: React.FC = () => {
  return (
    <DataProvider>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path="/vinho/:name" element={<VinhoDetalhado />} />
            
            <Route element={<ProtectedRoute />}>
              <Route path="/admin" element={<Admin />} />
            </Route>

            <Route path='*' element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </DataProvider>
  );
};

export default App;