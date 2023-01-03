import './App.css';
import {Route, Routes} from "react-router-dom";
import { lazy, Suspense } from "react";
import Layout from './pages/layout.js';

const Setup = lazy(() => import('./pages/setup.js'));
const ShootingContainer = lazy(() => import('./pages/shooting'));
const MovementContainer = lazy(() => import('./pages/movement'));

function App() {
  return (
    <div>
        <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={
                <Suspense fallback={<div></div>}>
                  <Setup />
                </Suspense>
              }/>
            <Route path="shooting" element={
                <Suspense fallback={<div></div>}>
                  <ShootingContainer />
                </Suspense>
              }/>
            <Route path="movement" element={
              <Suspense fallback={<div></div>}>
                <MovementContainer />
              </Suspense>
            }/>
            </Route>
        </Routes>
      </div>
  )
}

export default App;
