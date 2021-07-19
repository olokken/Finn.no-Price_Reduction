import React, { useState, useEffect } from 'react';
import { Redirect, Route, RouteProps } from 'react-router';
import { useMutation } from '@apollo/client';
import { IS_VERIFIED } from './graphQL/Mutations';

interface PublicRouteProps extends RouteProps {
  component: any;
}

const PrivateRoute: React.FC<PublicRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const [authenticated, setAuthenticated] = useState<boolean>();
  const [isVerified] = useMutation(IS_VERIFIED);

  useEffect(() => {
    (async () => {
      console.log('shes');
      try {
        const data = await isVerified();
        if (data.data.isVerified) {
          setAuthenticated(true);
        }
      } catch (err) {
        setAuthenticated(false);
        console.log(err);
      }
    })();
  }, []);

  /*useEffect(() => {
    console.log(loading);
  }, [loading]);*/

  if (authenticated != undefined) {
    return (
      <Route
        {...rest}
        render={(props) =>
          authenticated ? <Component {...props} /> : <Redirect to="/" />
        }
      />
    );
  } else {
    return <div>Loading</div>;
  }
};

export default PrivateRoute;
