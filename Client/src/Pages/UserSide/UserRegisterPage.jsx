import UserRegistrationComponent from "../../Components/UserSide/UserRegistrationComponent";
import Registation_Cover_Image from "../../assets/Images/Registation_Cover_Image.jpg"
const UserRegisterPage = () => {
  return (
    <>
      <section className="px-5 xl:px-0">
        <div className="max-w-[1170px] mx-auto">
          <div className="rounded-lg m-10 md:p-10 md:shadow-md grid grid-cols-1 lg:grid-cols-2">
            <div className="lg:pt-[30px]  lg:block rounded-l-lg">
              <figure className="rounded-l-lg">
                <img
                  src={Registation_Cover_Image}
                  alt="Registration"
                  className="rounded-lg w-full"
                />
              </figure>
            </div>
            <UserRegistrationComponent />
          </div>
        </div>
      </section>
    </>
  );
};

export default UserRegisterPage;
