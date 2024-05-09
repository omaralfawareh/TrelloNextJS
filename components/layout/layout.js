import Navbar from "@/components/layout/Navbar";

function Layout({ children }) {
  return (
    <>
      <Navbar></Navbar>
      <main className="p-24 pb-5 h-screen">{children}</main>
    </>
  );
}
export default Layout;
