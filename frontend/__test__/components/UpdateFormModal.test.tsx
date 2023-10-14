import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe } from 'node:test';
import AdminTable from '@/src/components/admin/AdminTable';

describe('UpdateFormModal', () => {
    it('Should render not render a modal on AdminTable load', () => {
        render(<AdminTable collection='articles'/>);

        const modal = screen.queryByRole("dialog");

        expect(modal).not.toBeInTheDocument();
    });
});