import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage/HomePage';
import SpotLight from './SpotLight/SpotLight';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'element={<HomePage />}></Route>
        <Route path='/spot-light' element={<SpotLight/>}></Route>

      </Routes>



  </BrowserRouter>


  );
}

export default App;
