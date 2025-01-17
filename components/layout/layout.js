import Navbar from "@/components/layout/Navbar";
import { GeistMono } from "geist/font/mono";

function Layout({ children }) {
  return (
    <>
      <Navbar className={GeistMono.className}></Navbar>
      <main className={`py-24 pb-5 h-screen ${GeistMono.className}`}>
        {children}
      </main>
    </>
  );
}
export default Layout;
