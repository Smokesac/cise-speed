import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe } from 'node:test';
import SubmissionForm from '@/src/components/SubmissionForm';


describe('Submission Form', () => {
    it('Should render a form', () => {
        render(<SubmissionForm/>)

        const form = screen.getByRole("form");

        expect(form).toBeInTheDocument();
    });

    it('Should render form inputs', () => {
        render(<SubmissionForm/>)

        const inputs = screen.getAllByRole("textbox") as HTMLElement[];

        const expectedNumInputs = 1;

        expect(inputs.length).toBeGreaterThanOrEqual(expectedNumInputs);
    });
});