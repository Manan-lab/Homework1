import React, { PureComponent } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ToDo from './Components/pages/ToDo';
import './style.css';
import SingleTask from './Components/pages/SingleTask/SingleTask';
import NotFound from './Components/pages/NotFound/NotFound';
import About from './Components/pages/AboutUs/About';
import Contact from './Components/pages/Contact/Contact'
import NavMenu from './Components/NavMenu';
import { Route, Switch, Redirect } from 'react-router-dom';
import Spinner from './Components/Spinner/Spinner'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { connect } from 'react-redux';
import Register from './Components/pages/Register/Register'
import Login from './Components/pages/Login/Login';
import CostomRoute from './Components/CostomRoute'
import Footer from './Components/Footer/footer'



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
      toast.error(authErrorMessage);
    }
    if (authSuccessMessage) {
      toast.success(authSuccessMessage);
    }

  }

  render() {

    const { showSpinner, showAuthSpinner } = this.props;

    return (
      <>
        <div className='app'>
          <NavMenu />
          <Switch>
            <CostomRoute type='private' path='/' exact component={ToDo} />
            <CostomRoute type='private' path='/task/:id' exact component={SingleTask} />
            <Route path='/about' exact component={About} />
            <Route path='/contact' exact component={Contact} />
            <Route path='/not-found' exact component={NotFound} />
            <CostomRoute path='/register' exact component={Register} />
            <CostomRoute path='/login' exact component={Login} />
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
       <Footer />
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
    showAuthSpinner: state.authReducer.loading
  }
}

export default connect(mapStateToProps, null)(App);