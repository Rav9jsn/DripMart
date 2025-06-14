import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    if (name in user) {
      setUser((prevUser) => ({
        ...prevUser,
        // This sets the dynamic key [] which mean name value changed
        [name]: value,
      }));
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (user.password === user.confirmPassword) {
      setTimeout(() => {
        setUser({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          role: "",
        });
      }, 500);
      console.log(user);
      navigate('/login')
      
    } else{
      alert("confirn Ppassword and password not same")
    }
  };
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-100">
      <form
        onSubmit={submitHandler}
        className="flex flex-col gap-4 p-8 bg-white shadow-lg rounded-2xl w-[90%] max-w-md border-4 border-amber-100"
      >
        <label className="text-gray-700 font-semibold">Name</label>
        <input
          type="text"
          name="name"
          required
          value={user.name}
          minLength="2"
          maxLength="50"
          onChange={handleInput}
          placeholder="User"
          className="border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <label className="text-gray-700 font-semibold">Email</label>
        <input
          type="email"
          required
          value={user.email}
          name="email"
          onChange={handleInput}
          autoComplete="username"
          placeholder="your@mail.com"
          className="border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <label className="text-gray-700 font-semibold">Password</label>
        <input
          type="password"
          required
          value={user.password}
          name="password"
          onChange={handleInput}
          autoComplete="new-password"
          className="border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <label className="text-gray-700 font-semibold">Confirm Password</label>
        <input
          type="password"
          value={user.confirmPassword}
          required
          name="confirmPassword"
          onChange={handleInput}
          autoComplete="new-password"
          className="border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <div className="flex gap-6 mt-2">
          <label className="flex items-center gap-2 text-gray-700 font-medium">
            <input
              type="radio"
              name="role"
              required
              onChange={handleInput}
              value="user"
              checked={user.role === "user"}
              className="accent-indigo-500"
            />{" "}
            User
          </label>
          <label className="flex items-center gap-2 text-gray-700 font-medium">
            <input
              type="radio"
              name="role"
              required
              checked={user.role === "admin"}
              value="admin"
              onChange={handleInput}
              className="accent-indigo-500"
            />{" "}
            Admin
          </label>
        </div>

        <button
          type="submit"
          className="mt-4 bg-indigo-500 text-white font-semibold py-2 px-6 rounded-lg hover:bg-indigo-600 transition duration-300 shadow-md"
        >
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
