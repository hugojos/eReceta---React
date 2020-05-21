import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'


const GuestRoute = ({ children, ...rest }) => {
    const isAuth = useSelector(state => Object.keys(state.auth.user).length > 0)
    const Component = rest.component;
    delete rest.component
    return (
    <Route
      {...rest}
      render={({ location }) =>
        !isAuth ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: "/nueva-receta",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

export default GuestRoute