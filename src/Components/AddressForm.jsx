import { useState } from "react";
import loactionSvg from "../assets/location-pointer.svg";
import { sendAddToServer } from "../serviced";
import { useNavigate } from "react-router-dom";

const AddressForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [exactLoaction, setExactLoaction] = useState(null);

  const getLocation = () => {
    if ("geolocation" in navigator) {
      // Geolocation is available
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          const accuracy = position.coords.accuracy;

          setExactLoaction({ latitude, longitude, accuracy });

        },
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              alert("For Delivery  Come to Your Home Door allow location");
              console.error("Location deined.");
              break;
            case error.POSITION_UNAVAILABLE:
              console.error("Location information is unavailable.");
              break;
            case error.TIMEOUT:
              console.error("The request to get user location timed out.");
              break;
            case error.UNKNOWN_ERROR:
              console.error("An unknown error occurred.");
              break;
          }
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    } else {
      console.error("Geolocation is not supported by your browser.");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, exactLoaction, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e, data) => {
    data = form;
    e.preventDefault();
    const res = await sendAddToServer(data);
    if (res.success)
    localStorage.setItem('address', JSON.stringify(res.address))
    localStorage.setItem('adressHave',true)
      setTimeout(() => {
        setForm({ phone: "", address: "", city: "", state: "", pincode: "" }),
          navigate("/cart");
      }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg p-6 bg-white rounded-2xl shadow-2xl space-y-5"
      >
        <h2 className="text-xl font-semibold text-gray-800">
          Shipping Address
        </h2>
        <button
          onClick={() => getLocation()}
          className="px-4 py-2 rounded bg-indigo-500 font-semibold cursor-pointer text-white hover:bg-blue-700 flex items-center"
        >
          <img src={loactionSvg} alt="Location icon" className="w-5 h-5 mr-2" />
          Location
        </button>
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />

        <textarea
          name="address"
          placeholder="Address (Street, Area, etc.)"
          value={form.address}
          onChange={handleChange}
          rows={3}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        ></textarea>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={form.state}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <input
          type="text"
          name="pincode"
          placeholder="Pincode"
          value={form.pincode}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />

        <button
          type="submit"
          className="w-full cursor-pointer bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-200"
        >
          Save Address
        </button>
      </form>
    </div>
  );
};

export default AddressForm;
