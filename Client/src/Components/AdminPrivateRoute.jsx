import { Navigate } from "react-router-dom";
import {useSelector} from 'react-redux'
import PropTypes from 'prop-types';

function AdminPrivateRoute({ children }) {

  const { adminInfo } = useSelector( (state) => state.authentication );
  return adminInfo ? <>{children}</> : <Navigate to="/adminLogin" />;
}   
AdminPrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
export default AdminPrivateRoute;