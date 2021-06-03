import { render, screen } from '@testing-library/react';
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

describe('Test that the homepage renders properly', () => {
    beforeEach(() => {
        render(<Home news={news} />);
    });

    test('Check that the page heading and mocked news item renders', () => {
        expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(/^latest news$/i);
    });

    test('Check that the mocked news item renders in an article tag', () => {
        expect(screen.getByRole('article')).toBeInTheDocument();
    });

    test('Check that the mocked news item heading renders', () => {
        expect(screen.getByRole('heading', { level: 4 })).toHaveTextContent(/^Test Title$/i);
    });

    test('Check that the mocked news item date renders', () => {
        expect(screen.getByTestId('news-date')).toHaveTextContent('2015-12-31');
    });

    test('Check that the first block of block content is rendering', () => {
        expect(screen.getByText(/^first text block$/i)).toBeInTheDocument();
    });

    test('Check that the second block of block content is rendering', () => {
        expect(screen.getByText(/^second text block$/i)).toBeInTheDocument();
    });
});

describe('Test that the homepage renders properly without the news props', () => {
    beforeEach(() => {
        render(<Home news={null} />);
    });

    test('Check that the page heading renders', () => {
        expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(/^latest news$/i);
    });

    test('Check that there are no article tags without props', () => {
        expect(screen.queryByRole('article')).not.toBeInTheDocument();
    });

    test('Check that the no-news error message renders', () => {
        expect(screen.getByText(/^an error occurred fetching the news.$/i)).toBeInTheDocument();
    });
});
