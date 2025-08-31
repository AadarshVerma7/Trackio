import { useForm } from "react-hook-form";

function Login({ close }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  return (
    <div className="bg-white/1 backdrop-blur-lg border border-orange-500 rounded-lg shadow-lg w-80 px-6 py-8 flex flex-col gap-4 font-sans relative">
      <button
        onClick={close}
        className="absolute top-3 right-3 text-orange-500 hover:text-orange-700 text-3xl font-bold"
        aria-label="Close"
      >
        &times;
      </button>

      <h2 className="text-2xl font-semibold mb-2 text-center text-white">
        Login
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          className={`border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 ${
            errors.username ? "border-red-500" : "border-orange-500"
          } bg-transparent text-white placeholder-white`}
          {...register("username", { required: "Username is required" })}
        />
        {errors.username && (
          <p className="text-red-500 text-sm">{errors.username.message}</p>
        )}

        <input
          type="password"
          placeholder="Password"
          className={`border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 ${
            errors.password ? "border-red-500" : "border-orange-500"
          } bg-transparent text-white placeholder-white`}
          {...register("password", { required: "Password is required" })}
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-orange-500 text-white rounded-md py-2 hover:bg-orange-600 transition disabled:opacity-50 font-bold"
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;
