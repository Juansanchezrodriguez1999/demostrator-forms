import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export default function Home() {
    const { data: session, status } = useSession();
  
  return (
    <>
    <div className="px-6 pt-4 pb-2">
      <div><Link className="inline-block bg-[#8D8F93] text-white px-4 py-2 rounded text-2xl font-semibold text-gray-700 mr-2 mb-2 hover:bg-[#75767a]" href={"auth/login"}>Login</Link></div>
      <div><Link className="inline-block bg-[#8D8F93] text-white px-4 py-2 rounded text-2xl font-semibold text-gray-700 mr-2 mb-2 hover:bg-[#75767a]" href={"auth/register"}>Register</Link></div>
      
      <div><Link className="inline-block bg-[#8D8F93] text-white px-4 py-2 rounded text-2xl font-semibold text-gray-700 mr-2 mb-2 hover:bg-[#75767a]" href={"forms/form1"}>MI_F01</Link></div>
      <div><Link className="inline-block bg-[#8D8F93] text-white px-4 py-2 rounded text-2xl font-semibold text-gray-700 mr-2 mb-2 hover:bg-[#75767a]" href={"forms/form2"}>CE_F01</Link></div>
      <div><Link className="inline-block bg-[#8D8F93] text-white px-4 py-2 rounded text-2xl font-semibold text-gray-700 mr-2 mb-2 hover:bg-[#75767a]" href={"forms/form3"}>EN_F01</Link></div>
      {session && (
        <button
          onClick={() => signOut({ callbackUrl: '/auth/login' })}
          className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
        >
          Cerrar sesión
        </button>
      )}
  </div>
    </>
  );
}