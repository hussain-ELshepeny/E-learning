import { Outlet } from "react-router-dom"
import Footer from "../components/Footer"
import Navbar from "../components/NavBar"

export default function UserLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}
