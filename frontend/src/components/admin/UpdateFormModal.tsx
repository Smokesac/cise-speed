import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link} from "@nextui-org/react";
import type { Column } from './Columns';
import { getColumns } from "./AdminTable";

var rowData : RowData;

//Stores required collection and document id
class RowData {
  documentId: string = "";
  collection: string = "";
 
  constructor(documentId?: string, collection? : string) {
    if (documentId !== undefined && collection !== undefined) {
      this.documentId = documentId;
      this.collection = collection;
    }
  }
}

//Update the selected data on the selected item
export function updateData(id : string, collection: string) {
  rowData = new RowData(id, collection);
  generateInputs();
}

//Display a form modal for a row
export default function UpdateFormModal({ isOpen, onOpen, onOpenChange} : { isOpen : boolean, onOpen : Function, onOpenChange : () => void}) {
  var inputs = generateInputs();

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
              {inputs}
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

//Generate the form's inputs
function generateInputs() {
  let columns: Column[] = [];
  let inputs;

  if (rowData == null) {
    return <></>;
  }

  columns = getColumns(rowData.collection);
  inputs = columns.map(function(column : Column) {
    return (
        <Input
            label={column.label}
            variant="bordered"
        />
    )
  });
  
  return inputs;
}