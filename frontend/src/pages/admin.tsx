import { GetStaticProps, NextPage } from "next";
import SortableTable from "../components/table/SortableTable";
import data from "../utils/dummydata.json";

import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell
  } from "@nextui-org/table";

interface ArticlesInterface {
    id: string;
    title: string;
    authors: string[];
    journal: string;
    publicationYear: number;
    volume: string;
    numberPages: string;
    DOI: string;
    sEPractice: string;
    claim: string;
    researchType: string;
    participantType: string;
    evidenceResult: string;
    tags: string[];
    summary: string;
}

type ArticlesProps = {
    articles: ArticlesInterface[];
};

const Admin: NextPage<ArticlesProps> = ({ articles }) => {
    const headers: { key: keyof ArticlesInterface; label: string }[] = [
        { key: "title", label: "Title" },
        { key: "authors", label: "Authors" },
        { key: "source", label: "Source" },
        { key: "pubyear", label: "Publication Year" },
        { key: "doi", label: "DOI" },
        { key: "claim", label: "Claim" },
        { key: "evidence", label: "Evidence" },
    ];
    return (
        <div className="container">
            <h1>Admin Data Management</h1>
            <p>Page containing a table of articles:</p>
            <SortableTable headers={headers} data={articles} />
        </div>
    );
};
export const getStaticProps: GetStaticProps<ArticlesProps> = async (_) => {
    // Map the data to ensure all articles have consistent property names
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
    
    return {
        props: {
            articles,
        },
    };
};
export default Admin;