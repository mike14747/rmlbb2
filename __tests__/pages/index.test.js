import { render, screen, within } from '@testing-library/react';

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

describe('Homepage news item tests... not including the sidebar', () => {
    test('Check that the homepage renders properly with a mocked news item', () => {
        render(<Home news={news} />);

        const article = screen.getByRole('article');
        expect(article).toBeInTheDocument();

        expect(within(article).getByRole('heading', { level: 2 })).toHaveTextContent(/^latest news$/i);

        expect(within(article).getByRole('heading', { level: 3 })).toHaveTextContent(/^Test Title$/i);
        expect(within(article).getByText(/Date: 2015-12-31/i)).toBeInTheDocument();
        expect(within(article).getByText(/^first text block$/i)).toBeInTheDocument();
        expect(within(article).getByText(/^second text block$/i)).toBeInTheDocument();
    });

    test('Make sure the homepage renders properly with the news prop being an empty array', () => {
        render(<Home news={[]} />);

        const article = screen.getByRole('article');
        expect(article).toBeInTheDocument();

        expect(within(article).getByRole('heading', { level: 2 })).toHaveTextContent(/^latest news$/i);
        expect(within(article).getByText(/there are no news items to display. check back again soon./i)).toBeInTheDocument();
    });

    test('Check that the homepage renders properly with the news prop as null', () => {
        render(<Home news={null} />);

        const article = screen.getByRole('article');
        expect(article).toBeInTheDocument();

        expect(within(article).getByRole('heading', { level: 2 })).toHaveTextContent(/^latest news$/i);
        expect(within(article).getByText(/^an error occurred fetching data.$/i)).toBeInTheDocument();
    });
});

describe('Homepage upcoming events tests', () => {
    test('', () => {
        render(<Home />);
    });
});
