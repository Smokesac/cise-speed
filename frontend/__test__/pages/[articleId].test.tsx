import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe } from 'node:test';
import ArticleDetails from '@/src/pages/articles/[articleId]';

describe('Article detail page', () => {
    it('Should display not found if there are no articles', () => {
        render(<ArticleDetails article={undefined} />);
        
        const notFoundH1Text = screen.getByRole("heading").textContent;

        const expectedText = "Article not found";

        expect(notFoundH1Text).toEqual(expectedText);
    });

    it('Should render the article details if not undefined', () => {
        render(<ArticleDetails article={{
            id: '5',
            title: 'A Comparative Case Study on the Impact of Test-Driven Development on Program Design and Test Coverage',
            authors: 'Siniaalto, M., Abrahamsson, P.',
            source: 'ArXiv.Org, cs.SE, arXiv:1711.05082-284',
            pubyear: '2017',
            doi: 'https://doi.org/10.1109/esem.2007.35',
            claim: 'code quality improvement',
            evidence: 'weak against'
          }} />);
        
          const notFoundH1Text = screen.getByRole("heading").textContent;

          const expectedText = "Article Details";
  
          expect(notFoundH1Text).toEqual(expectedText);
    });
});