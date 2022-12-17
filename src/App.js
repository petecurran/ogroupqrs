import './App.css';
import {Route, Routes} from "react-router-dom";
import Layout from './pages/layout.js';
import Setup from './pages/setup.js';

function App() {
  return (
    <div>
        <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Setup />}/>
              {/*<Route path="orders" element={<Orders/>} />
              <Route path="attacking" element={<Attacking/>}/>*/}
            </Route>
        </Routes>
      </div>
  )
}

export default App;
