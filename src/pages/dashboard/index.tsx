import useUser from "@hooks/useUser";
import Router from "next/router";
import { useEffect } from "react";

export default function Dashboard() {
  const [user, { mutate }] = useUser();

  useEffect(() => {
    if (!user) Router.push('/');
  }, [user])

  return <div>Dashboard Page.</div>
}