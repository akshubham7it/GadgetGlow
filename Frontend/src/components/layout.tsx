// import Description from './Description'
import Footer from './Footer'
import Header from './Header'
import Header2 from './Header2'
// import Recent from './Recent'
import { Outlet } from 'react-router'

export default function LayoutWrapper() {
  return (
    <>
    <Header />
    <Header2/>
    <Outlet />
    

   <Footer />
  </>)
}
