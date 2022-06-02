import SignUpComponent from "@components/authentication/SignUpComponent";
import NavbarNav from "@components/navbar/NavbarNav";
import Header from "@components/Header";

export default function SignUp({ allowRegistration }) {
  return (
    <>
      <Header title="สมัครสมาชิก" />
      
      <NavbarNav />
      
      <SignUpComponent allowRegistration={ allowRegistration } />
    </>
  )
}

export const getServerSideProps = async () => {
  // TODO: Keep this setting to MongoDB..
  const allowRegistration = true;
  return {
    props: {
      allowRegistration
    }
  }
}
