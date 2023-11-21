import logo from './logo.svg';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage/HomePage';
import SpotLight from './SpotLight/SpotLight';
import Porfile from './Porfile/Porfile';
import Comments from './Comments/Comments';
import AddPost from './AddPost/AddPost';
import SignIn from './SignIn/SignIn';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/sign-in' element={<SignIn/>}></Route>
        <Route path='/'element={<HomePage />}></Route>
        <Route path='/spot-light' element={<SpotLight/>}></Route>
        <Route path='/porfile' element={<Porfile />}></Route>
        <Route path='/comments' element={<Comments/>}></Route>
        <Route path='/add-post' element={<AddPost />}></Route>

      </Routes>



  </BrowserRouter>


  );
}

export default App;
