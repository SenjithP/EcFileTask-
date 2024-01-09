import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import UserLoginForm from "../../Components/UserSide/UserLoginComponent";
import Login_Cover_Image from "../../assets/Images/Login_Cover_Image.jpg"
import { useVerifyEmailMutation } from "../../Slices/userAuthenticationApiSlice";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const UserLoginPage = () => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.authentication);
  const [verifyEmail] = useVerifyEmailMutation();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");

  useEffect(() => {
    let isMounted = true;
    const makeBackendCall = async () => {
      try {
        if (
          location.pathname.endsWith("/userLogin") &&
          location.search.includes("id=")
        ) {
          const response = await verifyEmail({
            id: id,
          }).unwrap();
          if (isMounted) {
            if (response) {
              toast.success(response.message);
              navigate("/userLogin");
            } else {
              toast.error(response.error.error);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    if (userInfo) {
      navigate("/userHome");
    }
    makeBackendCall();
    return () => {
      isMounted = false;
    };
  }, [verifyEmail, id, location.search, location.pathname, navigate, userInfo]);

  return (
    <>
      <section className="px-5 xl:px-0">
        <div className="max-w-[1170px] mx-auto ">
          <div className="rounded-lg m-10 md:p-10 md:shadow-md grid grid-cols-1 lg:grid-cols-2 ">
            <div className="  lg:block rounded-l-lg">
              <figure className="rounded-l-lg">
                <img
                  src={Login_Cover_Image}
                  alt="register"
                  className="rounded-lg  w-full"
                />
              </figure>
            </div>

            <div className="rounded-l-lg py-5 text-center lg:pl-16">
              <h3 className="text-black text-[24px] leading-9 font-bold mb-1">
                Login <span className="text-orange-700">Now</span>
              </h3>

              <UserLoginForm />

              <p className="mt-5 text-black text-center">
                Don't have an account?{" "}
                <Link
                  className="text-blue-500 font-medium ml-1"
                  to={"/userRegistration"}
                >
                  Register
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default UserLoginPage;
