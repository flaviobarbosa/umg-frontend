import { Routes, Route } from 'react-router';
import Home from './pages/Home';
import Track from './pages/Track';

function App() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path='track' element={<Track />} />
    </Routes>
  );
}

export default App;
