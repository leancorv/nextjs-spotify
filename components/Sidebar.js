import Image from "next/image";

function Sidebar() {
  return (
    <section className="fixed top-0 z-40 flex flex-col p-4 items-center bg-black w-[90px] h-screen space-y-8">
      <Image
        src="https://rb.gy/xkacau"
        width={56}
        height={56}
        objectFit="contain"
        alt="logo"
      />
      <div className="text-white">
        hello world
      </div>
    </section>
  )
}

export default Sidebar