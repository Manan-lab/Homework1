import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ToDo from './Components/pages/ToDo';
import './style.css';
import SingleTask from './Components/pages/SingleTask';
import NotFound from './Components/pages/NotFound';
import About from './Components/pages/About';
import Contact from './Components/pages/Contact'
import NavMenu from './Components/NavMenu';
import { Route, Switch, Redirect } from 'react-router-dom';



function App() {

  return (
    <div className='todo'>

      <NavMenu />
      <Switch>
        <Route path='/' exact component={ToDo} />
        <Route path='/task' exact component={SingleTask} />
        <Route path='/about' exact component={About} />
        <Route path='/contact' exact component={Contact} />
        <Route path='/not-found' exact component={NotFound} />
        <Redirect to= '/not-found'/>
      </Switch>
    </div>
  );
};

export default App;