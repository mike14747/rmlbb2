import { getSomeNewsItems, getAllNewsItems } from '../../lib/api/news';

describe('Make sure all the news items data functions are working', () => {
    test('Checks to see if the most recent 10 news items are being returned', async () => {
        const news = await getSomeNewsItems();

        expect(news.length === 10).toBeTruthy();
    });

    test('Checks to see if all news items are being returned', async () => {
        const news = await getAllNewsItems();

        expect(news.length > 10).toBeTruthy();
    });
});
