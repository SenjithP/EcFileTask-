import { useEffect } from "react";
import {useNavigate } from "react-router-dom";
import AdminLoginForm from "../../Components/AdminSide/AdminLoginComponent";
import Login_Cover_Image from "../../assets/Images/Login_Cover_Image.jpg";
import { useSelector } from "react-redux";

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const { adminInfo } = useSelector((state) => state.authentication);

  useEffect(() => {
    if (adminInfo) {
      navigate("/adminHome");
    }
  }, [adminInfo]);

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
                Login <span className="text-orange-700">Now</span> (ADMIN SIDE)
              </h3>

              <AdminLoginForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminLoginPage;
