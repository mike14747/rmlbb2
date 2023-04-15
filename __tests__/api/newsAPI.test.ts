import { getNewsItems, getAllNewsItems } from '@/lib/api/news';

describe('Make sure all the news items data functions are working', () => {
    test('Checks to see if the most recent 10 news items are being returned', async () => {
        const news = await getNewsItems(0, 11);

        expect(news?.newsItems.length === 10).toBeTruthy();
    });

    test('Checks to see if all news items are being returned', async () => {
        const news = await getAllNewsItems();

        expect(news?.newsItems.length || 0 > 10).toBeTruthy();
    });

    test('temp', () => {
        expect(1).toBe(1);
    });
});
