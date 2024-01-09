import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { setAdminCredentials } from "../../Slices/authenticationSlice";
import { useAdminLoginMutation } from "../../Slices/adminAuthenticationApiSlice";

const AdminLoginForm = () => {
  const [formData, setFormData] = useState({
    adminEmail: "",
    adminPassword: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [adminLogin] = useAdminLoginMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    const { adminEmail, adminPassword } = formData;
  
    try {
      const { message, ...filteredResponse } = await adminLogin({
        adminEmail,
        adminPassword,
      }).unwrap();
  
      dispatch(setAdminCredentials({ ...filteredResponse }));
  
      toast.success(message);
      navigate("/adminHome");
    } catch (error) {
      if (error.data && error.data.error) {
        toast.error(error.data.error);
      } else {
        toast.error("An error occurred");
      }
    }
  };
  

  return (
    <form onSubmit={submitHandler}>
      <div className="">
        <input
          type="email"
          placeholder="Enter Your email"
          name="adminEmail"
          value={formData.adminEmail}
          onChange={handleInputChange}
          className="my-2 w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-buttonColor text-[16px] leading-7 text-black placeholder:text-gray rounded-md cursor-pointer mb-3 md:mb-0"
        />
      </div>

      <div className="">
        <input
          type="password"
          placeholder="Enter Your Password"
          name="adminPassword"
          value={formData.adminPassword}
          onChange={handleInputChange}
          className="my-2 w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-buttonColor text-[16px] leading-7 text-black placeholder:text-gray rounded-md cursor-pointer mb-3 md:mb-0"
        />
      </div>

      <div className="mt-5">
        <button
          type="submit"
          className="w-full bg-orange-700 hover:bg-orange-600 text-white text-lg leading-7 rounded-lg px-4 py-3"
        >
          Login
        </button>
      </div>
    </form>
  );
};

export default AdminLoginForm;
