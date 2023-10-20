import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe } from 'node:test';
import SortableTable from '@/src/components/table/SortableTable';

interface ArticlesInterface {
    id: string;
    title: string;
    authors: string;
    source: string;
    pubyear: string;
    doi: string;
    claim: string;
    evidence: string;
}

const headers: { key: keyof ArticlesInterface; label: string }[] = [
    { key: "title", label: "Title" },
    { key: "authors", label: "Authors" },
    { key: "source", label: "Source" },
    { key: "pubyear", label: "Publication Year" },
    { key: "doi", label: "DOI" },
    { key: "claim", label: "Claim" },
    { key: "evidence", label: "Evidence" },
];

describe('Articles table', () => {
    it('Should render a table', () => {
        

        render(<SortableTable headers={headers} data={[]}/>)

        const table = screen.getByRole("table");

        expect(table).toBeInTheDocument();
    });

    it('Should render a row in the table', () => {
        render(<SortableTable headers={headers} data={[{
            id: '5',
            title: 'A Comparative Case Study on the Impact of Test-Driven Development on Program Design and Test Coverage',
            authors: 'Siniaalto, M., Abrahamsson, P.',
            source: 'ArXiv.Org, cs.SE, arXiv:1711.05082-284',
            pubyear: '2017',
            doi: 'https://doi.org/10.1109/esem.2007.35',
            claim: 'code quality improvement',
            evidence: 'weak against'
          }]}/>)

        const rows = screen.getAllByRole("row") as HTMLElement[];

        //Will be two if the above data is not rendered
        const expectedNumRows = 3;

        expect(rows.length).toEqual(expectedNumRows);
    });

    it('Should not render a row in the table ', () => {
        render(<SortableTable headers={headers} data={[]}/>)

        const rows = screen.getAllByRole("row") as HTMLElement[];

        const expectedNumRows = 2;

        expect(rows.length).toEqual(expectedNumRows);
    });
});