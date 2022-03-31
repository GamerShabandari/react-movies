import './App.css';
import { Movies } from './components/Movies';
import { ShowDetailedMovie } from './components/ShowDetailedMovie';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <header>
          <Link to="/"><h1>Flixville</h1></Link>
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
