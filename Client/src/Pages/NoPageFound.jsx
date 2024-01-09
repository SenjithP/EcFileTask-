import noPageFound from "../assets/Images/noPageFound.jpg";
const NoPageFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
        <img src={noPageFound} alt="No Such Page Found" className="max-w-full max-h-full" />
    </div>
  );
};

export default NoPageFound;
