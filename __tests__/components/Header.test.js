import { render, screen } from '@testing-library/react';

import Header from '../../components/Header';

test('Check that the header component renders correctly... excluding the nav', () => {
    render(<Header />);

    const logo = screen.getByRole('img', { name: /^rml baseball$/i });
    expect(logo).toHaveAttribute('src', '/images/logo1.png');

    const [logoLink] = screen.getAllByRole('link');
    expect(logoLink).toHaveAttribute('href', '/');
    expect(logoLink).toContainElement(logo);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/^rml baseball$/i);
    expect(screen.getByText(/^since 1978$/i)).toBeInTheDocument();
});
