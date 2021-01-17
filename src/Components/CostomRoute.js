import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'


function CostomRoute({ isAuthenticated, type = 'public', path, exact, component: Component }) {
    if(type === 'private'){
        return (
            <Route path={path} exact={exact} render={(props) => {
                return (
                    isAuthenticated ?
                    <Component {...props} /> :
                    <Redirect to='/login'/>
                )
            }} />
        )
    }
    else{
        return (
            <Route path={path} exact={exact} render={(props) => {
                return (
                    !isAuthenticated ?
                    <Component {...props} /> :
                    <Redirect to='/'/>
                )
            }} />
        )
    }
  
}


const mapDispatchToProps = (state) => {
    return {
        isAuthenticated: state.authReducer.isAuthenticated
    }
};

CostomRoute.propTypes = {
    type:PropTypes.oneOf(['public','private']),
    path:PropTypes.string.isRequired,
    exact:PropTypes.bool,
    component:PropTypes.object.isRequired
};

export default connect(mapDispatchToProps)(CostomRoute)