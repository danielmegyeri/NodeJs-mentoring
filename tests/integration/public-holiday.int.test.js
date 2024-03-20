import { getListOfPublicHolidays, checkIfTodayIsPublicHoliday, getNextPublicHolidays } from '../../src/services/public-holidays.service';

describe('Real API calls', () => {
    jest.setTimeout(30000);

    test('getListOfPublicHolidays successfully calls API', async () => {
        const holidays = await getListOfPublicHolidays(2024, 'GB');
        expect(holidays).toBeInstanceOf(Array);
        expect(holidays).not.toHaveLength(0);
        holidays.forEach(holiday => {
            expect(holiday).toHaveProperty('name');
            expect(holiday).toHaveProperty('localName');
            expect(holiday).toHaveProperty('date');
        });
    });

    test('checkIfTodayIsPublicHoliday successfully calls API', async () => {
        const todayIsPublicHoliday = await checkIfTodayIsPublicHoliday('GB');
        expect(typeof todayIsPublicHoliday).toBe('boolean');
    });

    test('getNextPublicHolidays successfully calls API', async () => {
        const holidays = await getNextPublicHolidays('GB');
        expect(holidays).toBeInstanceOf(Array);
        expect(holidays).not.toHaveLength(0);
        holidays.forEach(holiday => {
            expect(holiday).toHaveProperty('name');
            expect(holiday).toHaveProperty('localName');
            expect(holiday).toHaveProperty('date');
        });
    });
});