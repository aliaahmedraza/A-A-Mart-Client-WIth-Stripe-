import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useParams } from "react-router-dom";

const UpdatePasswordSchema = Yup.object().shape({
  email: Yup.string(),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      "Password must include uppercase, lowercase, number, and special character"
    )
    .required("Password is required"),
});

const UpdatePasswordPage = () => {
  const { token } = useParams();
  const initialValues = {
    password: "",
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await axios.put(
        `http://localhost:3002/updatepassword/${token}`,
        {
          password: values.password,
        }
      );
      alert(response.data.message || "Password is Update.");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Failed to Update Password. Please try again.";
      alert(errorMessage);
    } finally {
      setSubmitting(false);
      resetForm();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Update Password</h2>

        <Formik
          initialValues={initialValues}
          validationSchema={UpdatePasswordSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700 mb-2">
                  Password
                </label>
                <Field
                  type="password"
                  name="password"
                  className={`w-full p-2 border rounded-md ${
                    errors.password && touched.password
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  placeholder="Create a strong password"
                />
                {errors.password && touched.password && (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.password}
                  </div>
                )}
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Enter and create a strong password then we'll update your
                Password.
              </p>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-500 text-white py-2 rounded-md 
                  hover:bg-blue-600 transition duration-300 
                  disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Password Updating..." : "Password Update"}
              </button>
            </Form>
          )}
        </Formik>
        <div className="text-center mt-4">
          <a
            href="/login"
            className="text-blue-500 text-sm mr-4 hover:underline"
          >
            Back to Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default UpdatePasswordPage;
