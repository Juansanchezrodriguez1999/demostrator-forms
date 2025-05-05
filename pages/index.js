import Link from "next/link";


export default function Home() {
  return (
    <>
    <div class="px-6 pt-4 pb-2">
      <div><Link className="inline-block bg-[#8D8F93] text-white px-4 py-2 rounded text-2xl font-semibold text-gray-700 mr-2 mb-2 hover:bg-[#75767a]" href={"forms/form1"}>MI_F01</Link></div>
      <div><Link className="inline-block bg-[#8D8F93] text-white px-4 py-2 rounded text-2xl font-semibold text-gray-700 mr-2 mb-2 hover:bg-[#75767a]" href={"forms/form2"}>CE_F01</Link></div>
      <div><Link className="inline-block bg-[#8D8F93] text-white px-4 py-2 rounded text-2xl font-semibold text-gray-700 mr-2 mb-2 hover:bg-[#75767a]" href={"forms/form3"}>EN_F01</Link></div>
  </div>
    </>
  );
}
