import type { CommentUser } from "./type";

export async function fetchCommentUser(idUser: string, idSubject: number): Promise<CommentUser | null> {
  try {
    const response = await fetch(`https://api.bgm.tv/v0/users/${idUser}/collections/${idSubject}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching comment user:', error);
    return null;
  }
}
