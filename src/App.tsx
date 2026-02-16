// import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layer, Filter, Genres, Genre, MoviePage, Dashboard } from "./pages";
import MovieRedirect from "./pages/MovieRedirect";

const App = () => {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layer />}>
            <Route index element={<Navigate to='/dashboard' replace />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/stream'>
              <Route path=':id' element={<MoviePage />}>
                <Route path='redirect' element={<MovieRedirect />} />
              </Route>
            </Route>
            <Route path='/filter' element={<Filter />} />
            <Route path='/genres' element={<Genres />}>
              <Route path=':id' element={<Genre />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
