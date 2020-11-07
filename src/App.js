import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import ValuesComponent from './Components/ValuesComponent';
import UsersComponent from './Components/UsersComponent';
import './App.css';
import { Grid } from '@material-ui/core';

function App() {
  return (

    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to='/'>Valores</Link>
            </li>
            <li>
              <Link to='/users'>Usuarios</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path='/users'>
            <UsersComponent />
          </Route>
          <Route path='/'>
            <ValuesComponent />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App;
