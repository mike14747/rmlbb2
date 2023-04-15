import { render, screen } from '@testing-library/react';

import Footer from '@/components/Footer';

const contactEmail = 'test@test.com';
const links = [
    {
        url: 'https://www.baseballamerica.com',
        name: 'Baseball America',
    },
    {
        url: 'https://www.fangraphs.com/',
        name: 'FanGraphs',
    },
];

test('Check that the footer renders the proper info', () => {
    render(<Footer contactEmail={contactEmail} links={links} />);

    expect(screen.getByRole('contentinfo')).toHaveTextContent(/^© 2015 RML Baseball$/i);

    // test more things... contact email, link, etc
});
