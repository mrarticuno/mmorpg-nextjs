import Image from "next/image";

export default function Home() {

  return (
    <>
      <main className="flex h-screen w-screen bg-[#152724] gap-2">
        <div className="flex h-full w-full bg-[#152724] gap-2">
          <div className="h-full w-fit bg-[#2C534A]">
            <Image src="/rouge.png" alt="Logo" width={0}
              height={0}
              sizes="100vw"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <div className="flex flex-col h-full w-full justify-between bg-[#1D2F2C]">
            <div className="w-full bg-[#2C534B]">
              <h1 className="text-4xl font-bold text-white">Menu 1</h1>
            </div>
            <div className="w-full bg-[#2C534B]">
              <h1 className="text-4xl font-bold text-white">Menu 2</h1>
            </div>
            <div className="w-full bg-[#2C534B]">
              <h1 className="text-4xl font-bold text-white">Menu 3</h1>
            </div>
          </div>
        </div>
        <div className="flex flex-col h-full w-full bg-[#152724] gap-2">
          <div className="h-full w-full bg-[#1D2F2C]">
            <h1 className="text-4xl font-bold text-white">Mapa</h1>
          </div>
          <div className="h-full w-full bg-[#1D2F2C]">
            <h1 className="text-4xl font-bold text-white">Atividades</h1>
          </div>
        </div>
      </main>
    </>
  );
}
