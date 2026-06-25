import { NewsItem } from '../types/NewsItem';

export const fetchNews = async (): Promise<NewsItem[]> => {
  let response: Response;

  try {
    response = await fetch('https://jsonplaceholder.typicode.com/posts');
  } catch {
    throw new Error('Нет подключения к интернету');
  }

  if (!response.ok) {
    throw new Error(`Ошибка сервера: ${response.status}`);
  }

  const data: NewsItem[] = await response.json();
  return data;
};
