import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext.jsx";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";

function Signup({ close2 }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const { backendUrl, setIsLoggedIn, setUserData } = useContext(AppContext);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(`${backendUrl}/api/auth/register`, {
        name: data.username,
        email: data.userEmail,
        password: data.password,
      });

      if (res.data.success) {
        toast.success("Signup successful!");
        setIsLoggedIn(true);
        setUserData(res.data.user);
        close2();
        navigate("/home");
      } else {
        toast.error(res.data.message || "Signup failed");
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || "Signup failed");
      } else {
        toast.error("Network error. Please try again.");
      }
    }
  };

  return (
    <div className="bg-white/1 backdrop-blur-lg border border-orange-500 rounded-lg shadow-lg w-80 px-6 py-8 flex flex-col gap-4 font-sans relative">
      <button
        onClick={close2}
        className="absolute top-3 right-3 text-orange-500 hover:text-orange-700 text-3xl font-bold"
        aria-label="Close"
      >
        &times;
      </button>

      <h2 className="text-3xl font-semibold mb-2 text-center text-white">
        Sign Up
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="User-Email"
          className={`border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-transparent text-white placeholder-white ${
            errors.userEmail ? "border-red-500" : "border-orange-500"
          }`}
          {...register("userEmail", { required: "Email is required" })}
        />
        {errors.userEmail && (
          <p className="text-red-500 text-sm">{errors.userEmail.message}</p>
        )}

        <input
          type="text"
          placeholder="Username"
          className={`border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-transparent text-white placeholder-white ${
            errors.username ? "border-red-500" : "border-orange-500"
          }`}
          {...register("username", { required: "Username is required" })}
        />
        {errors.username && (
          <p className="text-red-500 text-sm">{errors.username.message}</p>
        )}

        <input
          type="password"
          placeholder="Password"
          className={`border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-transparent text-white placeholder-white ${
            errors.password ? "border-red-500" : "border-orange-500"
          }`}
          {...register("password", { required: "Password is required" })}
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-orange-500 text-white rounded-md py-2 hover:bg-orange-600 transition disabled:opacity-50"
        >
          {isSubmitting ? "Signing in..." : "Sign Up"}
        </button>

        {/* Forgot Password Link */}
        <div className="text-center text-sm mt-2 underline">
          <Link
            to="/forgot-password"
            className="text-orange-400 hover:text-orange-500"
          >
            Forgot Password?
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Signup;
