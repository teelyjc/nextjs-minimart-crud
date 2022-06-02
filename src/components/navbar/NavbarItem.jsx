import { useRouter } from "next/router";
import Link from "next/link";

export default function NavbarItem({ title, href }) {

  const { pathname } = useRouter();

  let className = "text-md lg:text-2xl" + " ";

  if (pathname === href) {
   className += "text-red-500"
  }

  return (
    <Link href={ href }>
      <a className={className}>
        { title }
      </a>
    </Link>
  )
}
