import React, {Suspense} from 'react';
import {RouterProvider} from 'react-router-dom';
import routes from './routes/Router';
import './styles/styles.scss';
import CircularProgress from '@mui/material/CircularProgress';

function App() {
  return (
    <div className="app">
        <Suspense
            fallback={
                <CircularProgress color="success" />
            }
        >
            <RouterProvider router={routes}/>
        </Suspense>
    </div>
  );
}

export default App;
