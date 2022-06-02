/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  bodyParser: true,
}

console.log('Welcome to NY-MINIMART')

let consolewarn = console.warn
console.warn = (...args) => {
    if (
      args.length > 1 &&
      args[1].startsWith("You should not access 'res' after getServerSideProps")
    ) {
      // ignore message until this is fixed: https://github.com/auth0/nextjs-auth0/issues/524
      return
    } else {
        consolewarn(...args)
    }
}

module.exports = nextConfig
