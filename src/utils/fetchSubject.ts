import type { DataAnime, DataGame } from "./type";

export async function fetchInfoSubject(id: number): Promise<DataAnime | DataGame | null> {
  try {
    const response = await fetch(`https://api.bgm.tv/v0/subjects/${id}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (
      data.platform === "TV" ||
      data.platform === "OVA" ||
      data.platform === "WEB" ||
      data.platform === "剧场版"
    ) {
      let anime: DataAnime = {
        id: id,
        name: data.name || 'Unknown',
        name_cn: data.name_cn || '',
        score: data.rating?.score || 0,
        images: data.images || {},
        tags: (data.tags?.slice(0, 6) || []).map((tag: any) => tag || ''),
        date: data.date || '',
        company: data.infobox?.find((item: any) => item.key === "制作公司")?.value || 'Unknown',
      };
      return anime;
    } else if (data.platform === "游戏") {
      let game: DataGame = {
        id: id,
        name: data.name || 'Unknown',
        name_cn: data.name_cn || '',
        score: data.rating?.score || 0,
        images: data.images || {},
        tags: (data.tags?.slice(0, 6) || []).map((tag: any) => tag || ''),
        date: data.date || '',
        developer: data.infobox?.find((item: any) => item.key === "开发商")?.value || 'Unknown',
        game_type: data.infobox?.find((item: any) => item.key === "游戏类型")?.value || 'Unknown',
      };
      return game;
    } else {
      console.error(`Invalid platform type "${data.platform}" for subject ID ${id}`);
      throw new Error(`Invalid platform type "${data.platform}" for subject ID ${id}`);
    }

  } catch (error) {
    console.error(`Error fetching subject ID ${id}:`, error);
    throw error;
  }
}
