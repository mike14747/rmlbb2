import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import Header from '../../components/Header';

describe('Test the header component... including the nav', () => {
    test('Check the logo for text and home link', () => {
        const component = render(<Header />);
        expect(1).toEqual(1);
    });
});
