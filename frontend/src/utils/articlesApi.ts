// utils/articlesApi.ts

export const fetchArticleData = async () => {
    const response = await fetch('http://localhost:3000/api/dummydata');
    const data = await response.json();
    return data.articles;
  };
  