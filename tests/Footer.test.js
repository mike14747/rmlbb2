import { render } from '@testing-library/react';
// import '@testing-library/jest-dom';

import Footer from '../components/Footer';

describe('Test the Footer component', () => {
    test('Footer renders the copyright logo and site name', () => {
        const component = render(<Footer />);
        const footerElement = component.getByTestId('footer');

        expect(footerElement.textContent).toBe('© 2015 RML Baseball');
    });
});
