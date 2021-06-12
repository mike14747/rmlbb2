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
    });

    test('Make sure the events page renders properly with the events prop being null', () => {
        render(<Events events={null} />);

        expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(/^upcoming events$/i);
        expect(screen.getByTestId('error')).toHaveTextContent(/an error occurred fetching data/i);
    });
});
