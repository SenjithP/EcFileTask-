import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useUserLogoutMutation } from "../../Slices/userAuthenticationApiSlice.js";
import { useNavigate } from "react-router-dom";
import { userLogout } from "../../Slices/authenticationSlice.js";
import { useViewUsersMutation } from "../../Slices/usersApiSlice.js";

const UserHomePage = () => {
  const { userInfo } = useSelector((state) => state.authentication);
  console.log(userInfo)
  const [viewUsers] = useViewUsersMutation();
  const [userLogoutApiCall] = useUserLogoutMutation();
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      if (userInfo) {   
        await userLogoutApiCall().unwrap();
        dispatch(userLogout());
        toast.success("Logout Successful");
        navigate("/userLogin");
      }
    } catch (error) {
      toast.error(error.data.message);
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await viewUsers({ id: userInfo.id });
        console.log(result)
        if (result.data) {
          setUsers(result.data.userDetails);
        }
      } catch (error) {
        console.error("Error fetching userData:", error);
      }
    };

    fetchData();
  }, [viewUsers]);
console.log(users)
  return (
    <>
      <section className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="flex flex-col items-center justify-center bg-white p-8 rounded-lg shadow-lg w-96 space-y-6">
          <h1 className="text-4xl font-bold mb-6 text-gray-800">
            User Profile
          </h1>

          <img
            className="rounded-full w-32 h-32 mb-4 border-4 border-blue-500"
            src={users.profileImage}
            alt="Profile"
          />

          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-2 text-gray-800">
              {users.userName}
            </h2>
            <p className="text-gray-600 mb-2">{users.userEmail}</p>
            <p className="text-gray-600 mb-4">{users.userMobileNumber}</p>
          </div>

          <button
            onClick={logoutHandler}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Log Out
          </button>
        </div>
      </section>
    </>
  );
};

export default UserHomePage;
