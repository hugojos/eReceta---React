import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'


const PrivateRoute = ({ children, ...rest }) => {
    const isAuth = useSelector(state => Object.keys(state.auth.user).length > 0)
    return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuth  ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/iniciar-sesion",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute