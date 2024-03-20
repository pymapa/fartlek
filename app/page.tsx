import { redirect } from "next/navigation";
import { auth } from "./lib/auth";

const Home = async () => {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }

  redirect("/dashboard");

  return (
    <main className="">
    </main>
  );
}

export default Home;