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


class App extends PureComponent {

  componentDidUpdate() {
    const { errorMessage, successMessage } = this.props;
    if (errorMessage) {
      toast.error(errorMessage);
    }
    if (successMessage) {
      toast.success(successMessage);
    }

  }

  render() {

    const { showSpinner } = this.props;

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
        { showSpinner && <Spinner />}

      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    errorMessage: state.error,
    successMessage: state.successMessage,
    showSpinner: state.loading
  }
}

export default connect(mapStateToProps, null)(App);