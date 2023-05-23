import { Routes, Route } from 'react-router-dom';
import SignIn from './component/SignIn.jsx'
import SignUp from './component/SignUp.jsx';
import Dashboard from './component/Dashboard.jsx';
import Project from './component/Project.jsx';
import PrivateRoute from './PrivateRoute.js';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path='/' element={<PrivateRoute/>}>
            <Route exact path='/' element={<Dashboard/>}/>
            <Route exact path='/project/:id' element={<Project/>}/>
          </Route>
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
