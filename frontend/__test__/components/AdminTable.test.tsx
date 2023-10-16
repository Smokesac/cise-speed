import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe } from 'node:test';
import AdminTable, { getColumns } from '@/src/components/admin/AdminTable';
import { Column , articleColumns} from '@/src/components/admin/Columns';

describe('AdminTable', () => {
    it('Should retrieve correct columns', () => {
        const input =  getColumns('articles');

        const output = articleColumns;

        expect(input).toEqual(output);
    });

    it('Should render a table', () => {
        render(<AdminTable collection='articles'/>)

        const table = screen.getByRole("grid");

        expect(table).toBeInTheDocument();
    });

    it('Should not render table rows when no data is fetched', () => {
        render(<AdminTable collection='articles'/>)

        const rows = screen.getAllByRole("row") as HTMLElement[];

        const expectedNumRows = 2;

        expect(rows.length).toEqual(expectedNumRows);
    });
});