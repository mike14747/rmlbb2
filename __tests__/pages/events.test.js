import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Events from '../../pages/events';

const events = [
    {
        eventDate: '2021-06-11',
        daysUntil: 10,
        event: 'Some test event',
        details: 'details of the test event',
    },
    {
        eventDate: '2021-06-11',
        daysUntil: 5,
        event: 'Some coming soon test event',
        details: 'details of the test event',
    },
    {
        eventDate: '2021-06-11',
        daysUntil: 1,
        event: 'Some immediate event',
        details: 'details of the test event',
    },
];

const pastEvents = [
    {
        eventDate: '2020-05-19',
        event: 'Some past test event',
        details: 'details of the past test event',
    },
];

describe('Events page tests', () => {
    test('Make sure the events page renders properly with a mock events prop', () => {
        render(<Events events={events} />);

        expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(/^events$/i);
        expect(screen.getByRole('article')).toBeInTheDocument();

        expect(screen.getByText(/Due dates are assumed to be due at midnight EST/i)).toBeInTheDocument();
        expect(screen.getByText(/(unless otherwise noted)./i)).toBeInTheDocument();

        expect(screen.getByRole('button', { name: 'Show past events.' })).toBeInTheDocument();
        expect(screen.queryByRole('button', { name: 'Hide past events.' })).not.toBeInTheDocument();
        // userEvent.click(screen.getByRole('button', { name: 'Show past events.' }));
        fireEvent.click(screen.getByRole('button', { name: 'Show past events.' }));
        expect(screen.getByRole('button', { name: 'Hide past events.' })).toBeInTheDocument();

        // screen.debug(screen.getByRole('article'));
    });

    test('Make sure the page renders properly with the events prop being an empty array', () => {
        render(<Events events={[]} />);

        expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(/^events$/i);
        expect(screen.getByRole('article')).toBeInTheDocument();

        expect(screen.queryByText(/Due dates are assumed to be due at midnight EST/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/(unless otherwise noted)./i)).not.toBeInTheDocument();

        expect(screen.getByRole('button', { name: 'Show past events.' })).toBeInTheDocument();

        expect(screen.getByText(/there are no upcoming events to display. check back again soon./i)).toBeInTheDocument();
    });

    test('Make sure the events page renders properly with the events prop being null', () => {
        render(<Events events={null} />);

        expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(/^events$/i);
        expect(screen.getByRole('article')).toBeInTheDocument();

        expect(screen.queryByText(/Due dates are assumed to be due at midnight EST/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/(unless otherwise noted)./i)).not.toBeInTheDocument();

        expect(screen.getByRole('button', { name: 'Show past events.' })).toBeInTheDocument();

        expect(screen.getByText(/an error occurred fetching data./i)).toBeInTheDocument();
    });
});
