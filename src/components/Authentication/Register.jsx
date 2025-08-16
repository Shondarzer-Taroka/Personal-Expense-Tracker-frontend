'use client'
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    photo: ""
  });
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result);
    reader.readAsDataURL(file);

    setUploading(true);
    toast.loading("Uploading photo...", { id: "upload" });

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "my-uploads");
    data.append("cloud_name", "dw72swggv");

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/dw72swggv/image/upload`,
        { method: "POST", body: data }
      );
      const cloudData = await res.json();

      if (cloudData.secure_url) {
        setForm({ ...form, photo: cloudData.secure_url });
        toast.success("Photo uploaded successfully!", { id: "upload" });
      } else throw new Error("Upload failed");
    } catch (err) {
      console.error(err);
      toast.error("Failed to upload photo", { id: "upload" });
    } finally {
      setUploading(false);
    }
  };

  const removePhoto = () => {
    setForm({ ...form, photo: "" });
    setPreview("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      return toast.error("Please fill all required fields");
    }

    toast.loading("Registering user...", { id: "register" });

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Registration successful!", { id: "register" });
        setForm({ name: "", email: "", password: "", photo: "" });
        setPreview("");
        router.push('/login');
      } else {
        toast.error(data.message || "Registration failed", { id: "register" });
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error, please try again", { id: "register" });
    }
  };

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <Head>
        <title>Register | Your App</title>
        <meta name="description" content="Create a new account to get started" />
      </Head>

      <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
        {/* Animated SVG Background */}
        {/* <div className="absolute inset-0 overflow-hidden z-0">
          <svg className="absolute w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#3b82f6" fillOpacity="0.5" d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z">
              <animateTransform attributeName="transform" attributeType="XML" type="translate" from="0 0" to="0 -100" dur="15s" repeatCount="indefinite"/>
            </path>
            <path fill="#6366f1" fillOpacity="0.3" d="M0,128L48,154.7C96,181,192,235,288,234.7C384,235,480,181,576,181.3C672,181,768,235,864,250.7C960,267,1056,245,1152,213.3C1248,181,1344,139,1392,117.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z">
              <animateTransform attributeName="transform" attributeType="XML" type="translate" from="0 0" to="0 -150" dur="20s" repeatCount="indefinite"/>
            </path>
          </svg>
        </div> */}

        <div className="w-full max-w-md z-10">
          <div className="glass-container p-8 rounded-2xl shadow-xl border border-white/20 backdrop-blur-lg transition-all hover:shadow-2xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white">Create Account</h2>
              <p className="text-white/80 mt-2">Join our community today</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-white mb-1">
                  Full Name <span className="text-red-400">*</span>
                </label>
                <input 
                  type="text" 
                  name="name" 
                  value={form.name} 
                  onChange={handleChange} 
                  required 
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all" 
                  placeholder="John Doe"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-white mb-1">
                  Email Address <span className="text-red-400">*</span>
                </label>
                <input 
                  type="email" 
                  name="email" 
                  value={form.email} 
                  onChange={handleChange} 
                  required 
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all" 
                  placeholder="your@email.com"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-white mb-1">
                  Password <span className="text-red-400">*</span>
                </label>
                <input 
                  type="password" 
                  name="password" 
                  value={form.password} 
                  onChange={handleChange} 
                  required 
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all" 
                  placeholder="Enter password"
                />
              </div>

              {/* Photo Upload */}
              <div>
                <label className="block text-sm font-medium text-white mb-1">Profile Photo (Optional)</label>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    {(preview || form.photo) && (
                      <div className="relative group">
                        <img src={preview || form.photo} alt="Preview" className="h-16 w-16 rounded-full object-cover border-2 border-white/30 shadow"/>
                        <button 
                          type="button" 
                          onClick={openModal}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-red-600"
                        >
                          X
                        </button>
                      </div>
                    )}
                    {!preview && !form.photo && (
                      <div className="h-16 w-16 rounded-full bg-white/10 flex items-center justify-center border-2 border-dashed border-white/20 text-white/50">+</div>
                    )}
                  </div>
                  <div className="flex-1 space-y-2">
                    <label className="block">
                      <div className="px-4 py-2 bg-white/10 rounded-lg border border-white/20 hover:bg-white/20 cursor-pointer transition-colors text-center">
                        <span className="text-sm font-medium text-white">{preview || form.photo ? "Change Photo" : "Upload Photo"}</span>
                        <input type="file" accept="image/*" onChange={handlePhotoChange} className="hidden"/>
                      </div>
                    </label>
                    <p className="text-xs text-white/50">JPEG, PNG (Max 2MB)</p>
                  </div>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={uploading} 
                className={`w-full py-3 px-4font-medium rounded-lg bg-white/10 border border-white/20 text-white hover:bg-white/20 cursor-pointer transition-colors flex items-center justify-center ${
                  uploading 
                    ? "bg-white/20 cursor-not-allowed" 
                    : "bg-gradient-to-r hover:bg-white/20 cursor-pointer transition-colors shadow-md hover:shadow-lg"
                }`}
              >
                {uploading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : "Register Now"}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-white/80">
                Already have an account? <a href="/login" className="text-white hover:text-white font-medium transition-colors">Sign in</a>
              </p>
            </div>
          </div>
        </div>

        {/* Remove Photo Confirmation Dialog */}
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-50" onClose={closeModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white/10 backdrop-blur-lg p-6 text-left align-middle shadow-xl border border-white/20 transition-all">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-white"
                    >
                      Remove Profile Photo
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-white/80">
                        Are you sure you want to remove your profile photo?
                      </p>
                    </div>

                    <div className="mt-4 flex space-x-3 justify-end">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2"
                        onClick={closeModal}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-red-500/90 px-4 py-2 text-sm font-medium text-white hover:bg-red-600/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2"
                        onClick={() => {
                          removePhoto();
                          closeModal();
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>

        <Toaster position="top-center" toastOptions={{
          duration: 4000,
          style: { background: '#363636', color: '#fff' },
          success: { duration: 3000, iconTheme: { primary: '#10B981', secondary: 'white' } },
          error: { iconTheme: { primary: '#EF4444', secondary: 'white' } }
        }}/>
      </div>

      <style jsx global>{`
        .glass-container {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        input:-webkit-autofill,
        input:-webkit-autofill:hover, 
        input:-webkit-autofill:focus, 
        input:-webkit-autofill:active {
          -webkit-background-clip: text;
          -webkit-text-fill-color: white;
          transition: background-color 5000s ease-in-out 0s;
        }
      `}</style>
    </>
  );
};

export default Register;






