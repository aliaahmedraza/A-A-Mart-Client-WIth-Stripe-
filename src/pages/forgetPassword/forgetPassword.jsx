import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

const ForgotPasswordPage = () => {
  const initialValues = {
    email: "",
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await axios.post("http://localhost:3002/forgetpassword", {
        recipient: values.email,
      });
      alert(response.data.message || "Email sent successfully.");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Failed to send email. Please try again.";
      alert(errorMessage);
    } finally {
      setSubmitting(false);
      resetForm();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Forgot Password</h2>

        <Formik
          initialValues={initialValues}
          validationSchema={ForgotPasswordSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 mb-2">
                  Email Address
                </label>
                <Field
                  type="email"
                  name="email"
                  className={`w-full p-2 border rounded-md ${
                    errors.email && touched.email
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  placeholder="Enter your registered email"
                />
                {errors.email && touched.email && (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.email}
                  </div>
                )}
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Enter the email address associated with your account. We'll send
                you your account details.
              </p>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-500 text-white py-2 rounded-md 
                  hover:bg-blue-600 transition duration-300 
                  disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending Email..." : "Send Email"}
              </button>
            </Form>
          )}
        </Formik>
        <div className="text-center mt-4">
          <a
            href="/"
            className="text-blue-500 text-sm mr-4 hover:underline"
          >
            Back to Login
          </a>
          <a href="/signup" className="text-blue-500 text-sm hover:underline">
            Create New Account
          </a>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
