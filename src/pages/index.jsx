import IndexComponent from "@components/IndexComponent";
import NavbarNav from "@components/navbar/NavbarNav";
import Header from "@components/Header";

export default function Index() {
  return (
    <>
      <Header title="หน้าแรก" />

      <NavbarNav />

      <IndexComponent />
    </>
  )
}
