import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import Champions from '../../pages/champions';

describe('Make sure the champions page renders properly', () => {
    test('Check that the page heading renders', () => {
        const component = render(<Champions />);

        const headingElement = component.getByTestId('pageHeading');
        // expect(headerElement.textContent).toBe('Champions');
        expect(headingElement).toHaveTextContent(/champions$/i);
    });
});
