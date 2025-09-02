"use client";

import { createServerClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export default function AuthButton({ session }: { session: any }) {
  const supabase = createServerClient();
  const router = useRouter();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  const handleSignIn = () => {
    router.push("/login");
  };

  return session ? (
    <Button onClick={handleSignOut}>Logout</Button>
  ) : (
    <Button onClick={handleSignIn}>Login</Button>
  );
}