import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip, ChipProps, getKeyValue, colors, Button, useDisclosure, Modal, ModalContent, ModalHeader, Input, ModalBody, ModalFooter } from "@nextui-org/react";
import React from "react";
import { useState, useEffect } from "react";
import { URL } from "../URLs";
import type { Column } from "./Columns";
import { articleColumns, modColumns, analystColumns, rejectedColumns, tags } from "./Columns";
import UpdateFormModal, { setModalShowResponse, updateData } from "./UpdateFormModal";

//Generate a NEXUI table of data from a backend collection
export default function AdminTable({ collection } : { collection : string}) {
    const [showRows, setShowRows] = useState();
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [isOkayResponse, setShowResponse] = useState();
    setModalShowResponse(setShowResponse);

    let columns: Column[] = [];
    columns = getColumns(collection);
    
    //Run whenever onOpen state changes
    useEffect(() => {
        generateRows(collection, setShowRows);
    }, [isOpen]);

    return (
        <>
            {isOkayResponse}
            <Table aria-label="Collection table"
            color={"primary"}
            selectionMode="single"
            selectionBehavior="toggle"
            onRowAction={(key) => {
                var id : string = JSON.parse(JSON.stringify(key));
                updateData(id, collection);
                onOpen();
            }} >
                <TableHeader columns={columns}>
                    {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                </TableHeader>
                <TableBody emptyContent={"No data to display."}>
                    {showRows!}
                </TableBody>
            </Table>
            <UpdateFormModal isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange}/>
            
        </>
    );
}

//Return table columns based on collection
export function getColumns(collectionString : string) {
    let columns: Column[] = [];

    //switch statement does not function properly
    if (collectionString == 'modArticles') {
        columns = modColumns;
    }
    else if (collectionString == 'analystArticles') {
        columns = analystColumns;
    }
    else if (collectionString == 'rejectedArticles') {
        columns = rejectedColumns;
    }
    else if (collectionString == 'tags') {
        columns = tags;
    }
    else {
        columns = articleColumns;
    }

    return columns;
}

//Pull from backend and generate rows
function generateRows(collection : string, setShowRows : React.Dispatch<React.SetStateAction<undefined>>) {
    let displayData;

    //Get all documents from collection
    fetch(URL.url + "/" + collection)
    .then(response => response.json())
    .then(responseData => {
        //Parse data into rows
        displayData = responseData.map(function(row : any) {
            commaSeparateValues(row);

            return (
                <TableRow key={row._id} className="hover:cursor-pointer">
                    {(columnKey) => <TableCell>{getKeyValue(row, columnKey)}</TableCell>}
                </TableRow>
            )
        });
        setShowRows(displayData);
    })
    .catch((err) => console.log("Unable to retrieve data from backend."));
}

//Separate array values in the JSON
function commaSeparateValues(row : any) {
    Object.keys(row).forEach(function(value : any) {
        if (Array.isArray(row[value])) {
            row[value] = row[value].join(", ");
        }
    });
}