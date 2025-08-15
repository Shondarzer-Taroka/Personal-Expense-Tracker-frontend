
'use client'
import { useAuthProvider } from "@/components/context/AuthContext";
import DashboardCards from "@/components/Dashboard/Sidebar/DashboardCards/DashboardCards";
import { redirect, useRouter } from "next/navigation";

export default function DashboardPage() {
  const { user, loading } = useAuthProvider()
  const router = useRouter()


  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-lg font-medium text-gray-700">লোড হচ্ছে...</p>
      </div>
    </div>
  }


  if (!user?.email) {
    return redirect('/login');
  }



  return (

    <div>
      <h2 className="text-2xl font-bold mb-4">ড্যাশবোর্ড ওভারভিউ</h2>
      <DashboardCards />
    </div>

  );
}



