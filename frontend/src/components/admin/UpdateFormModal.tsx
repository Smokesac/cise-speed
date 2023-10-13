import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link} from "@nextui-org/react";

var data : DataInfo;

//Stores required collection and document id
class DataInfo {
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
  data = new DataInfo(id, collection);
}

//Display a form modal for a row
export default function UpdateFormModal({ isOpen, onOpen, onOpenChange} : { isOpen : boolean, onOpen : Function, onOpenChange : () => void}) {

  return (
    <Modal 
    isOpen={isOpen} 
    onOpenChange={onOpenChange}
    placement="top-center"
    >
    <ModalContent>
        {(onClose) => (
        <>
            <ModalHeader className="flex flex-col gap-1">Update record {data.documentId}</ModalHeader>
            <ModalBody>
            <Input
                autoFocus
                label="Email"
                variant="bordered"
            />
            <Input
                label="Password"
                variant="bordered"
            />
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
