import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip, ChipProps, getKeyValue, colors } from "@nextui-org/react";
import React from 'react';
import { useState, useEffect } from 'react';
import { URL } from '../URLs';
import type { Column } from './Columns';
import { articleColumns, modColumns, analystColumns, rejectedColumns, tags } from './Columns';

//Generate a NEXUI table of data from a backend collection
export default function AdminTable({ collection } : { collection : string}) {
    const [showRows, setShowRows] = useState();

    let columns: Column[] = [];

    columns = getColumns(collection);
    
    //Run on first render of state
    useEffect(() => {
        pullCollection(collection, setShowRows);
    }, [])

    return (
        <Table color={"primary"}
        selectionMode="single"
        aria-label="Collection table">
            <TableHeader columns={columns}>
                {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
            </TableHeader>
            <TableBody emptyContent={"No data to display."}>
                {showRows!}
            </TableBody>
        </Table>
    );
}

//Return table columns based on collection
function getColumns(collectionString : string) {
    let columns: Column[] = [];

    switch (collectionString) {
        case 'articles': {
            columns = articleColumns;
        }
        case 'modArticles': {
            columns = modColumns;
        }
        case 'analystArticles': {
            columns = analystColumns;
        }
        case 'rejectedArticles': {
            columns = rejectedColumns;
        }
        case 'tags': {
            columns = tags;
        }
        default: {
            columns = articleColumns;
        }
    }

    return columns;
}

//Pull from backend and generate rows
function pullCollection(collection : string, setShowRows : React.Dispatch<React.SetStateAction<undefined>>) {
    let displayData;

    fetch(URL.url + '/' + collection)
    .then(response => response.json())
    .then(responseData => {
        displayData = responseData.map(function(row : any) {
            commaSeparateValues(row);

            return (
                <TableRow key={row._id}>
                    {(columnKey) => <TableCell>{getKeyValue(row, columnKey)}</TableCell>}
                </TableRow>
            )
        })
        setShowRows(displayData);
    })
    .catch((err) => console.log(err));
}

//Separate array values in the JSON
function commaSeparateValues(row : any) {
    Object.keys(row).forEach(function(v : any) {
        if (Array.isArray(row[v])) {
            row[v] = row[v].join(', ');
        }
    });
}