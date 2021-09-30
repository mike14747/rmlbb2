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
        expect(items.length).toBe(6);

        const links = within(navList).getAllByRole('link');
        expect(links.length).toBe(6);
        expect(links[0]).toHaveTextContent('Downloads');
        expect(links[0]).toHaveAttribute('href', '/downloads');
        expect(links[1]).toHaveTextContent('Constitution');
        expect(links[1]).toHaveAttribute('href', '/constitution');
        expect(links[2]).toHaveTextContent('Directory');
        expect(links[2]).toHaveAttribute('href', '/directory');
        expect(links[3]).toHaveTextContent('Events');
        expect(links[3]).toHaveAttribute('href', '/events');
        expect(links[4]).toHaveTextContent('MessageBoard');
        expect(links[4]).toHaveAttribute('href', '/board');
        expect(links[5]).toHaveTextContent('Champions');
        expect(links[5]).toHaveAttribute('href', '/champions');
    });
});
