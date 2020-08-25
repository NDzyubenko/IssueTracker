import { connect } from 'react-redux';

import { Login } from './login.jsx';
import { loginUser } from '../../actions';

const mapDispatchToProps = {
  loginUser,
};

export const LoginContainer = connect(
  null,
  mapDispatchToProps,
)(Login);
