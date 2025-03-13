"use client"

import type React from "react"

import { createContext, useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"

type User = {
  id: string
  name: string
  email: string
  photoURL?: string
}

type AuthContextType = {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  signInWithGithub: () => Promise<void>
  logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => {},
  signInWithGithub: async () => {},
  logout: async () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  // Simulate auth state change
  useEffect(() => {
    // Mock authentication check
    const checkAuth = () => {
      const savedUser = localStorage.getItem("devhabit_user")

      if (savedUser) {
        setUser(JSON.parse(savedUser))
      } else {
        setUser(null)
      }

      setLoading(false)
    }

    checkAuth()
  }, [])

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user && pathname !== "/login") {
      router.push("/login")
    }
  }, [user, loading, pathname, router])

  const login = async (email: string, password: string) => {
    // Mock login functionality
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        // For demo purposes, any email/password combination works
        const mockUser = {
          id: "user-1",
          name: "Demo User",
          email: email,
          photoURL: "https://github.com/shadcn.png",
        }

        setUser(mockUser)
        localStorage.setItem("devhabit_user", JSON.stringify(mockUser))
        resolve()
      }, 1000)
    })
  }

  const signInWithGithub = async () => {
    // Mock GitHub login
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const mockUser = {
          id: "github-user-1",
          name: "GitHub User",
          email: "github@example.com",
          photoURL: "https://github.com/shadcn.png",
        }

        setUser(mockUser)
        localStorage.setItem("devhabit_user", JSON.stringify(mockUser))
        resolve()
      }, 1000)
    })
  }

  const logout = async () => {
    // Mock logout
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setUser(null)
        localStorage.removeItem("devhabit_user")
        router.push("/login")
        resolve()
      }, 500)
    })
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, signInWithGithub, logout }}>{children}</AuthContext.Provider>
  )
}

