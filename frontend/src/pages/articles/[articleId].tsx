// Import necessary modules and components
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Link from "next/link";
import data from "../../utils/dummydata.json";

// Update the getServerSideProps function
export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const articleId = context.params?.articleId as string;

  try {
    // Map the data to ensure the article has consistent property names
    const articles = data.articles.map((article) => ({
      id: article.id ?? article._id,
      title: article.title,
      authors: article.authors,
      source: article.source,
      pubyear: article.pubyear,
      doi: article.doi,
      claim: article.claim,
      evidence: article.evidence,
    }));

    // Find the article with the matching ID from the mapped data
    const article = articles.find((a) => String(a.id) === String(articleId));

    if (!article) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        article,
      },
    };
  } catch (error: any) {
    console.error("Error fetching data:", (error as Error).message);
    return {
      props: {
        article: null,
      },
    };
  }
};

// Update the component
const ArticleDetails: React.FC<{ article: any }> = ({ article }) => {
  if (!article) {
    return <h1>Article not found</h1>;
  }

  return (
    <div className="container">
      <h1>Article Details</h1>
      <p>Article ID: {article.id}</p>
      <p>Title: {article.title}</p>
      <p>Authors: {article.authors}</p>
      <p>Source: {article.source}</p>
      <p>Publication Year: {article.pubyear}</p>
      <p>DOI: {article.doi}</p>
      <p>Claim: {article.claim}</p>
      <p>Evidence: {article.evidence}</p>
      {/* Add the return button */}
      <Link href="/articles">
        <button className="return-button">Return to Articles</button>
      </Link>

      {/* Styles for the button */}
      <style jsx>{`
        .return-button {
          padding: 10px 15px;
          background-color: darkblue;
          color: #fff; /* Text color */
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
        `}</style>
    </div>
  );
};

export default ArticleDetails;
