import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'


const PrivateRoute = ({ ...rest }) => {
    const isAuth = useSelector((state: any) => Object.keys(state.auth.user).length > 0)
    const Component = rest.component
    delete rest.component
    return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuth  ? (
          <Component />
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