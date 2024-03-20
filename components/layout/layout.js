import Navbar from "@/components/layout/Navbar";

function Layout({ children }) {
  return (
    <>
      <Navbar></Navbar>
      <main>{children}</main>
    </>
  );
}
export default Layout;
