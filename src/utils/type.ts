export interface DataSubject {
  id: number;
  name: string;
  name_cn: string;
  score: number;
  images: {
    common: string;
  };
  tags: Array<{
    name: string;
    count: number;
  }>;
}

export interface DataAnime extends DataSubject {
  date: string;
  company: string;
}

export interface DataGame extends DataSubject {
  game_type: string;
  date: string;
  developer: string;
}
