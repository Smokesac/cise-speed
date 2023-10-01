import React, { FormEvent, useState } from "react";


interface SortableTableProps {
    headers: { key: string; label: string }[];
    data: any[];
}

const sortTable = (
    header: { key: string; label: string }, 
    setSortHeader: Function, 
    setSortOrder: Function, 
    sortHeader: string, 
    sortOrder: string) => 
{
    // ""=no sorting, "asc"=ascending(по увеличению), "desc"= descending(по уменьшению)
    // "" -> "asc"
    // "asc" -> "desc"
    // "desc" -> "asc"
    // If columns changed, always use asc
    if (header.key != sortHeader) {
        setSortOrder("asc");
    }
    // If cloumns not changed, swap sort order
    else {
        if (sortOrder == "" || sortOrder == "desc") {
            setSortOrder("asc");
        }
        else if (sortOrder == "asc") {
            setSortOrder("desc");
        }
    }
    setSortHeader(header.key);
};

const filterTable = (event: FormEvent, setFilter: Function) => {
    event.preventDefault();
    const node: any = event.target;
    setFilter(node.value);
};

const SortableTable: React.FC<SortableTableProps> = ({ headers, data }) => {
    const [filter, setFilter] = useState("");
    const [sortHeader, setSortHeader] = useState("");
    const [sortOrder, setSortOrder] = useState("");
    return (
        <>
            <input type="text" style={{width:"350px"}} onInput={(e) => filterTable(e, setFilter)} />
            <table>
                <thead>
                    <tr>
                        {headers.map((header) => (
                            <th key={header.key}>
                                {header.label} 
                                <button onClick={() => sortTable(header, setSortHeader, setSortOrder, sortHeader, sortOrder)}>&gt;</button>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.filter((row) => {
                        // get values from row
                        let values = Object.values(row);
                        // keep if some row value includes filter value (case insensitive)
                        return values.some((v: any) => v.toLowerCase().includes(filter.toLowerCase()));
                    })
                    .sort((row1, row2) => {
                        // Rows are equal, sort order does not matter
                        if (row1[sortHeader] == row2[sortHeader]) {
                            return 0;
                        }
                        
                        // If sort order is ascending
                        if (sortOrder == "asc") {
                            // compare them in the right order
                            return row1[sortHeader] > row2[sortHeader] ? 1 : -1;
                        }
                        // If sort order is descending
                        else {
                            // compare them in reverse order
                            return row1[sortHeader] > row2[sortHeader] ? -1 : 1;
                        }
                    })
                    .map((row, i) => (
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
}

export default SortableTable;