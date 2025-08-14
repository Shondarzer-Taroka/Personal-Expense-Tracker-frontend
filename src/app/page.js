'use client'

import { useAuthProvider } from "@/components/context/AuthContext";

export default function Home() {
const {loading,user} =useAuthProvider()
console.log(user);

if (loading) {
  return 'koa'
}
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      {user?.name}
    </div>
  );
}
