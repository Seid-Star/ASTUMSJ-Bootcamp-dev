import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();
  const password = watch("password");
  const onSubmit = async (data) => {
    setServerError("");
    try {
      await signup(data);
      navigate("/dashboard");
    } catch (err) {
      if (
        err.response?.status === 400 &&
        err.response?.data?.message?.toLowerCase().includes("email")
      ) {
        setError("email", {
          type: "server",
          message: err.response.data.message,
        });
      } else {
        setServerError(
          err.response?.data?.message || "Signup failed. Please try again.",
        );
      }
    }
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-8">
      <div className="w-full max-w-lg rounded-xl bg-white p-8 shadow-lg">
        <h1 className="mb-2 text-3xl font-bold">Create Account</h1>

        <p className="mb-6 text-gray-500">
          Create your management system account
        </p>
        {serverError && (
          <div className="mb-4 rounded-lg bg-red-100 p-3 text-sm text-red-600">
            {serverError}
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              {...register("fullName", {
                required: "Full name is required",
              })}
            />
            {errors.fullName && (
              <p className="mt-1 text-sm text-red-500">
                {errors.fullName.message}
              </p>
            )}
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email address",
                },
              })}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Password</label>
            <input
              type="password"
              placeholder="Minimum 8 characters"
              className="w-full rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Confirm your password"
              className="w-full rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Division</label>
            <select
              className="w-full rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              {...register("division", {
                required: "Division is required",
              })}
            >
              <option value="">Select division</option>
              <option value="Development">Development</option>
              <option value="Cyber">Cyber</option>
              <option value="AI">AI</option>
              <option value="Networking">Networking</option>
            </select>
            {errors.division && (
              <p className="mt-1 text-sm text-red-500">
                {errors.division.message}
              </p>
            )}
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Year</label>
            <select
              className="w-full rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              {...register("year", {
                required: "Year is required",
              })}
            >
              <option value="">Select year</option>
              <option value="1st">1st</option>
              <option value="2nd">2nd</option>
              <option value="3rd">3rd</option>
              <option value="4th">4th</option>
              <option value="5th">5th</option>
            </select>
            {errors.year && (
              <p className="mt-1 text-sm text-red-500">{errors.year.message}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-blue-600 py-3 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {isSubmitting ? "Creating account..." : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
};
export default Signup;
