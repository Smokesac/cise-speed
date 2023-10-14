import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe } from 'node:test';
import AdminPage from '@/src/pages/admin';

describe('Admin page', () => {
    it('Should render tabs', () => {
        render(<AdminPage />);
        
        const tabs = screen.getByRole("tablist");

        expect(tabs).toBeInTheDocument();
    });

    it('Should render the table', () => {
        render(<AdminPage />);
        
        const table = screen.getByRole("grid");

        expect(table).toBeInTheDocument();
    });
});