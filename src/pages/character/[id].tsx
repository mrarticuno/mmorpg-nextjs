import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { api } from "~/utils/api";

import { z } from "zod";

export const charSchema = z.object({
  id: z.number(),
  name: z.string(),
  level: z.number(),
  experience: z.number(),
  points: z.number(),
  pkPoints: z.number(),
  isDead: z.boolean(),
  mapId: z.number(),
  userId: z.number(),
  classId: z.number(),
  class: z
    .object({
      id: z.number(),
      name: z.string(),
      image: z.string(),
      emoji: z.string(),
      description: z.string(),
    })
    .optional(),
  charStats: z
    .object({
      id: z.number(),
      strength: z.number(),
      agility: z.number(),
      faith: z.number(),
      intelligence: z.number(),
      luck: z.number(),
      DPS: z.number(),
      defense: z.number(),
      health: z.number(),
      mana: z.number(),
      stamina: z.number(),
      characterId: z.number(),
    })
    .optional(),
});

type Char = z.infer<typeof charSchema>;

export default function Character() {
  const [char, setChar] = useState<Char | null>(null);
  const [stats, setStats] = useState({
    strength: 0,
    agility: 0,
    faith: 0,
    intelligence: 0,
    luck: 0,
  });
  const router = useRouter();
  const params = router.query as { id: string };
  const id = Number(params.id);
  const characters = api.character.getChar.useQuery(id);

  useEffect(() => {
    if (characters.data) {
      setChar(charSchema.parse(characters.data));
      setStats({ strength: 0, agility: 0, faith: 0, intelligence: 0, luck: 0 });
    }
  }, [characters.data]);

  const updatePoints = (attribute: keyof typeof stats, change: number) => {
    const totalPoints: number = char?.points ?? 0;
    const currentTotal: number = Object.values(stats).reduce(
      (acc, val) => acc + val,
      0,
    );
    const newTotal: number = currentTotal + change;

    if (newTotal <= totalPoints && newTotal >= 0) {
      setStats((prevStats) => {
        const currentAttributeValue: number = prevStats[attribute];
        const updatedValue: number = Math.max(
          0,
          currentAttributeValue + change,
        );

        return {
          ...prevStats,
          [attribute]: updatedValue,
        };
      });
    }
  };

  const renderAttributeControl = (attribute: keyof typeof stats) => (
    <div className="flex w-1/2 flex-col gap-1 p-2">
      <h2>{attribute.charAt(0).toUpperCase() + attribute.slice(1)}</h2>
      <div className="flex flex-col items-center justify-around gap-2">
        <button
          onClick={() => updatePoints(attribute, 1)}
          className="w-full rounded-lg bg-blue-500 px-2 py-1 text-white"
        >
          +
        </button>
        <input
          type="number"
          value={stats[attribute]}
          className="w-full text-center"
          readOnly
        />
        <button
          onClick={() => updatePoints(attribute, -1)}
          className="w-full rounded-lg bg-blue-500 px-2 py-1 text-white"
        >
          -
        </button>
      </div>
    </div>
  );

  return (
    <main className="h-full w-full gap-2 bg-[#152724]">
      <div className="flex h-full w-full justify-center gap-2 bg-[#152724] ">
        {characters.isLoading && (
          <div className="text-white">Carregando personagem...</div>
        )}
        {characters.isError && (
          <div className="text-white">
            Erro ao carregar personagem, tente novamente se o problema persistir
            entre em contato no suporte.
          </div>
        )}
        {char && (
          <div className="w-1/2 rounded-lg bg-green-200 p-4">
            {char && (
              <div className="mb-4">
                <div>
                  Nome: <span className="text-[#c0a080]">{char.name}</span>
                </div>
                <div>Level: {char.level}</div>
                <div>Experiência: {char.experience}</div>
                <div>Pontos: {char.points}</div>
                {char.charStats && (
                  <div className="flex flex-wrap justify-around gap-2">
                    {Object.entries(char.charStats)
                      .filter(([key]) => key !== "id" && key !== "characterId")
                      .map(([key, value]) => (
                        <div key={key} className="w-1/6 grow">
                          {key}: {value}
                        </div>
                      ))}
                  </div>
                )}
              </div>
            )}
            <div className="flex w-full flex-wrap">
              {renderAttributeControl("strength")}
              {renderAttributeControl("agility")}
              {renderAttributeControl("faith")}
              {renderAttributeControl("intelligence")}
              {renderAttributeControl("luck")}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
