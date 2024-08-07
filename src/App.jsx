import React from 'react';
import Chart from 'chart.js/auto';
import { Route,Routes} from 'react-router-dom';
import Dashboard1 from './components/Dashboard1';
import Dashboard2 from './components/Dashboard2';
import NavBar from './components/NavBar';

const App = () => {
  return (
    <>
      <Routes >
        {/* public routes */}
        <Route path="/" element={<NavBar />}>
          <Route path="/" element={<Dashboard1 />} />
          <Route path="/comparison" element={<Dashboard2 />} />

          {/* Missing route */}
          <Route path="*" element={<><h1 style={{textAlign:'center'}}>Error:404 Page Not Found</h1></>}/>
        </Route>
      </Routes>
    </>
    
  );
}

export default App;
