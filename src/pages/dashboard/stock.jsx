import StockComponent from "@components/dashboard/stock/StockComponent";
import NavbarNav from "@components/navbar/NavbarNav";
import middleware from "@middlewares/middleware";
import Header from "@components/Header";

import getUser from "@utils/getUser";

export default function Stock({ user }) {
  return (
    <>
      <Header title="สต๊อก" />

      <NavbarNav page="dashboard" />

      <StockComponent user={user} />
    </>
  )
}

export const getServerSideProps = async ({ req, res }) => {
  await middleware.run(req, res)

  if (!req.isAuthenticated()) {
    return {
      redirect: {
        destination: '/authentication/signin',
        permanent: false,
      },
      props: {

      }
    }
  }

  const user = await getUser(req.user.id);

  return {
    props: {
      user: user
    }
  }
}
