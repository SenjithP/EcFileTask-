import { useState } from "react";
import { Link } from "react-router-dom";
import { useUserRegistrationMutation } from "../../Slices/userAuthenticationApiSlice";
import { toast } from "react-toastify";
import { IoMdClose } from "react-icons/io";
import { RotatingLines } from "react-loader-spinner";

const UserRegistrationComponent = () => {
  const [formData, setFormData] = useState({
    userName: "",
    userEmail: "",
    userPassword: "",
    userMobileNumber: null,
  });

  const [userRegistration] = useUserRegistrationMutation();
  const [selectedProfileImage, setSelectedProfileImage] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const allowedExtensions = ["jpg", "jpeg", "png"];

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const extension = file.name.split(".").pop().toLowerCase();
      if (!allowedExtensions.includes(extension)) {
        toast.error(
          "Invalid file format. Please choose a .jpg, .jpeg, or .png file."
        );
        return;
      }
    }
    setSelectedProfileImage(file);

    const setFileToBase2 = (file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
    };

    setFileToBase2(file);
  };

  const closeProfileButtonHandler = () => {
    setSelectedProfileImage(null);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const { userName, userEmail, userPassword, userMobileNumber } = formData;
    try {
      const response = await userRegistration({
        userName,
        userEmail,
        userPassword,
        userMobileNumber,
        profileImage,
      }).unwrap();
      if (response) {
        toast.success(response.message);
      }
      setFormData({
        userName: "",
        userEmail: "",
        userPassword: "",
        userMobileNumber: "",
      });
      setSelectedProfileImage(null);
      setProfileImage(null);
    } catch (error) {
      if (error.data && error.data.error) {
        toast.error(error.data.error);
      } else {
        toast.error("An error occurred", error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="rounded-l-lg py-5 text-center lg:pl-16">
        <h3 className="text-black text-[24px] leading-9 font-bold mb-1">
          Create Your <span className="text-orange-700">Account</span>
        </h3>

        <form onSubmit={submitHandler}>
          <div>
            <input
              type="text"
              placeholder="Enter Your Name"
              name="userName"
              value={formData.userName}
              onChange={handleInputChange}
              className="my-2 w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-buttonColor text-[16px] leading-7 text-black placeholder:text-gray rounded-md cursor-pointer mb-3 md:mb-0"
              required
            />
          </div>
          <div>
            <input
              type="email"
              value={formData.userEmail}
              onChange={handleInputChange}
              placeholder="Enter Your Email"
              name="userEmail"
              className="my-2 w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-buttonColor text-[16px] leading-7 text-black placeholder:text-gray rounded-md cursor-pointer mb-3 md:mb-0"
              required
            />
          </div>
          <div>
            <input
              type="number"
              value={formData.userMobileNumber}
              onChange={handleInputChange}
              placeholder="Enter Your Mobile Number"
              name="userMobileNumber"
              className="my-2 w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-buttonColor text-[16px] leading-7 text-black placeholder:text-gray rounded-md cursor-pointer mb-3 md:mb-0"
              required
            />
          </div>
          <div>
            <input
              type="password"
              value={formData.userPassword}
              onChange={handleInputChange}
              placeholder="Enter Your Password"
              name="userPassword"
              className="my-2 w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-buttonColor text-[16px] leading-7 text-black placeholder:text-gray rounded-md cursor-pointer mb-3 md:mb-0"
              required
            />
          </div>
          <div className=" text-center mt-8 ">
            <label
              className=" cursor-pointer"
              id="custom-label"
              htmlFor="profileInput"
            >
              Click to Upload Profile Image
            </label>
            <input
              hidden
              type="file"
              id="profileInput"
              required
              onChange={handleProfileImageChange}
            />
          </div>

          {selectedProfileImage && (
            <div className=" flex gap-5 justify-center items-center">
              <IoMdClose onClick={closeProfileButtonHandler} />
              <div className=" flex gap-2 justify-center items-center">
                <p>Selected Image:</p>
                <img
                  src={URL.createObjectURL(selectedProfileImage)}
                  alt="Profile Preview"
                  className=" w-[100px] "
                />
              </div>
            </div>
          )}
          {isLoading ? (
            <div className="flex justify-center items-center">
              <RotatingLines
                visible={true}
                height="96"
                width="96"
                color="grey"
                strokeWidth="5"
                animationDuration="0.75"
                ariaLabel="rotating-lines-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            </div>
          ) : (
            <div className="flex justify-center items-center">
              <button
                onClick={submitHandler}
                className="w-full mt-5 bg-orange-700 hover:bg-orange-600 text-white text-lg leading-7 rounded-lg px-4 py-3"
                type="button"
              >
                Submit
              </button>
            </div>
          )}
        </form>
        <p className="mt-5 text-black text-center">
          Already have an account?{" "}
          <Link className="text-blue-500 font-medium ml-1" to={"/userLogin"}>
            Login
          </Link>
        </p>
      </div>
    </>
  );
};

export default UserRegistrationComponent;
