import { getSomeNewsItems, getAllNewsItems } from '../lib//api/news';

describe('Make sure all the news items data functions are working', () => {
    test('Checks to see if all news items are being returned', async () => {
        const news = await getAllNewsItems();

        expect(news.length > 1).toBeTruthy();
    });
});
