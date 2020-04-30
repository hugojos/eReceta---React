import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'


const PrivateRoute = ({ children, ...rest }) => {
    const isAuth = useSelector(state => state.auth.user)
    return (
    <Route
      {...rest}
      render={({ location }) =>
        Object.keys(isAuth).length > 0 ? (
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