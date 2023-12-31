import Dashboard from './dashboard/Dashboard'
import { useSession } from "next-auth/react"
import Login from '@/components/Login/Login'
import scss from './home.module.scss'
import React from 'react'

export default function Home() {
  const { data: session } = useSession()
  return (
      <main className={scss.main}>
        {session && <Dashboard />}
        {!session && <Login />}
      </main>
  )
}
