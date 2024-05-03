import { useState, useEffect } from "react";

interface LocalCache {
  [key: string]: string[];
}

const localCache: LocalCache = {};

export default function useBreedList(animal: string): [string[], string] {
  const [breedList, setBreedList] = useState<string[]>([]);
  const [status, setStatus] = useState<string>("unloaded");

  useEffect(() => {
    if (!animal) {
      setBreedList([]);
      setStatus("unloaded");
    } else if (localCache[animal]) {
      setBreedList(localCache[animal]);
      setStatus("loaded");
    } else {
      requestBreeds();
    }

    async function requestBreeds() {
      setStatus("loading");
      const res = await fetch(
        `https://pets-v2.dev-apis.com/breeds?animal=${animal}`
      );
      const json = await res.json();
      localCache[animal] = json.breeds || [];
      setBreedList(localCache[animal]);
      setStatus("loaded");
    }
  }, [animal]);

  return [breedList, status];
}
