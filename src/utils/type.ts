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
  date: string;
  company: string;
}

export interface DataAnime extends DataSubject {
  platform: string;
}

export interface DataGame extends DataSubject {
  game_type: string;
}

export interface CommentUser {
  comment: string;
  score: number;
}
