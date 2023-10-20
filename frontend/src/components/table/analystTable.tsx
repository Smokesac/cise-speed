import React, { useState, useEffect } from "react";
import axios from "axios";
import { URL } from "../URLs";
import { useRouter } from 'next/router';

interface Article {
  id: string;
  title: string;
  authors: string;
  source: string;
  pubyear: string;
  doi: string;
  claim: string;
  evidence: string;
}

const TableComponent: React.FC = () => {

  const [data, setData] = useState<Article[]>([]);
  const headers = ["Title", "Authors", "Source", "Claim"];

  const router = useRouter();

  const handleButtonClick = (art : Article) => {
    // Data to be passed
    const id = {
      ptitle: art.title,
      pauthors: art.authors,
      psource: art.source,
      ppubYear: art.pubyear,
      pdoi: art.doi,
      pclaim: art.claim,
      pevidence: art.evidence

      // ...other data properties
    };

    // Encode the data object to a query string
    const queryString = new URLSearchParams(id).toString();

    // Navigate to a different page with query parameters
    router.push(`/analyst/analystSubmission?${queryString}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(URL.url+"/modArticles"); 
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // The empty dependency array ensures this effect runs once after the initial render

  return (
    <div className = "table-container">
      <h1>Article Table</h1>
      <table>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row.title}</td>
              <td>{row.authors}</td>
              <td>{row.source}</td>
              <td>{row.claim}</td>
              <td><button onClick={() => handleButtonClick(row)}>Check</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
