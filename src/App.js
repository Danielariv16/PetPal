import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import SpotLight from './components/SpotLight/SpotLight';
import Porfile from './components/Porfile/Porfile';
import Comments from './components/Comments/Comments';
import AddPost from './components/AddPost/AddPost';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SignIn/>}></Route>
        <Route path='/Home'element={<HomePage />}></Route>
        <Route path='/spot-light' element={<SpotLight/>}></Route>
        <Route path='/porfile' element={<Porfile />}></Route>
        <Route path='/comments/:id' element={<Comments/>}></Route>
        <Route path='/add-post' element={<AddPost />}></Route>
        <Route path='sign-up' element={<SignUp/>}></Route>

      </Routes>



  </BrowserRouter>


  );
}

export default App;
