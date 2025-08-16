'use client'
import { useAuthProvider } from "../../src/components/context/AuthContext";
import { redirect, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import StatisticsPage from "./statistics/page";



export default function DashboardPage() {
  const { user, loading } = useAuthProvider()
  const router = useRouter()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (loading) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-center min-h-screen"
      >
        <div className="flex flex-col items-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full"
          ></motion.div>
          <motion.p 
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-lg font-medium text-white"
          >
            loading...
          </motion.p>
        </div>
      </motion.div>
    )
  }

  if (!user?.email) {
    return redirect('/login')
  }

  return (
    <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden "  >
      {/* Animated Background Elements */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 -z-10 overflow-hidden"
      >
        <svg
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <defs>
            <pattern
              id="dash-pattern"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(15)"
            >
              <motion.circle 
                cx="30" cy="30" r="2" fill="#3b82f6"
                animate={{ r: [2, 3, 2] }}
                transition={{ 
                  repeat: Infinity, 
                  repeatType: "reverse",
                  duration: 4,
                  ease: "easeInOut"
                }}
              />
              <motion.circle 
                cx="60" cy="60" r="2" fill="#3b82f6"
                animate={{ r: [2, 4, 2] }}
                transition={{ 
                  repeat: Infinity, 
                  repeatType: "reverse",
                  duration: 3,
                  ease: "easeInOut",
                  delay: 0.5
                }}
              />
            </pattern>
            <linearGradient id="gradient-bg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="50%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>
          <motion.rect 
            width="100%" height="100%" 
            fill="url(#gradient-bg)" 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            transition={{ duration: 1.5 }}
          />
          <motion.rect 
            width="100%" height="100%" 
            fill="url(#dash-pattern)" 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ duration: 1.5, delay: 0.3 }}
          />
        </svg>
      </motion.div>

      {/* Floating Animated Circles */}
      <AnimatePresence>
        {isMounted && (
          <>
            <motion.div
              initial={{ x: -100, y: -100, opacity: 0 }}
              animate={{ 
                x: 0, 
                y: 0, 
                opacity: 0.2,
                transition: { 
                  duration: 1,
                  delay: 0.5
                }
              }}
              className="absolute top-20 -left-20 w-64 h-64 rounded-full bg-blue-300 blur-3xl -z-10"
            ></motion.div>
            <motion.div
              initial={{ x: 100, y: 100, opacity: 0 }}
              animate={{ 
                x: 0, 
                y: 0, 
                opacity: 0.2,
                transition: { 
                  duration: 1,
                  delay: 0.7
                }
              }}
              className="absolute bottom-20 -right-20 w-64 h-64 rounded-full bg-purple-300 blur-3xl -z-10"
            ></motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 container mx-auto px-4 py-8"
      >
        <motion.div 
          className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <motion.h2 
            className="text-3xl font-bold text-white"
            initial={{ x: -20 }}
            animate={{ x: 0 }}
            transition={{ delay: 0.4 }}
          >
            Expense Overview
          </motion.h2>
          <motion.div 
            className="text-sm text-gray-500  px-4 py-2 rounded-lg shadow-sm"
            initial={{ x: 20 }}
            animate={{ x: 0 }}
            transition={{ delay: 0.4 }}
          >
            {new Date().toLocaleDateString('en-EN', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </motion.div>
        </motion.div>
        
        <StatisticsPage/>
        
      </motion.div>
    </div>
  )
}