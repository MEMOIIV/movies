import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Main from './components/Main/Main';
import Home from './components/Home/Home';
import Login from './components/Login/Login'
import Register from './components/Register/Register';
import AllMovies from './components/AllMovies/AllMovies';
import AllTvShow from './components/AllTvShow/AllTvShow';
import People from './components/people/People';
import Details from './components/Details/Details';
const router = createBrowserRouter([
    { path :'' , element:<Main/> ,children:[
    {path : '' , element : <Home/>},
    {path : 'home' , element : <Home/>},
    {path : 'movies' , element : <AllMovies/>},
    {path : 'tv' , element : <AllTvShow/>},
    {path : 'people' , element : <People/>},
    {path : 'details/:media/:id' , element : <Details/>},
    {path : 'login' , element : <Login />},
    {path : 'register' , element : <Register/>},
    {path : '*' , element : <h2> Error</h2>},
  ]}
])

function App() {
  return <>
  <RouterProvider router={router}/>
  </>
};export default App;
