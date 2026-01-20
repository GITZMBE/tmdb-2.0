import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, Layer, Filter, Genres, Genre, MoviePage, SeriesPage } from './pages';

const App = () => {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layer />}>
            <Route index element={<Home />} />
            <Route path='/home' element={<Home />} />
            <Route path='/movie'>
              <Route path=':id' element={<MoviePage />} />
            </Route>
            <Route path='/series'>
              <Route path=':id' element={<SeriesPage />} />
            </Route>
            <Route path='/filter' element={<Filter />} />
            <Route path='/genres' element={<Genres />}>
              <Route path=':id' element={<Genre />}/>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
