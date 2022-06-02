import SignInComponent from "@components/authentication/SignInComponent";
import NavbarNav from "@components/navbar/NavbarNav";
import middleware from "@middlewares/middleware";
import Header from "@components/Header";

export default function SignIn() {
  return (
    <>
      <Header title="เข้าสู่ระบบ" />
      
      <NavbarNav />

      <SignInComponent />
    </>
  )
}

export const getServerSideProps = async ({ req, res }) => {
  await middleware.run(req, res);

  if (req.isAuthenticated()) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
      props: {

      }
    }
  }

  return {
    props: {

    }
  }
}
