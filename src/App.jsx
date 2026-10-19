import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Accommodation from './pages/Accommodation';
import Experiences from './pages/Experiences';
import Contact from './pages/Contact';
import Layout from './components/layout/Layout';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/accommodation" element={<Accommodation />} />
        <Route path="/experiences" element={<Experiences />} />
        <Route path="/contact" element={<Contact />} />
      </Route>
    </Routes>
  );
}

export default App;
