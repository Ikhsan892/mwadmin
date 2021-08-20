import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

const ComponentsGuard = props => {
  const { children } = props;

  const {
    user: { role }
  } = useSelector(state => state.session);

  const [isGranted, setIsGranted] = useState(false);

  //   Set Allowed Author
  useEffect(() => {
    props.roles.includes(role) ? setIsGranted(false) : setIsGranted(true);
  }, [props.roles]);
  return <React.Fragment>{isGranted ? children : ''}</React.Fragment>;
};

ComponentsGuard.propTypes = {
  children: PropTypes.node,
  roles: PropTypes.array.isRequired
};

ComponentsGuard.defaultProps = {
  roles: []
};

export default ComponentsGuard;
