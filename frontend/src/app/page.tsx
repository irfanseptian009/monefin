"use client";

export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <p className="text-center text-gray-500">
        Are you ready to manage finace your money? lets{" "}
        <a href="/login" className="text-green-500 hover:underline">
          Login
        </a>
      </p>
    </div>
  );
}
