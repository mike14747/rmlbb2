import { render } from '@testing-library/react';

import Champions from '../pages/champions';

describe('Make sure the champions page renders properly', () => {
    test('Check that the page heading renders', () => {
        const component = render(<Champions />);
        const headerElement = component.getByTestId('pageHeading');

        expect(headerElement.textContent).toBe('Champions');
    });
});
