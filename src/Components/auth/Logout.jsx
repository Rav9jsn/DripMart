import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { clearCartData } from "../../state/storage";
import { useDispatch } from "react-redux";

const Logout = ({ setClickProfile, clickProfile }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const Logout = () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("name");
      localStorage.removeItem("adressHave");
      localStorage.removeItem("address");
      localStorage.removeItem("role");
      localStorage.removeItem("email");
      dispatch(clearCartData());
      navigate("/login", 500);
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <div
      onMouseLeave={() => setClickProfile(!clickProfile)}
      className="absolute z-30 right-4 top-16 bg-white rounded-xl shadow-lg p-4 w-40"
    >
      <ul className="flex flex-col gap-2 text-gray-800 font-medium">
        <li>
          <Link
            to="/userhomepage"
            className="block px-3 py-2 rounded hover:bg-gray-100 transition"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/orders"
            className="block px-3 py-2 rounded hover:bg-gray-100 transition"
          >
            Orders
          </Link>
        </li>
        <li>
          <Link
            to="/favouritlist"
            className="block px-3 py-2 rounded hover:bg-gray-100 transition"
          >
            Favourite List
          </Link>
        </li>
        <li>
          <button
            onClick={Logout}
            className="w-full text-left px-3 py-2 rounded hover:bg-red-100 text-red-600 transition"
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Logout;
