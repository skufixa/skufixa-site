import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AdminClipsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin-session");

  if (session?.value !== "authorized") {
    redirect("/admin");
  }

  return children;
}