import { render, screen } from '@testing-library/react';

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

describe('Homepage news item tests', () => {
    test('Check that the homepage renders properly with a mocked news item', () => {
        render(<Home news={news} />);

        expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(/^latest news$/i);
        expect(screen.getByRole('article')).toBeInTheDocument();
        expect(screen.getByRole('heading', { level: 4 })).toHaveTextContent(/^Test Title$/i);
        expect(screen.getByTestId('news-date')).toHaveTextContent('2015-12-31');
        expect(screen.getByText(/^first text block$/i)).toBeInTheDocument();
        expect(screen.getByText(/^second text block$/i)).toBeInTheDocument();
    });

    test('Make sure the homepage renders properly with the news prop being an empty array', () => {
        render(<Home news={[]} />);

        expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(/^latest news$/i);
        expect(screen.getByRole('article')).toBeInTheDocument();
        expect(screen.getByTestId('empty')).toHaveTextContent(/there are no news items to display. check back again soon./i);
    });

    // test('Check that the homepage renders properly with the news prop as null', () => {
    //     render(<Home news={null} />);

    //     expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(/^latest news$/i);
    //     expect(screen.queryByRole('article')).not.toBeInTheDocument();
    //     expect(screen.getByText(/^an error occurred fetching data.$/i)).toBeInTheDocument();
    // });
});

describe('Homepage upcoming events tests', () => {
    test('', () => {
        render(<Home />);
    });
});
