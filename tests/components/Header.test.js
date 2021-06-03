import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import Header from '../../components/Header';

describe('Test the header component... excluding the nav', () => {
    beforeEach(() => {
        render(<Header />);
    });

    test('Check the logo for text and home link', () => {
        expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/^rml baseball$/i);
    });

    test('Check that the logo link has an href that links to the home route', () => {
        expect(screen.getByTestId('logo-link')).toHaveAttribute('href', '/');
    });

    test('Check the sub-heading text', () => {
        expect(screen.getByTestId('sub-heading')).toHaveTextContent(/^since 1978$/i);
    });
});
