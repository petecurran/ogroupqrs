import './App.css';
import {Route, Routes} from "react-router-dom";
import Layout from './pages/layout.js';
import Setup from './pages/setup.js';
import ShootingContainer from './pages/shooting';
import MovementContainer from './pages/movement';

function App() {
  return (
    <div>
        <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Setup />}/>
              <Route path="shooting" element={<ShootingContainer />}/>
              <Route path="movement" element={<MovementContainer />}/>
            </Route>
        </Routes>
      </div>
  )
}

export default App;
