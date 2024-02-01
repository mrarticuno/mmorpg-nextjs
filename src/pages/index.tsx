import { create } from "zustand";
import Image from "next/image";
import { useEffect } from "react";
import { useSessionGuard } from "~/utils/useSessionGuard";

import { api } from "~/utils/api";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";

interface Char {
  id: number;
  name: string;
  level: number;
  user?: unknown;
  class?: {
    id: number;
    name: string;
    emoji: string;
    image: string;
  };
}

interface StoreState {
  chars: Char[];
  selectedChar: Char | undefined;
  newCharacter: boolean;
  selectedClass: number;
  charName: string;
  collapsedSkills: boolean;
  setChars: (chars: Char[]) => void;
  setSelectedChar: (selectedChar: Char | undefined) => void;
  setNewCharacter: (newCharacter: boolean) => void;
  setSelectedClass: (selectedClass: number) => void;
  setCharName: (charName: string) => void;
  setCollapsedSkills: (collapsedSkills: boolean) => void;
}

const useStore = create<StoreState>((set) => ({
  chars: [],
  selectedChar: undefined,
  newCharacter: false,
  selectedClass: -1,
  charName: "",
  collapsedSkills: true,
  setChars: (chars) => set({ chars }),
  setSelectedChar: (selectedChar) => set({ selectedChar }),
  setNewCharacter: (newCharacter) => set({ newCharacter }),
  setSelectedClass: (selectedClass) => set({ selectedClass }),
  setCharName: (charName) => set({ charName }),
  setCollapsedSkills: (collapsedSkills) => set({ collapsedSkills }),
}));

export default function Home() {
  useSessionGuard();
  const characters = api.character.getChars.useQuery();
  const createCharMutation = api.character.create.useMutation();

  const {
    chars,
    selectedChar,
    newCharacter,
    selectedClass,
    charName,
    collapsedSkills,
    setChars,
    setSelectedChar,
    setNewCharacter,
    setSelectedClass,
    setCharName,
    setCollapsedSkills,
  } = useStore();

  useEffect(() => {
    if (characters?.data) {
      const updatedChars = characters.data as unknown as Char[];
      setChars(updatedChars);
      if (!selectedChar && updatedChars.length > 0) {
        setSelectedChar(updatedChars[0]);
      }
    }
  }, [characters, selectedChar, setChars, setSelectedChar]);

  const refreshChars = () => {
    void characters.refetch();
  };

  const selectChar = (char: Char) => {
    setSelectedChar(char);
  };

  const createChar = async () => {
    try {
      await createCharMutation.mutateAsync({
        name: charName,
        classId: selectedClass,
      });
      refreshChars();
    } catch (error) {
      console.error("Error creating character:", error);
    } finally {
      setNewCharacter(false);
    }
  };

  return (
    <>
      <Dialog open={newCharacter} onOpenChange={setNewCharacter}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Criar novo personagem?</DialogTitle>
            <DialogDescription>
              Escolha entre as classes disponivel para o seu personagem
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              {createCharMutation.error && (
                <p>{createCharMutation.error.message}</p>
              )}
              <div>
                <label className="text-white">Nome</label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="Nome do personagem"
                  value={charName}
                  onChange={(e) => setCharName(e.target.value)}
                />
              </div>
              <div
                className={`flex flex-col items-center justify-center rounded-md bg-[#152724] p-2 ${selectedClass === 1 ? "border-2 border-red-500 shadow-lg" : ""}`}
                onClick={() => setSelectedClass(1)}
              >
                <Image
                  src="/warrior.png"
                  alt="Logo"
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="h-32 w-32 object-cover"
                />
                <div className="text-center text-white">Guerreiro</div>
              </div>
              <div
                className={`flex flex-col items-center justify-center rounded-md bg-[#152724] p-2 ${selectedClass === 2 ? "border-2 border-red-500 shadow-lg" : ""}`}
                onClick={() => setSelectedClass(2)}
              >
                <Image
                  src="/rouge.png"
                  alt="Logo"
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="h-32 w-32 object-cover"
                />
                <div className="text-center text-white">Ladino</div>
              </div>
              <div
                className={`flex flex-col items-center justify-center rounded-md bg-[#152724] p-2 ${selectedClass === 3 ? "border-2 border-red-500 shadow-lg" : ""}`}
                onClick={() => setSelectedClass(3)}
              >
                <Image
                  src="/mage.png"
                  alt="Logo"
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="h-32 w-32 object-cover"
                />
                <div className="text-center text-white">Mago</div>
              </div>
              <div
                className={`flex flex-col items-center justify-center rounded-md bg-[#152724] p-2 ${selectedClass === 4 ? "border-2 border-red-500 shadow-lg" : ""}`}
                onClick={() => setSelectedClass(4)}
              >
                <Image
                  src="/druid.png"
                  alt="Logo"
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="h-32 w-32 object-cover"
                />
                <div className="text-center text-white">Druida</div>
              </div>
            </div>
          </div>
          <DialogFooter className="flex h-full w-full items-end justify-end">
            <button
              className="btn btn-primary flex h-fit items-center gap-1 rounded-lg bg-green-500 p-2 text-white"
              onClick={() => createChar()}
            >
              <span role="img" aria-label="Plus">
                ➕
              </span>
              Criar
            </button>
            <DialogClose asChild>
              <button className="btn btn-secondary h-fit gap-1 rounded-lg bg-red-500 p-2 text-white">
                <span role="img" aria-label="Trash Bin">
                  🗑️
                </span>
                Cancelar
              </button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <main className="flex h-full w-full gap-2 bg-[#152724]">
        <div className="flex h-full w-full gap-2 bg-[#152724] ">
          <div className="golden-gradient hidden w-fit p-2 sm:block">
            <Image
              src={selectedChar?.class?.image ?? "/rouge.png"}
              alt="Logo"
              width={0}
              height={0}
              sizes="100vw"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex w-full flex-col justify-between bg-[#1D2F2C]">
            <div className="golden-gradient w-full rounded-sm p-1">
              <div className="bg-[#2C534B]">
                <h1
                  className="medieval-font p-2 text-2xl font-bold text-white"
                  onClick={() => setCollapsedSkills(!collapsedSkills)}
                >
                  Personagens
                </h1>
                <ul
                  className={`medieval-menu w-full overflow-y-auto ${collapsedSkills ? "" : "hidden"}`}
                >
                  <li>
                    <a onClick={() => setNewCharacter(true)}>Novo Jogo</a>
                  </li>
                  {chars?.map((char: Char) => (
                    <li key={char.id} onClick={() => selectChar(char)}>
                      <a
                        className={`${
                          selectedChar?.id === char.id
                            ? "bg-[#4f4334] text-white"
                            : ""
                        }`}
                      >
                        {char.class?.emoji} {char.name} Lv: {char.level}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="golden-gradient w-full bg-[#2C534B] p-1">
              <div className="bg-[#2C534B]">
                <h1 className="medieval-font p-2 text-2xl font-bold text-white">
                  Ações
                </h1>
                <ul className="medieval-menu w-full overflow-y-auto">
                  <li>
                    <a>Personagem</a>
                  </li>
                  <li>
                    <a>Inventario</a>
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
            <div className="golden-gradient w-full bg-[#2C534B] p-1">
              <div className="bg-[#2C534B]">
                <h1
                  className="medieval-font p-2 text-2xl font-bold text-white"
                  onClick={() => setCollapsedSkills(!collapsedSkills)}
                >
                  Skills
                </h1>
                <ul
                  className={`medieval-menu w-full overflow-y-auto ${collapsedSkills ? "hidden" : ""}`}
                >
                  <li>
                    <a>Apunhalhar 🗡️ [1] </a>
                  </li>
                  <li>
                    <a>Saraivada de flechas 🏹 [2]</a>
                  </li>
                  <li>
                    <a>Punhal venenoso 🗡️ [3]</a>
                  </li>
                  <li>
                    <a>Furtividade 🗡️ [4]</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex w-full grow flex-col justify-end gap-1 bg-[#152724] pb-4">
              <h1 className="medieval-font bg-[#2C534B] p-2 text-2xl font-bold text-white">
                Dados
              </h1>
              <div className="text-md medieval-font rounded-md bg-red-600 text-center text-white">
                100/100
              </div>
              <div className="text-md medieval-font rounded-md bg-blue-600 text-center text-white">
                100/100
              </div>
              <div className="text-md medieval-font rounded-md bg-orange-300 text-center text-white">
                100/100
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col gap-2 bg-[#152724]">
          <div className="golden-gradient w-full rounded-lg">
            <Image
              src="/Valdheim.png"
              alt="Logo"
              width={0}
              height={0}
              sizes="100vw"
              className="h-full w-full rounded-xl object-cover p-2"
            />
          </div>
          <div className="flex h-full w-full flex-row rounded-lg">
            <div className="h-full w-full border-r-2 border-[#af9567]">
              <h2 className="medieval-font p-2 text-2xl text-[#af9567]">
                História
              </h2>
              <ul className="medieval-menu w-full overflow-y-auto">
                <li>
                  <a>
                    <div className="flex h-full w-full justify-around">
                      <Image
                        src="/coin.png"
                        alt="Logo"
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="h-10 w-10 object-cover"
                      />
                      <div className="m-auto">
                        Encontre o Lobo cinzento [4h]
                      </div>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
            <div className="h-full w-full">
              <h2 className="medieval-font p-2 text-2xl text-[#af9567]">
                Caçada
              </h2>
              <ul className="medieval-menu w-full overflow-y-auto">
                <li>
                  <a>
                    <div className="flex h-full w-full justify-around">
                      <Image
                        src="/coin-1.png"
                        alt="Logo"
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="h-10 w-10 object-cover"
                      />
                      <div className="m-auto">Mate 20 gremilins</div>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
