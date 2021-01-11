import React, { PureComponent } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ToDo from './Components/pages/ToDo';
import './style.css';
import SingleTask from './Components/pages/SingleTask/SingleTask';
import NotFound from './Components/pages/NotFound';
import About from './Components/pages/About';
import Contact from './Components/pages/Contact'
import NavMenu from './Components/NavMenu';
import { Route, Switch, Redirect } from 'react-router-dom';
import Spinner from './Components/Spinner/Spinner'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { connect } from 'react-redux';
import Register from './Components/pages/Register/Register'
import Login from './Components/pages/Login/Login'


class App extends PureComponent {

  componentDidUpdate() {
    const { errorMessage, successMessage, authErrorMessage, authSuccessMessage } = this.props;
    if (errorMessage) {
      toast.error(errorMessage);
    }
    if (successMessage) {
      toast.success(successMessage);
    }
    if (authErrorMessage) {
      toast.error(errorMessage);
    }
    if (authSuccessMessage) {
      toast.success(successMessage);
    }

  }

  render() {

    const { showSpinner,showAuthSpinner } = this.props;

    return (
      <>
        <div className='app'>
          <NavMenu />
          <Switch>
            <Route path='/' exact component={ToDo} />
            <Route path='/task/:id' exact component={SingleTask} />
            <Route path='/about' exact component={About} />
            <Route path='/contact' exact component={Contact} />
            <Route path='/not-found' exact component={NotFound} />
            <Route path='/register' exact component={Register} />
            <Route path='/login' exact component={Login} />
            <Redirect to='/not-found' />
          </Switch>

          <ToastContainer
            position="bottom-left"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
        { (showSpinner || showAuthSpinner) && <Spinner />}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    errorMessage: state.taskReducer.error,
    successMessage: state.taskReducer.successMessage,
    authErrorMessage: state.authReducer.error,
    authSuccessMessage: state.authReducer.successMessage,
    showSpinner: state.taskReducer.loading,
    showAuthSpinner:state.authReducer.loading
  }
}

export default connect(mapStateToProps, null)(App);