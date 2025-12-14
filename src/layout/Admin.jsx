import { Outlet } from "react-router-dom"

export default function Admin() {
  return (
    <>
      <SideBar />
      <Outlet />
    </>
  )
}
