import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {ProfilePage} from "./pages/profilePage";

function App() {
  return (
      <BrowserRouter>
        <div className={'app-container'}>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <Link to="/report">Users</Link>
              </li>
            </ul>
          </nav>

          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/profile" element={<ProfilePage/>}/>
            <Route path="/report" element={<Users/>}/>
          </Routes>
        </div>
      </BrowserRouter>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}

export default App;
