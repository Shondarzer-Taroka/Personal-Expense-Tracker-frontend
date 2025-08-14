import React, { useState } from "react";
import toast from "react-hot-toast";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    photo: ""
  });
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    toast.loading("Uploading photo...", { id: "upload" });

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "YOUR_UPLOAD_PRESET"); // from Cloudinary
    data.append("cloud_name", "YOUR_CLOUD_NAME"); // from Cloudinary

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
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full mt-1 border px-3 py-2 rounded-md focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full mt-1 border px-3 py-2 rounded-md focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Photo Upload */}
        <div>
          <label className="block text-sm font-medium">Photo</label>
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className="w-full mt-1"
          />
          {form.photo && (
            <img
              src={form.photo}
              alt="Uploaded"
              className="mt-2 h-20 w-20 object-cover rounded-full"
            />
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={uploading}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:bg-gray-400"
        >
          {uploading ? "Uploading..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;
