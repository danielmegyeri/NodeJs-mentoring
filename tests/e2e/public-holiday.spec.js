const request = require('supertest');

describe('Nager date API', () => {
    const baseURL = 'https://date.nager.at';

    it('should return public holidays for the current year for a country', async () => {
        const response = await request(baseURL)
            .get(`/api/v3/PublicHolidays/2024/GB`);

        expect(response.statusCode).toBe(200);
        expect(response.body).not.toBeNull();
        expect(response.body).toBeInstanceOf(Array);
        response.body.forEach(holiday => {
            expect(holiday).toHaveProperty('date');
            expect(holiday).toHaveProperty('localName');
            expect(holiday).toHaveProperty('name');
        });
    });

    it('should check if today is a public holiday for a country', async () => {
        const response = await request(baseURL)
            .get(`/api/v3/IsTodayPublicHoliday/GB`)
            .set('Accept', 'application/json');

        expect(response.statusCode).toBe(204); //200, ha ma holiday van, 204, ha nem
        expect(response.body).not.toBeNull();
        expect(typeof response.body).toEqual('object');
    });
});