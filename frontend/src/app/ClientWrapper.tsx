// src/app/ClientWrapper.tsx
"use client"; // Mark this as a Client Component

import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { logout } from "../store/slices/userSlice";
import Link from "next/link";
import { PropsWithChildren } from "react";

export default function ClientWrapper({ children }: PropsWithChildren) {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout()); // Dispatch logout action
    router.push("/login"); // Redirect to login page
  };

  return (
    <>
      <nav className="p-4 bg-gray-800 text-white flex justify-between">
        <div>
          <Link href="/activities" className="mr-4">
            Activities
          </Link>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-500 px-4 py-2 rounded text-white"
        >
          Logout
        </button>
      </nav>
      {children}
    </>
  );
}
