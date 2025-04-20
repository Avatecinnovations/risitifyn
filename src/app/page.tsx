import { redirect } from "next/navigation";

export default async function Home() {
  // Redirect to dashboard if authenticated, otherwise to login
  redirect("/dashboard");
}
