import React, { useState } from "react";

interface SortableTableProps {
  headers: { key: string; label: string }[];
  data: any[];
}

const SortableTable: React.FC<SortableTableProps> = ({ headers, data }) => {
  const [sortHeader, setSortHeader] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [currentSearchTerm, setCurrentSearchTerm] = useState<string>("");
  const [filteredData, setFilteredData] = useState<any[]>(data);

  const sortTable = (
    header: { key: string; label: string },
    setSortHeader: Function,
    setSortOrder: Function,
    sortOrder: string
  ) => {
    let newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);
    setSortHeader(header.key);

    // Update the filtered data with the sorted order
    setFilteredData((prevData) => {
      return [...prevData].sort((row1, row2) => {
        const value1 = row1[header.key];
        const value2 = row2[header.key];

        if (value1 === value2) {
          return 0;
        }

        if (newSortOrder === "asc") {
          return value1 > value2 ? 1 : -1;
        } else {
          return value1 > value2 ? -1 : 1;
        }
      });
    });
  };

  const handleSearch = () => {
    if (currentSearchTerm.trim() !== "") {
      setSearchHistory((prevHistory) => [...prevHistory, currentSearchTerm]);

      // Perform filtering based on the search term
      const newFilteredData = data.filter((row) => {
        const values = Object.values(row);
        return values.some((v: any) =>
          v.toString().toLowerCase().includes(currentSearchTerm.toLowerCase())
        );
      });

      setFilteredData(newFilteredData);
    } else {
      // If the search term is empty, show the entire dataset
      setFilteredData(data);
    }
  };

  const handleClear = () => {
    // Reset the search term and show the entire dataset
    setCurrentSearchTerm("");
    setFilteredData(data);
  
    // Clear the search bar text
    const inputElement = document.querySelector('input[type="text"]') as HTMLInputElement;
    if (inputElement) {
      inputElement.value = "";
    }
  };
  

  return (
    <>
      <div>
        <input
          type="text"
          style={{ width: "350px" }}
          placeholder="Search..."
          list="searchHistoryList"
          onChange={(e) => setCurrentSearchTerm(e.target.value)}
        />
        <datalist id="searchHistoryList">
          {searchHistory
            .filter((term) => term.includes(currentSearchTerm))
            .map((term, index) => (
              <option key={index} value={term} />
            ))}
        </datalist>
        <button onClick={handleSearch}>Search</button>
        <button onClick={handleClear}>Reset</button>
      </div>
      <table>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header.key}>
                {header.label}
                <button
                  onClick={() => sortTable(header, setSortHeader, setSortOrder, sortOrder)}
                >
                  &gt;
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row, i) => (
            <tr key={i}>
              {headers.map((header) => (
                <td key={header.key}>{row[header.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default SortableTable;
