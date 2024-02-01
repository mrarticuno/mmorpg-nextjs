import { useRouter } from "next/router";
import { api } from "~/utils/api";

export default function Character() {
  const router = useRouter();
  const params = router.query as unknown as { id: number };
  console.log(params);
  const characters = api.character.getChar.useQuery({ id: params.id });

  return (
    <div>
      <h1>Character</h1>
      {characters.isLoading && <div>Loading...</div>}
      {characters.isError && <div>Error</div>}
      {characters.data && (
        <div>
          <h2>{characters.data.name}</h2>
        </div>
      )}
    </div>
  );
}
