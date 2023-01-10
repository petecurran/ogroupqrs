import './App.css';
import {Route, Routes} from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import Layout from './pages/layout.js';
import Welcome from './pages/welcome.js';

const Setup = lazy(() => import('./pages/setup.js'));
const ShootingContainer = lazy(() => import('./pages/shooting'));
const MovementContainer = lazy(() => import('./pages/movement'));

function App() {

  const checkForUpdates = () => {

    //clear local storage if there have been update to the JSON
    //last update: January 10th 2023
    const lastUpdate = new Date(2023, 0, 7)

    //check if lastSave exists in local storage
    if (localStorage.getItem('lastSave') != null) {
      const timestamp = localStorage.getItem('lastSave');
      const lastSave = new Date(timestamp);

      //if the last save was before the last update, clear local storage
      if (lastSave < lastUpdate) {
        localStorage.clear();
      }
    } else {
      //if lastSave does not exist, clear local storage
      localStorage.clear();
    }
  }

  useEffect (() => {
    checkForUpdates();
  }, [])

  return (
    <div>
        <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={
                <Suspense fallback={<div></div>}>
                  <Welcome />
                </Suspense>
              }/>
            <Route path="selectunits" element={
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
