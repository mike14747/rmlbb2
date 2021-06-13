import { render, screen } from '@testing-library/react';

import Events from '../../pages/events';

const events = [
    {
        eventDate: '2021-06-11',
        event: 'Some test event',
        details: 'details of the test event',
    },
];

describe('Events page tests', () => {
    test('Make sure the events page renders properly with a mock events prop', () => {
        render(<Events events={events} />);

        expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(/^upcoming events$/i);
        expect(screen.getByRole('article')).toBeInTheDocument();
    });

    test('Make sure the page renders properly with the events prop being an empty array', () => {
        render(<Events events={[]} />);

        expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(/^upcoming events$/i);
        expect(screen.getByRole('article')).toBeInTheDocument();
        expect(screen.getByTestId('empty')).toHaveTextContent(/there are no upcoming events to display. check back again soon./i);
    });

    test('Make sure the events page renders properly with the events prop being null', () => {
        render(<Events events={null} />);

        expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(/^upcoming events$/i);
        expect(screen.queryByRole('article')).not.toBeInTheDocument();
        expect(screen.getByTestId('error')).toHaveTextContent(/an error occurred fetching data./i);
    });
});
