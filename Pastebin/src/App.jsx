import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Create from './create';
import View from './view';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={< Create/>} />
        <Route path="/:id" element={<View />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
