import { withAuth } from "next-auth/middleware"

const protectedRoutes = [
  "/dashboard"
]

export default withAuth(
  function middleware (req) {
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        if (
          protectedRoutes.includes(req.nextUrl.pathname) &&
          token === null
        ) {
          return false
        }
        return true
      }
    }
  }
)