import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip, ChipProps, getKeyValue } from "@nextui-org/react";
import React from 'react';
import { useState, useEffect } from 'react';
import { URL } from '../URLs';
import type { Column } from './Columns';
import { articleColumns, modColumns, analystColumns, rejectedColumns, tags } from './Columns';

//Generate a NEXUI table of data from a backend collection
export default function AdminTable({ collection } : { collection : string}) {
    const [showRows, setShowRows] = useState();
    let displayData;

    let columns: Column[] = [];

    if (collection == 'articles') {
        columns = articleColumns;
    }
    else if (collection == 'modArticles') {
        columns = modColumns;
    } 
    else if (collection == 'analystArticles') {
        columns = analystColumns;
    } 
    else if (collection == 'rejectedArticles') {
        columns = rejectedColumns;
    } 
    else if (collection == 'tags') {
        columns = tags;
    }

    //Pull from backend and generate rows
    function pullCollection() {
        fetch(URL.url + '/' + collection)
        .then(response => response.json())
        .then(responseData => {
            displayData = responseData.map(function(article : any) {
                return (
                    <TableRow key={article._id}>
                        {(columnKey) => <TableCell>{getKeyValue(article, columnKey)}</TableCell>}
                    </TableRow>
                )
            })
            setShowRows(displayData);
        })
        .catch((err) => console.log(err));
    }
    
    //Run on first render of state
    useEffect(() => {
        pullCollection();
    }, [])

    return (
        <Table isStriped aria-label="Collection table">
            <TableHeader columns={columns}>
                {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
            </TableHeader>
            <TableBody emptyContent={"No data to display."}>
                {showRows!}
            </TableBody>
        </Table>
    );
}