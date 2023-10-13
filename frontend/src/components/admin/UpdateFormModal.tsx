import React, { useEffect, useState } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link} from "@nextui-org/react";
import type { Column } from './Columns';
import { getColumns } from "./AdminTable";
import { URL } from "../URLs";
import { IArticle } from "./interfaces/IArticle";
import { IAnalystArticle } from "./interfaces/IAnalystArticle";
import { IModArticle } from "./interfaces/IModArticle";
import { IRejectedArticle } from "./interfaces/IRejectedArticle";
import { ITag } from "./interfaces/ITag";

var rowInfo : RowInfo;

//Stores required collection and document id
class RowInfo {
  documentId: string = "";
  collection: string = "";
  inputs : any = <></>;
 
  constructor(documentId : string, collection : string, inputs? : any) {
    if (documentId !== undefined && collection !== undefined) {
      this.documentId = documentId;
      this.collection = collection;
      this.inputs = inputs;
    }
  }
}

//Update the selected data on the selected item
export function updateData(id : string, collection: string) {
  rowInfo = new RowInfo(id, collection);
}

//Display a form modal for a row
export default function UpdateFormModal({ isOpen, onOpen, onOpenChange} : { isOpen : boolean, onOpen : Function, onOpenChange : () => void}) {  
  const [showRowData, setShowRowData] = useState();

  //Re-render inputs whenever isOpen state changes
  useEffect(() => {
    generateInputs(setShowRowData);
  }, [isOpen]);

  return (
    <Modal 
    isOpen={isOpen} 
    onOpenChange={onOpenChange}
    placement="center"
    size="5xl"
    scrollBehavior="inside"
    >
    <ModalContent>
        {(onClose) => (
        <>
            <ModalHeader className="flex flex-col gap-1">Update Record</ModalHeader>
            <ModalBody>
              {showRowData}
            </ModalBody>
            <ModalFooter>
            <Button color="danger" variant="flat" onPress={onClose}>
                Cancel
            </Button>
            <Button color="primary" onPress={onClose}>
                Update
            </Button>
            </ModalFooter>
        </>
        )}
    </ModalContent>
    </Modal>
  );
}

//Get the row's document from the backend
async function getRowData() {
  let data;

  await fetch(URL.url + "/" + rowInfo.collection + "/" + rowInfo.documentId)
  .then(response => response.json())
  .then(responseData => {
    data = responseData;
    return (data);
  })
  .catch((err) => console.log("Error: " + err));

  return data;
}

//Generate the form's inputs
async function generateInputs(setShowRowData : any) {
  let columns : Column[] = [];
  let inputs;

  if (rowInfo == null) {
    return <></>;
  }

  //Get data and its headings
  const data : any = await getRowData();
  columns = getColumns(rowInfo.collection);

  inputs = columns.map(function(column : Column) {
    return (
        <Input
            key={column.key}
            label={column.label}
            variant="bordered"
            value={data[column.key]}
        />
    )
  });

  setShowRowData(inputs);
  return inputs;
}