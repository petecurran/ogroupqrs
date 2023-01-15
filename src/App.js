import './App.css';
import {Route, Routes} from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import ReactLoading from 'react-loading';

const Setup = lazy(() => import('./pages/setup.js'));
const ShootingContainer = lazy(() => import('./pages/shooting'));
const MovementContainer = lazy(() => import('./pages/movement'));
const WelcomeContainer = lazy(() => import('./pages/welcome'));
const LayoutContainer = lazy(() => import('./pages/layout'));

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
            <Route path="/" element={<LayoutContainer />}>
              <Route index element={
                <Suspense fallback={<ReactLoading type={"bars"} color={"#83894D"} height={'50px'} width={'50px'} className="loadinganimation"/>}>
                  <WelcomeContainer />
                </Suspense>
              }/>
            <Route path="selectunits" element={
                <Suspense fallback={<ReactLoading type={"bars"} color={"#83894D"} height={'50px'} width={'50px'} className="loadinganimation"/>}>
                  <Setup />
                </Suspense>
              }/>
            <Route path="shooting" element={
                <Suspense fallback={<ReactLoading type={"bars"} color={"#83894D"} height={'50px'} width={'50px'} className="loadinganimation"/>}>
                  <ShootingContainer />
                </Suspense>
              }/>
            <Route path="movement" element={
              <Suspense fallback={<ReactLoading type={"bars"} color={"#83894D"} height={'50px'} width={'50px'} className="loadinganimation"/>}>
                <MovementContainer />
              </Suspense>
            }/>
            </Route>
        </Routes>
      </div>
  )
}

export default App;
