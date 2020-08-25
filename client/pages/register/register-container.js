import { connect } from 'react-redux';

import { Register } from './register.jsx';
import { registerUser } from '../../actions';

const mapDispatchToProps = {
  registerUser,
};

export const RegisterContainer = connect(
  null,
  mapDispatchToProps,
)(Register);
