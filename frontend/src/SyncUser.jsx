import { useUser } from "@clerk/clerk-react";
import { useEffect, useRef } from "react";

export default function SyncUser() {
  const { user, isLoaded, isSignedIn } = useUser();
  const hasSynced = useRef(false);

  useEffect(() => {
    if (!isLoaded || !isSignedIn || !user) return;

    // 🔒 prevent infinite loop
    if (hasSynced.current) return;
    hasSynced.current = true;

    fetch("http://localhost:3000/api/users/sync", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: {
          id: user.id,
          email: user.primaryEmailAddress?.emailAddress,
          firstName: user.firstName,
          lastName: user.lastName,
          imageUrl: user.imageUrl,
        },
      }),
    }).catch((err) => {
      console.error("User sync failed:", err);
    });
  }, [isLoaded, isSignedIn, user]);

  return null;
}
