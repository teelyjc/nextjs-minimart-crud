import SidebarItemProps from "@/src/components/navbar/NavbarItemProps";
import { useRouter } from "next/router";
import Link from "next/link";

export function NavbarItem({ icon, title, href }: SidebarItemProps) {
  const { pathname } = useRouter();

  function isActive(): string {
    if (pathname == href) {
      return "text-gray-300 delay-200 duration-300 ease-in-out cursor-pointer";
    }
    return "text-white hover:text-gray-700 delay-200 duration-300 ease-in-out cursor-pointer";
  }

  return (
    <Link href={href}>
      <div className="flex space-x-2">
        {icon}
        <a className={isActive()}>{title}</a>
      </div>
    </Link>
  );
}
