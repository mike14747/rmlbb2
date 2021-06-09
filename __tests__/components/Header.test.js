import { render, screen } from '@testing-library/react';

import Header from '../../components/Header';

test('Check that the header component renders correctly... excluding the nav', () => {
    render(<Header />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/^rml baseball$/i);
    expect(screen.getByTestId('logo-link')).toHaveAttribute('href', '/');
    expect(screen.getByTestId('sub-heading')).toHaveTextContent(/^since 1978$/i);
});
