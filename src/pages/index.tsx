import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [collapsedSkills, setCollapsedSkills] = useState(true);
  const characters = [
    {
      name: "Rouge",
      emoji: "🏹",
      level: 99,
      image: "/rouge.png",
    },
    {
      name: "Druid",
      emoji: "🐻",
      level: 99,
      image: "/druid.png",
    },
    {
      name: "Mage",
      emoji: "🧙‍♂️",
      level: 89,
      image: "/mage.png",
    },
    {
      name: "Warrior",
      emoji: "🛡️",
      level: 99,
      image: "/warrior.png",
    },
  ];

  return (
    <main className="flex h-full w-full gap-2 bg-[#152724]">
      <div className="flex h-full w-full gap-2 bg-[#152724] ">
        <div className="golden-gradient p-2 hidden w-fit sm:block">
          <Image
            src="/rouge.png"
            alt="Logo"
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex w-full flex-col justify-between bg-[#1D2F2C]">
          <div className="golden-gradient w-full rounded-sm p-1">
            <div className="bg-[#2C534B]">
              <h1 className="text-2xl font-bold text-white p-2 medieval-font" onClick={() => setCollapsedSkills(!collapsedSkills)}>Personagens</h1>
              <ul className={`medieval-menu w-full overflow-y-auto ${collapsedSkills ? '' : 'hidden'}`}>
                <li>
                  <a>Novo Jogo</a>
                </li>
                {characters.map((character, index) => (
                  <li key={index}>
                    <a>
                      {character.emoji} {character.name} Lv: {character.level}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="golden-gradient p-1 w-full bg-[#2C534B]">
            <div className="bg-[#2C534B]">
              <h1 className="text-2xl font-bold text-white p-2 medieval-font">Ações</h1>
              <ul className="medieval-menu w-full overflow-y-auto">
                <li>
                  <a>
                      Personagem
                  </a>
                </li>
                <li>
                  <a>
                      Inventario
                  </a>
                </li>
                <li>
                  <a>
                    <div className="medieval-menu__item__content">Caçar</div>
                  </a>
                </li>
                <li>
                  <a>
                    <div className="medieval-menu__item__content">Atacar</div>
                  </a>
                </li>
                <li>
                  <a>
                    <div className="medieval-menu__item__content">Viajar</div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="golden-gradient p-1 w-full bg-[#2C534B]">
            <div className="bg-[#2C534B]">
            <h1 className="text-2xl font-bold text-white p-2 medieval-font" onClick={() => setCollapsedSkills(!collapsedSkills)}>Skills</h1>
            <ul className={`medieval-menu w-full overflow-y-auto ${collapsedSkills ? 'hidden' : ''}`}>
              <li>
                  <a>Apunhalhar 🗡️ [1] </a>
              </li>
              <li>
                <a>
                  Saraivada de flechas 🏹 [2]
                </a>
              </li>
              <li>
                <a>
                  Punhal venenoso 🗡️ [3]
                </a>
              </li>
              <li>
                <a>
                  Furtividade 🗡️ [4]
                </a>
              </li>
            </ul>
            </div>
          </div>
          <div className="w-full bg-[#152724] grow flex flex-col gap-1 justify-end pb-4">
            <h1 className="text-2xl font-bold text-white p-2 bg-[#2C534B] medieval-font">Dados</h1>
            <div className="bg-red-600 text-white text-md rounded-md text-center medieval-font">100/100</div>
            <div className="bg-blue-600 text-white text-md rounded-md text-center medieval-font">100/100</div>
            <div className="bg-orange-300 text-white text-md rounded-md text-center medieval-font">100/100</div>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col gap-2 bg-[#152724]">
        <div className="w-full golden-gradient rounded-lg">
          <Image
              src="/Valdheim.png"
              alt="Logo"
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-full object-cover p-2 rounded-xl"
            />
        </div>
        <div className="w-full h-full rounded-lg flex flex-row">
          <div className="w-full h-full border-r-2 border-[#af9567]">
            <h2 className="text-2xl text-[#af9567] p-2 medieval-font">História</h2>
            <ul className="medieval-menu w-full overflow-y-auto">
              <li>
                <a>
                  <div className="flex justify-around w-full h-full">
                    <Image src="/coin.png" alt="Logo" width={0} height={0} sizes="100vw" className="w-10 h-10 object-cover" />
                    <div className="m-auto">Encontre o Lobo cinzento [4h]</div>
                  </div>
                </a>
              </li>
            </ul>
          </div>
          <div className="w-full h-full">
            <h2 className="text-2xl text-[#af9567] p-2 medieval-font">Caçada</h2>
            <ul className="medieval-menu w-full overflow-y-auto">
              <li>
                <a>
                  <div className="flex justify-around w-full h-full">
                    <Image src="/coin-1.png" alt="Logo" width={0} height={0} sizes="100vw" className="w-10 h-10 object-cover" />
                    <div className="m-auto">Mate 20 gremilins</div>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
