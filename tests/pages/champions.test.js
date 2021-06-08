import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import Champions from '../../pages/champions';

describe('Champions page tests', () => {
    test('Make sure the champions page renders properly with a mock champions prop', () => {
        render(<Champions />);

        expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(/^champions$/i);
    });

    test('Make sure the champions page renders properly with the champions prop as null', () => {
        render(<Champions champions={null} />);

        expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(/^champions$/i);
    });
});