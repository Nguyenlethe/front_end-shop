
import React from 'react';
import {useSearchParams,useNavigate } from 'react-router-dom';
 
const withRouter = WrappedComponent => props => {
  const [params] = useSearchParams();
  let navigate = useNavigate();
 
  return (
    <WrappedComponent
      {...props}
      params={params}
      navigate={navigate}
    />
  );
};
 
export default withRouter;