import Head from "next/head";

export default function Header({ title }) {
  return (
    <Head>
      {
        title
        ? (<title>{ title } • NY-MINIMART</title>)
        : (<title>NY-MINIMART</title>)
      }
      <meta name="title" content="NY-MINIMART" />
      <meta name="description" content="Minimart Management System for NY-MINIMART" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      <meta property="og:type" content="website" />
      <meta property="og:url" content="" />
      <meta property="og:title" content="NY-MINIMART" />
      <meta property="og:description" content="Minimart Management System for NY-MINIMART" />
      <meta property="og:image" content="" />
    </Head>
  )
}
