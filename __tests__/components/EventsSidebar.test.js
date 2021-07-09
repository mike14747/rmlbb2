import { render, screen } from '@testing-library/react';

import EventsSidebar from '../../components/EventsSidebar';

const events = [
    {
        eventDate: '2021-07-08',
        event: 'Test event 1',
        details: 'Test details 1',
    },
    {
        eventDate: '2021-07-09',
        event: 'Test event 2',
        details: 'Test details 2',
    },
];

describe('Test the events sidebar component', () => {
    test('Test the events sidebar with a test array of 2 events', () => {
        render(<EventsSidebar events={events} />);
    });

    test('Test the events sidebar with an empty array of events', () => {
        render(<EventsSidebar events={[]} />);
    });

    test('Test the events sidebar with null as the events prop', () => {
        render(<EventsSidebar events={null} />);
    });
});
