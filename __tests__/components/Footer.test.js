import { render, screen } from '@testing-library/react';

import Footer from '../../components/Footer';

test('Check that the footer renders the copyright logo and site name', () => {
    render(<Footer />);

    expect(screen.getByRole('contentinfo')).toHaveTextContent(/^© 2015 RML Baseball$/i);
});
