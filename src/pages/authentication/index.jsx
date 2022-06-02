export default function Authentication() {
  return `
    Redirect ツ
  `
}

export const getServerSideProps = async () => {
  return {
    redirect: {
      destination: '/authentication/signin',
      permanent: false
    },
    props: {

    }
  }
}
