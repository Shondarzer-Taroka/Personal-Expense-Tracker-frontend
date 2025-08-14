'use client'
import React, { useState } from "react";
import toast from "react-hot-toast";
import Head from "next/head";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    photo: ""
  });
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Create preview
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);

    setUploading(true);
    toast.loading("Uploading photo...", { id: "upload" });

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "YOUR_UPLOAD_PRESET");
    data.append("cloud_name", "YOUR_CLOUD_NAME");

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload`,
        { method: "POST", body: data }
      );
      const cloudData = await res.json();

      if (cloudData.secure_url) {
        setForm({ ...form, photo: cloudData.secure_url });
        toast.success("Photo uploaded successfully!", { id: "upload" });
      } else {
        throw new Error("Upload failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to upload photo", { id: "upload" });
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.photo) {
      return toast.error("Please fill all fields & upload photo");
    }

    // Example submit (replace with API call)
    console.log("Form Data:", form);
    toast.success("Registration successful!");
    // Reset form
    setForm({ name: "", email: "", photo: "" });
    setPreview("");
  };

  return (
    <>
      <Head>
        <title>Register | Your App</title>
      </Head>
      
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 relative overflow-hidden">
        {/* Animated SVG Background */}
        <div className="absolute inset-0 overflow-hidden z-0">
          <svg
            className="absolute w-full h-full opacity-10"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
          >
            <path
              fill="#3b82f6"
              fillOpacity="0.5"
              d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            >
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="translate"
                from="0 0"
                to="0 -100"
                dur="15s"
                repeatCount="indefinite"
              />
            </path>
            <path
              fill="#6366f1"
              fillOpacity="0.3"
              d="M0,128L48,154.7C96,181,192,235,288,234.7C384,235,480,181,576,181.3C672,181,768,235,864,250.7C960,267,1056,245,1152,213.3C1248,181,1344,139,1392,117.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            >
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="translate"
                from="0 0"
                to="0 -150"
                dur="20s"
                repeatCount="indefinite"
              />
            </path>
          </svg>
        </div>

        <div className="w-full max-w-md z-10">
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 transition-all hover:shadow-2xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800">Create Account</h2>
              <p className="text-gray-500 mt-2">Join our community today</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      placeholder="John Doe"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg
                        className={`${ form.name && 'hidden'} h-5 w-5 text-gray-400`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      placeholder="your@email.com"
                    />
                    <div className=" absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg
                        className={`h-5 w-5 text-gray-400 ${form.email && 'hidden'}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Photo Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Profile Photo
                  </label>
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      {(preview || form.photo) && (
                        <img
                          src={preview || form.photo}
                          alt="Preview"
                          className="h-16 w-16 rounded-full object-cover border-2 border-white shadow"
                        />
                      )}
                      {!preview && !form.photo && (
                        <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center">
                          <svg
                            className="h-8 w-8 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                    <label className="flex-1">
                      <div className="px-4 py-2 bg-white rounded-lg border border-gray-300 hover:bg-gray-50 cursor-pointer transition-colors">
                        <span className="text-sm font-medium text-gray-700">
                          {preview || form.photo ? "Change Photo" : "Upload Photo"}
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoChange}
                          className="hidden"
                        />
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={uploading}
                className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all ${
                  uploading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-md"
                }`}
              >
                {uploading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  "Register Now"
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">
                  Sign in
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;