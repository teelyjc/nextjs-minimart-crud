import middleware from "@middlewares/middleware";

export default function Signout() {
  return `
    SignOut redirect to /
  `
}

export const getServerSideProps = async ({ req, res }) => {
  await middleware.run(req, res)
  req.logout((error) => {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
      props: {

      }
    }
  })
  return {
    redirect: {
      destination: '/',
      permanent: false,
    },
    props: {

    }
  }
}
