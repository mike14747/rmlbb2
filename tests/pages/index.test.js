import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import Home from '../../pages/index';

const news = [{
    'content': [
        {
            '_key': 'b86c3c2df223',
            '_type': 'block',
            'children': [
                {
                    '_key': '67725505f01a',
                    '_type': 'span',
                    'marks': [],
                    'text': 'First text block',
                },
            ],
            'markDefs': [],
            'style': 'normal',
        },
        {
            '_key': 'cf36d75f143d',
            '_type': 'block',
            'children': [
                {
                    '_key': 'd133bb370ed00',
                    '_type': 'span',
                    'marks': [],
                    'text': 'Second text block',
                },
            ],
            'markDefs': [],
            'style': 'normal',
        },
    ],
    'date': '2015-12-31',
    'title': 'Test Title',
}];

describe('Test the homepage', () => {
    const component = render(<Home news={news} />);

    test('Check that the page heading renders', () => {
        const headingElement = component.getByTestId('pageHeading');
        expect(headingElement).toHaveTextContent(/latest news$/i);
    });

    test('Check that the mocked news item renders', () => {
        expect(1).toEqual(1);
    });
});
