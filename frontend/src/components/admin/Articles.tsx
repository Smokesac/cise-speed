import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip, ChipProps, getKeyValue } from "@nextui-org/react";
import React from 'react';
import { useState, useEffect } from 'react';
import { URL } from '../URLs';

const columns = [
    {
      key: "title",
      label: "TITLE",
    },
    {
      key: "authors",
      label: "AUTHORS",
    },
    {
        key: "journal",
        label: "JOURNAL",
    },
    {
        key: "volume",
        label: "VOLUME",
    },
    {
        key: "publicationYear",
        label: "YEAR",
    },
    {
        key: "numberPages",
        label: "PAGES",
    },
    {
        key: "DOI",
        label: "DOI",
    },
  ];

export default function Articles() {
    const [showArticles, setShowArticles] = useState();
    let displayData;

    function pullArticles() {
        fetch(URL.url + '/articles')
        .then(response => response.json())
        .then(responseData => {
            displayData = responseData.map(function(article : any) {
                return (
                    <TableRow key={article._id}>
                        {(columnKey) => <TableCell>{getKeyValue(article, columnKey)}</TableCell>}
                    </TableRow>
                )
            })
            setShowArticles(displayData);
        })
        .catch((err) => console.log(err));
    }
    
    useEffect(() => {
        pullArticles();
    }, [])

    return (
        <Table isStriped aria-label="Articles table">
            <TableHeader columns={columns}>
                {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
            </TableHeader>
            <TableBody emptyContent={"No articles to display."}>
                {showArticles!}
            </TableBody>
        </Table>
    );
}