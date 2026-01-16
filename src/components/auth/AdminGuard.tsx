"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAdmin } from "@/hooks/useAdmin";
import { Lock, AlertCircle } from "lucide-react";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { app } from "@/lib/firebase/firebase";
import { createUserProfile } from "@/lib/firebase/users";

interface AdminGuardProps {
  children: React.ReactNode;
}

export default function AdminGuard({ children }: AdminGuardProps) {
  const { user, isAdmin, loading } = useAdmin();
  const router = useRouter();
  const [isCheckingProfile, setIsCheckingProfile] = useState(false);

  // Sync user profile on mount if logged in
  useEffect(() => {
    if (user && !loading) {
      setIsCheckingProfile(true);
      createUserProfile(user).finally(() => setIsCheckingProfile(false));
    }
  }, [user, loading]);

  const login = async () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      // Auth state change will trigger useAdmin update
    } catch (e) {
      console.error("Login failed", e);
    }
  };

  const logout = async () => {
    const auth = getAuth(app);
    await signOut(auth);
  };


  if (loading || isCheckingProfile) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-cyber-neon/30 border-t-cyber-neon rounded-full animate-spin"></div>
          <p className="text-muted-foreground font-mono text-sm animate-pulse">
            Verifying Access Protocols...
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen bg-background text-foreground font-sans">
        <div className="p-8 bg-glass-low backdrop-blur-md border border-glass-border rounded-xl shadow-xl w-96 text-center animate-in fade-in zoom-in duration-300">
          <div className="mb-6 bg-cyber-neon/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto text-cyber-neon shadow-[0_0_15px_rgba(0,255,157,0.3)]">
            <Lock size={32} />
          </div>
          <h2 className="text-2xl font-bold mb-2 text-foreground">
            Admin Access
          </h2>
          <p className="text-muted-foreground mb-6 text-sm">
            Restricted Area. Please identify yourself.
          </p>
          <button
            onClick={login}
            className="w-full bg-cyber-neon hover:bg-cyber-neon/90 text-black font-medium py-2.5 px-4 rounded-lg transition-all duration-200 ease-spring hover:shadow-lg hover:shadow-cyber-neon/30"
          >
            Sign in with Google
          </button>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="flex items-center justify-center h-screen bg-background text-foreground font-sans">
        <div className="p-8 bg-glass-low backdrop-blur-md border border-cyber-error/30 rounded-xl shadow-xl w-96 text-center animate-in shake duration-300">
          <div className="mb-6 bg-cyber-error/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto text-cyber-error shadow-[0_0_15px_rgba(255,50,50,0.3)]">
            <AlertCircle size={32} />
          </div>
          <h2 className="text-2xl font-bold mb-2 text-foreground">
            Access Denied
          </h2>
          <p className="text-muted-foreground mb-6 text-sm">
            You do not have permission to view this area.
          </p>
          <div className="flex flex-col gap-3">
            <p className="text-xs text-muted-foreground bg-black/20 p-2 rounded font-mono">
              User: {user.email}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => router.push("/")}
                className="flex-1 bg-glass-medium hover:bg-glass-high text-foreground font-medium py-2 px-4 rounded-lg transition-all"
              >
                Return to Safety
              </button>
              <button
                onClick={logout}
                className="flex-1 border border-glass-border hover:bg-glass-low text-muted-foreground hover:text-foreground font-medium py-2 px-4 rounded-lg transition-all"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
