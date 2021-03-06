import React, {useEffect} from 'react';
import Router, {useRouter} from 'next/router';
import {useSelector} from 'react-redux';
import Loader from '../../core/Loader';
import {AppState} from '../../../redux/store';

const withData = (ComposedComponent: any) => (props: any) => {
  const {user, loading} = useSelector<AppState, AppState['auth']>(({auth}) => auth);
  const {asPath} = useRouter();
  const queryParams = asPath.split('?')[1];
  useEffect(() => {
    if (!user && !loading) {
      Router.push('/signin' + (queryParams ? '?' + queryParams : ''));
    }
  }, [user, loading]);
  if (!user || loading) return <Loader/>;

  return <ComposedComponent {...props} />;
};

export default withData;
