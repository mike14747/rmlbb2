import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import Footer from '../../components/Footer';

describe('Test the Footer component', () => {
    render(<Footer />);

    test('Footer renders the copyright logo and site name', () => {
        expect(screen.getByRole('contentinfo')).toHaveTextContent(/^© 2015 RML Baseball$/i);
    });
});
