import { useState } from "react";
import { userLogin } from "../../serviced";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ setRole }) => {
  const [result, setresult] = useState(null);
const navigate = useNavigate()
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    if (name in user) {
      setUser((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  const submitHandler = async (e) => {
    
    e.preventDefault();
    try {
      const result = await userLogin(user);
      const {
        success,
        token,
        name,
        message,
        role,
        address,
        adressHave,
        email,
      } = result;
      const [Adress] = address || [];
      setresult(`${role} ${message}`);
      if (success) {
        localStorage.setItem("role", role);
        setRole(role);
        localStorage.setItem("token", token);
        localStorage.setItem("name", name);
        localStorage.setItem("email", email);

        if (localStorage.getItem("token")) {
          if (role === "user") {
            localStorage.setItem("adressHave", adressHave);
            adressHave &&
              localStorage.setItem("address", JSON.stringify(Adress));
            setTimeout(() => {
              setUser({
                email: "",
                password: "",
              });
              navigate("/userhomepage");
            }, 500);
          } else {
            setTimeout(() => {
              setUser({
                email: "",
                password: "",
              });
              navigate("/adminhome")
            }, 50);
          }
        }
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen ">
        {result && (
          <p className="bg-blue-100 fixed top-3 text-blue-800 px-4 py-2 rounded-md shadow-md text-center mb-4 animate-fade-in">
            {result}
          </p>
        )}
        <form
          onSubmit={submitHandler}
          className=" p-6  shadow-lg rounded-2xl w-full max-w-sm"
        >
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            required
            autoComplete="username"
            onChange={onChangeInput}
            value={user.email}
            className=" border-gray-300 w-[100%] px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <label className="block my-4 text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            name="password"
            autoComplete="current-password"
            onChange={onChangeInput}
            required
            value={user.password}
            className=" border-gray-300 w-[100%] px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <button
            type="submit"
            className="w-full bg-indigo-500 mt-7 text-white py-2 rounded-md hover:bg-indigo-600 transition"
          >
            Login
          </button>
          <span className="block text-center mt-6 text-sm text-gray-700">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="inline-block text-blue-600 hover:text-white border border-blue-600 px-4 py-1.5 rounded-full hover:bg-blue-600 transition-all duration-300 font-medium"
            >
              Create Account
            </Link>
          </span>
        </form>
      </div>
    </>
  );
};

export default Login;
