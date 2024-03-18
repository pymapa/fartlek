import { withAuth } from "next-auth/middleware"

const publicRoutes = [
  "/login",
]

export default withAuth(
  function middleware (req) {
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        if (
          publicRoutes.includes(req.nextUrl.pathname)
        ) {
          return true
        } else if (token) {
          return true
        } else {
          return false
        }
      }
    }
  }
)