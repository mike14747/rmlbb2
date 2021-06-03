import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import Champions from '../../pages/champions';

describe('Make sure the champions page renders properly', () => {
    beforeEach(() => {
        render(<Champions />);
    });

    test('Check that the page heading renders', () => {
        expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(/^champions$/i);
    });
});
