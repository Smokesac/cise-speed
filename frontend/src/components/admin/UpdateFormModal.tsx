import React, { useEffect, useState } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link, Chip} from "@nextui-org/react";
import type { Column } from './Columns';
import { getColumns } from "./AdminTable";
import { URL } from "../URLs";

var rowInfo : RowInfo;
var setShowResponse : React.Dispatch<React.SetStateAction<undefined>>;

//Stores required collection and document id
class RowInfo {
  documentId: string = "";
  collection: string = "";
  inputs : any = <></>;
 
  constructor(documentId : string, collection : string, inputs? : any) {
      this.documentId = documentId;
      this.collection = collection;
      this.inputs = inputs;
  }
}

//Update the selected data on the selected item
export function updateData(id : string, collection: string) {
  rowInfo = new RowInfo(id, collection);
}

//Set the state changer of the response message
export function setModalShowResponse(adminSetShowResponse : React.Dispatch<React.SetStateAction<undefined>>) {
  setShowResponse = adminSetShowResponse;
}

//Display a form modal for a row
export default function UpdateFormModal({ isOpen, onOpen, onOpenChange} : { isOpen : boolean, onOpen : Function, onOpenChange : () => void}) {  
  const [showRowData, setShowRowData] = useState();

  //Clear and re-render inputs and message whenever isOpen state is true
  useEffect(() => {
    if (isOpen) {
      let inputs : any = <></>;
      setShowRowData(inputs);
      generateInputs(setShowRowData);
      generateReponseMessage();
    }
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
              <form onSubmit={event => handleSubmit(event, onOpen, onOpenChange)} id="updateForm">
                {showRowData}
              </form>
            </ModalBody>
            <ModalFooter>
            <Button color="danger" variant="flat" onPress={onClose}>
                Cancel
            </Button>
            <Button color="primary" type="submit" form="updateForm">
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
  if (data == undefined) {
    return;
  }

  columns = getColumns(rowInfo.collection);

  inputs = columns.map(function(column : Column) {
    return (
        <Input
            key={column.key}
            name={column.key}
            label={column.label}
            variant="bordered"
            defaultValue={data[column.key]}
            className="mb-2"
        />
    )
  });

  setShowRowData(inputs);
}

//Handle form submission
async function handleSubmit(e : any, onOpen : Function, onOpenChange : () => void) {

  //Prevent the browser from reloading the page
  e.preventDefault();

  //If form is open without data
  if (rowInfo == undefined) {
    generateReponseMessage(false);
    onOpenChange();
    return;
  }

  //Read form data
  const form = e.target;
  const formData = new FormData(form);

  //Parse data
  var formJson = Object.fromEntries(formData.entries());
  commaSeparatedToArray(formJson);

  //Send PUT request
  await fetch(URL.url + "/" + rowInfo.collection + "/" + rowInfo.documentId, {
    method: 'PUT',
    body: JSON.stringify(
      formJson,
    ),
    headers: {
      "content-type": "application/json",
    },
  })
  .then(function(response) {
    generateReponseMessage(response.ok);
  })
  .catch((err) => console.log("Error: " + err));

  onOpen();
  onOpenChange();
}

//Convert specific comma-separated fields to arrays
function commaSeparatedToArray(formJson : any) {
  Object.entries(formJson).forEach(function([key, value] : [key : any, value : any]) {
    if (key == 'authors' || key == 'tags') {
      formJson[key] = (value as string).split(',');
    }
  })
}

//Generate a message indicating update success/fail
function generateReponseMessage(success? : boolean) {
  let message : any;

  if (success == undefined) {
    message = <></>;
  }
  else if (success == true) {
    message = <Chip color="success" className="mb-2">Record updated successfully</Chip>;
  }
  else {
    message = <Chip color="danger" className="mb-2">Failed to update record</Chip>;
  }

  setShowResponse(message);
}