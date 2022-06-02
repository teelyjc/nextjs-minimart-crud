import NavbarItem from "@components/navbar/NavbarItem";

export default function NavbarNav({ page }) {
  if (page === "dashboard") {
    return (
      <nav className="flex flex-row justify-center space-x-4 my-4">
        <NavbarItem title="แดชบอร์ด" href="/dashboard" />
        <NavbarItem title="แคชเชียร์" href="/dashboard/cashier" />
        <NavbarItem title="สต๊อกสินค้า" href="/dashboard/stock" />
        <NavbarItem title="ออกจากระบบ" href="/authentication/signout" />
      </nav>
    )
  }

  return (
    <nav className="flex flex-row justify-center space-x-4 my-4">
      <NavbarItem title="หน้าแรก" href="/" />
      <NavbarItem title="เข้าสู่ระบบ" href="/authentication/signin" />
      <NavbarItem title="สมัครสมาชิก" href="/authentication/signup" />
    </nav>
  )
}
