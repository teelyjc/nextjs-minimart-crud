import { GetStaticProps } from "next";

export default function IndexAuthentication() {
  return
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    redirect: {
      destination: '/authentication/signin',
      permanent: true,
    },
    props: {}
  }
}