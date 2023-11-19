import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage/HomePage';
import SpotLight from './SpotLight/SpotLight';
import Porfile from './Porfile/Porfile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'element={<HomePage />}></Route>
        <Route path='/spot-light' element={<SpotLight/>}></Route>
        <Route path='/porfile' element={<Porfile />}></Route>

      </Routes>



  </BrowserRouter>


  );
}

export default App;
