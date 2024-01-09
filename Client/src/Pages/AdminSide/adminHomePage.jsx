import { useState, useEffect } from "react";
import { useGetUserDetailsMutation } from "../../Slices/adminApiSlice";
import fileDownload from "js-file-download";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useAdminLogoutMutation } from "../../Slices/adminAuthenticationApiSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { adminLogout } from "../../Slices/authenticationSlice";

const AdminHomePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [userDetails, setUserDetails] = useState([]);
  const { adminInfo } = useSelector((state) => state.authentication);
  const [searchQuery, setSearchQuery] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDownload = (url, filename) => {
    axios.get(url, { responseType: "blob" }).then((res) => {
      fileDownload(res.data, filename);
    });
  };

  const [getUserDetails] = useGetUserDetailsMutation();
  const [adminLogoutApiCall] = useAdminLogoutMutation();

  const fetchData = async () => {
    try {
      const userDetail = await getUserDetails().unwrap();
      if (userDetail.userDetails) {
        let filteredUsers = userDetail.userDetails;

        if (searchQuery) {
          const lowercaseSearchQuery = searchQuery.toLowerCase();
          filteredUsers = filteredUsers.filter(
            (user) =>
              user.userName.toLowerCase().includes(lowercaseSearchQuery) ||
              user.userEmail.toLowerCase().includes(lowercaseSearchQuery)
          );
        }

        setUserDetails(filteredUsers);
      } else {
        console.error("Error fetching data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [getUserDetails, searchQuery]);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = userDetails.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const logoutHandler = async () => {
    try {
      if (adminInfo) {
        await adminLogoutApiCall().unwrap();
        dispatch(adminLogout());
        toast.success("Logout Successful");
        navigate("/admin_login");
      }
    } catch (error) {
      toast.error(error.data.message);
      console.log(error);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => logoutHandler()}
        className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 rounded m-4"
      >
        Admin Logout
      </button>

      <div className="container mx-auto p-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Admin DashBoard</h1>

        <label htmlFor="searchInput">Search Users</label>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none"
          placeholder="Search Users"
          id="searchInput"
        />

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">UserName</th>
                <th className="py-2 px-4 border-b">UserEmail</th>
                <th className="py-2 px-4 border-b">UserMobileNumber</th>
                <th className="py-2 px-4 border-b">IsUserVerified</th>
                <th className="py-2 px-4 border-b">ProfileImage</th>
                <th className="py-2 px-4 border-b sm:flex sm:gap-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user) => (
                <tr key={user.id}>
                  <td className="py-2 px-4 border-b">{user.userName}</td>
                  <td className="py-2 px-4 border-b">{user.userEmail}</td>
                  <td className="py-2 px-4 border-b">
                    {user.userMobileNumber}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {user.isVerified ? "Yes" : "No"}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <img
                      src={user.profileImage}
                      alt="Profile"
                      className="w-8 h-8 rounded-full mx-auto"
                    />
                  </td>
                  <td className="py-2 px-4 border-b sm:flex sm:gap-3">
                    <button
                      onClick={() => {
                        handleDownload(
                          `${user.profileImage}`,
                          `${user.userName}.jpg`
                        );
                      }}
                      className="bg-blue-500 text-white px-2 py-1 rounded"
                    >
                      Download Img
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4">
          <ul className="flex justify-center">
            {Array.from(
              { length: Math.ceil(userDetails.length / usersPerPage) },
              (_, i) => (
                <li
                  key={i}
                  className={`px-2 py-1 mx-1 cursor-pointer ${
                    currentPage === i + 1
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200"
                  }`}
                  onClick={() => paginate(i + 1)}
                >
                  {i + 1}
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminHomePage;
