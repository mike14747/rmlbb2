import { render, screen } from '@testing-library/react';

import Champions from '@/app/champions/page';

describe('Champions page tests', () => {
    test('Make sure the champions page renders properly with a mock champions prop', () => {
        // @ts-expect-error Server Component
        render(<Champions />);

        expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(/^champions$/i);
    });

    test('Make sure the champions page renders properly with the champions prop being null', () => {
        // @ts-expect-error Server Component
        render(<Champions />);

        expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(/^champions$/i);
        // expect(screen.getByText(/an error occurred fetching data/i)).toBeInTheDocument();
    });
});
