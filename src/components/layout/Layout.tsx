import { NavbarNav } from "@/src/components/navbar/NavbarNav";
import LayoutProps from "@/components/layout/LayoutProps";
import NextHead from "@/components/head/NextHead";

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <NextHead />
      <main>
        <NavbarNav />
        <div className="mt-6">{children}</div>
      </main>
    </>
  );
}
