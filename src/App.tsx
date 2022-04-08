import './App.css';
import { Movies } from './components/Movies';
import { ShowDetailedMovie } from './components/ShowDetailedMovie';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import "animate.css"


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <header>
          <Link to="/"><h1 className='animate__animated animate__fadeInDown'>Flixville</h1></Link>
        </header>

        <Routes>

          <Route path='/' element={<Movies></Movies>}></Route>

          <Route path='/details/:id' element={<ShowDetailedMovie></ShowDetailedMovie>}></Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
