import { render, screen, within } from '@testing-library/react';

import Nav from '../../components/Nav';

describe('Test the nav component', () => {
    test('Make sure the nav, navigation list and all the nav links render', () => {
        render(<Nav />);

        const navElement = screen.getByRole('navigation');
        expect(navElement).toBeInTheDocument();

        const navList = within(navElement).getByRole('list');
        expect(navList).toBeInTheDocument();

        const items = within(navList).getAllByRole('listitem');
        expect(items.length).toBe(7);

        const links = within(navList).getAllByRole('link');
        expect(links.length).toBe(7);
        expect(links[0]).toHaveTextContent(/^current season \+/i);
        expect(links[0]).toHaveAttribute('href', '/current');
        expect(links[1]).toHaveTextContent(/^downloads \+/i);
        expect(links[1]).toHaveAttribute('href', '/downloads');
        expect(links[2]).toHaveTextContent(/^constitution/i);
        expect(links[2]).toHaveAttribute('href', '/constitution');
        expect(links[3]).toHaveTextContent(/^manager directory/i);
        expect(links[3]).toHaveAttribute('href', '/directory');
        expect(links[4]).toHaveTextContent(/upcoming events/i);
        expect(links[4]).toHaveAttribute('href', '/events');
        expect(links[5]).toHaveTextContent(/message board/i);
        expect(links[5]).toHaveAttribute('href', '/board');
        expect(links[6]).toHaveTextContent(/^champions/i);
        expect(links[6]).toHaveAttribute('href', '/champions');
    });
});
