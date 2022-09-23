
import React from 'react';
import {useSearchParams} from 'react-router-dom';
 
const withRouter = WrappedComponent => props => {
  const [params] = useSearchParams();
 
  return (
    <WrappedComponent
      {...props}
      params={params}
    />
  );
};
 
export default withRouter;