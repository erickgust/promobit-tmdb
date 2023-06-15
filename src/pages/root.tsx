import { Outlet, ScrollRestoration } from 'react-router-dom'
import { Header } from '@/components/header'

export function Root () {
  return (
    <>
      <Header />
      <Outlet />
      <ScrollRestoration />
    </>
  )
}
