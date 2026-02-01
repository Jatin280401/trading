import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { LayoutDashboard } from "lucide-react";

export default async function Navbar() {
  const { userId } = await auth();

  // Basic check for admin (in a real app, check metadata or db role)
  // For now, we assume if you are the user who deployed, you are admin.
  // Ideally, control this via ENV or Clerk Metadata
  const isAdmin = true; // Temporary: Allow everyone to see admin link for demo

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-black/50 backdrop-blur-xl">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl tracking-tighter text-white">
          TRAD<span className="text-green-500">SIGNALS</span>
        </Link>

        <div className="flex items-center gap-6">
          <Link href="/" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
            Signals
          </Link>
          
          {isAdmin && (
            <Link 
              href="/admin" 
              className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-green-500 transition-colors"
            >
              <LayoutDashboard className="w-4 h-4" />
              Admin
            </Link>
          )}

          <div className="ml-2">
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </div>
    </nav>
  );
}
