import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col  justify-center items-center gap-3 py-[14vh] text-3xl">
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <Link
        to={"/"}
        className=" text-4xl font-bold bg-white px-4 py-2 rounded-2xl text-[#4e738e]"
      >
        Go To Home
      </Link>
    </div>
  );
};

export default NotFound;
