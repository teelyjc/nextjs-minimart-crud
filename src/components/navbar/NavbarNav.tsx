import { NavbarItem } from "@/src/components/navbar/NavbarItem";
import {
  HomeIcon,
  CashIcon,
  DatabaseIcon,
  AnnotationIcon,
} from "@heroicons/react/solid";

export function NavbarNav() {
  return (
    <ul className="flex flex-row space-x-4 bg-red-600 shadow-lg justify-start text-2xl py-2 px-10">
      <NavbarItem
        icon={<HomeIcon className="w-8 text-white" />}
        title="หน้าแรก"
        href="/"
      />
      <NavbarItem
        icon={<CashIcon className="w-8 text-white" />}
        title="แคชเชียร์"
        href="/cashier"
      />
      <NavbarItem
        icon={<DatabaseIcon className="w-8 text-white" />}
        title="สต๊อก / สินค้า"
        href="/stock"
      />
      <NavbarItem
        icon={<AnnotationIcon className="w-8 text-white" />}
        title="ประวัติ"
        href="/history"
      />
    </ul>
  );
}
