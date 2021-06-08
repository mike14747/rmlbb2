import { render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom';

import Nav from '../../components/Nav';

describe('Check that the nav', () => {
    beforeEach(() => {
        render(<Nav />);
    });

    test('Check that the nav element renders', () => {
        expect(screen.getByRole('navigation')).toBeInTheDocument();
    });

    test('Check that the nav element has a list element and the correct number of items', () => {
        const listElement = screen.getByRole('list');
        const items = within(listElement).getAllByRole('listitem');
        expect(items.length).toBe(9);
    });

    test('Check that the list item links have the correct text content and href attributes', () => {
        const listElement = screen.getByRole('list');
        const links = within(listElement).getAllByRole('link');
        expect(links.length).toBe(9);
        expect(links[0]).toHaveTextContent(/^current season \+/i);
        expect(links[0]).toHaveAttribute('href', '/current');
        expect(links[1]).toHaveTextContent(/^downloads \+/i);
        expect(links[1]).toHaveAttribute('href', '/downloads');
        expect(links[2]).toHaveTextContent(/^constitution/i);
        expect(links[2]).toHaveAttribute('href', '/constitution');
        expect(links[3]).toHaveTextContent(/^manager directory/i);
        expect(links[3]).toHaveAttribute('href', '/directory');
        expect(links[4]).toHaveTextContent(/^lzp archive \+/i);
        expect(links[4]).toHaveAttribute('href', '/lzp');
        expect(links[5]).toHaveTextContent(/upcoming events/i);
        expect(links[5]).toHaveAttribute('href', '/events');
        expect(links[6]).toHaveTextContent(/message board/i);
        expect(links[6]).toHaveAttribute('href', '/board');
        expect(links[7]).toHaveTextContent(/^champions/i);
        expect(links[7]).toHaveAttribute('href', '/champions');
        expect(links[8]).toHaveTextContent(/^contact/i);
        expect(links[8]).toHaveAttribute('href', '/contact');
    });

    // test('Make sure all the nav links render', () => {
    //     const navElement = screen.getByRole('navigation');
    //     const navList = within(navElement).getByRole('list');
    //     const items = within(navList).getAllByRole('listitem');

    //     expect(items.length).toBe(9);

    //     const links = within(navList).getAllByRole('link');
    //     expect(links.length).toBe(9);
    //     expect(links[0]).toHaveTextContent(/^current season \+/i);
    //     expect(links[0]).toHaveAttribute('href', '/current');
    //     expect(links[1]).toHaveTextContent(/^downloads \+/i);
    //     expect(links[1]).toHaveAttribute('href', '/downloads');
    //     expect(links[2]).toHaveTextContent(/^constitution/i);
    //     expect(links[2]).toHaveAttribute('href', '/constitution');
    //     expect(links[3]).toHaveTextContent(/^manager directory/i);
    //     expect(links[3]).toHaveAttribute('href', '/directory');
    //     expect(links[4]).toHaveTextContent(/^lzp archive \+/i);
    //     expect(links[4]).toHaveAttribute('href', '/lzp');
    //     expect(links[5]).toHaveTextContent(/upcoming events/i);
    //     expect(links[5]).toHaveAttribute('href', '/events');
    //     expect(links[6]).toHaveTextContent(/message board/i);
    //     expect(links[6]).toHaveAttribute('href', '/board');
    //     expect(links[7]).toHaveTextContent(/^champions/i);
    //     expect(links[7]).toHaveAttribute('href', '/champions');
    //     expect(links[8]).toHaveTextContent(/^contact/i);
    //     expect(links[8]).toHaveAttribute('href', '/contact');
    // });
});
