import { GetStaticProps, NextPage } from "next";
import SortableTable from "../components/table/SortableTable";
import data from "../utils/dummydata.json";

import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell,
    getKeyValue
  } from "@nextui-org/table";

  import { Button } from '@nextui-org/react';

interface ArticlesInterface {
    id: string;
    title: string;
    authors: string[];
    journal: string;
    publicationYear: number;
    volume: string;
    numberPages: string;
    DOI: string;
    sEPractice: string;
    claim: string;
    researchType: string;
    participantType: string;
    evidenceResult: string;
    tags: string[];
    summary: string;
}

import React from "react";

export default function App() {
  return (
    <Table isStriped aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>NAME</TableColumn>
        <TableColumn>ROLE</TableColumn>
        <TableColumn>STATUS</TableColumn>
      </TableHeader>
      <TableBody>
        <TableRow key="1">
          <TableCell>Tony Reichert</TableCell>
          <TableCell>CEO</TableCell>
          <TableCell>Active</TableCell>
        </TableRow>
        <TableRow key="2">
          <TableCell>Zoey Lang</TableCell>
          <TableCell>Technical Lead</TableCell>
          <TableCell>Paused</TableCell>
        </TableRow>
        <TableRow key="3">
          <TableCell>Jane Fisher</TableCell>
          <TableCell>Senior Developer</TableCell>
          <TableCell>Active</TableCell>
        </TableRow>
        <TableRow key="4">
          <TableCell>William Howard</TableCell>
          <TableCell>Community Manager</TableCell>
          <TableCell>Vacation</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}