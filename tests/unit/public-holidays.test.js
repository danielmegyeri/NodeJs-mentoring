import axios from 'axios';
import { getListOfPublicHolidays, checkIfTodayIsPublicHoliday, getNextPublicHolidays } from '../../src/services/public-holidays.service';
import { validateInput, shortenPublicHoliday } from '../../src/helpers';
import { PUBLIC_HOLIDAYS_API_URL } from '../../src/config';

const spy = jest.spyOn(axios, 'get');
const mockList = [
    {
        name: "New Year's Day",
        localName: "New Year's Day",
        date: '2024-01-01'
    },
    {
        name: "New Year's Day",
        localName: "New Year's Day",
        date: '2024-01-01'
    },
    {
        name: "New Year's Day",
        localName: "New Year's Day",
        date: '2024-01-01'
    },
    { name: '2 January', localName: '2 January', date: '2024-01-02' },
    {
        name: "Saint Patrick's Day",
        localName: "Saint Patrick's Day",
        date: '2024-03-17'
    },
    { name: 'Good Friday', localName: 'Good Friday', date: '2024-03-29' },
    {
        name: 'Easter Monday',
        localName: 'Easter Monday',
        date: '2024-04-01'
    },
    {
        name: 'Early May Bank Holiday',
        localName: 'Early May Bank Holiday',
        date: '2024-05-06'
    },
    {
        name: 'Spring Bank Holiday',
        localName: 'Spring Bank Holiday',
        date: '2024-05-27'
    },
    {
        name: 'Battle of the Boyne',
        localName: 'Battle of the Boyne',
        date: '2024-07-12'
    },
    {
        name: 'Summer Bank Holiday',
        localName: 'Summer Bank Holiday',
        date: '2024-08-05'
    },
    {
        name: 'Summer Bank Holiday',
        localName: 'Summer Bank Holiday',
        date: '2024-08-26'
    },
    {
        name: "Saint Andrew's Day",
        localName: "Saint Andrew's Day",
        date: '2024-11-30'
    },
    {
        name: 'Christmas Day',
        localName: 'Christmas Day',
        date: '2024-12-25'
    },
    {
        name: "St. Stephen's Day",
        localName: 'Boxing Day',
        date: '2024-12-26'
    }
];

const mockNextHolidaysList = [
    { name: 'Good Friday', localName: 'Good Friday', date: '2024-03-29' },
    {
        name: 'Easter Monday',
        localName: 'Easter Monday',
        date: '2024-04-01'
    },
    {
        name: 'Early May Bank Holiday',
        localName: 'Early May Bank Holiday',
        date: '2024-05-06'
    },
    {
        name: 'Spring Bank Holiday',
        localName: 'Spring Bank Holiday',
        date: '2024-05-27'
    },
    {
        name: 'Battle of the Boyne',
        localName: 'Battle of the Boyne',
        date: '2024-07-12'
    },
    {
        name: 'Summer Bank Holiday',
        localName: 'Summer Bank Holiday',
        date: '2024-08-05'
    },
    {
        name: 'Summer Bank Holiday',
        localName: 'Summer Bank Holiday',
        date: '2024-08-26'
    },
    {
        name: "Saint Andrew's Day",
        localName: "Saint Andrew's Day",
        date: '2024-11-30'
    },
    {
        name: 'Christmas Day',
        localName: 'Christmas Day',
        date: '2024-12-25'
    },
    {
        name: "St. Stephen's Day",
        localName: 'Boxing Day',
        date: '2024-12-26'
    },
    {
        name: "New Year's Day",
        localName: "New Year's Day",
        date: '2025-01-01'
    },
    {
        name: "New Year's Day",
        localName: "New Year's Day",
        date: '2025-01-01'
    },
    {
        name: "New Year's Day",
        localName: "New Year's Day",
        date: '2025-01-01'
    },
    { name: '2 January', localName: '2 January', date: '2025-01-02' },
    {
        name: "Saint Patrick's Day",
        localName: "Saint Patrick's Day",
        date: '2025-03-17'
    }
];

afterEach(() => {
    jest.clearAllMocks();
});

describe('getListOfPublicHolidays', () => {
    it('fetches list of public holidays successfully', async () => {
        const result = await getListOfPublicHolidays(2024, 'GB');
        spy.mockResolvedValue(mockList);
        expect(result).toBeDefined();
        expect(result).toEqual(mockList);
        expect(spy).toHaveBeenCalledWith(`${PUBLIC_HOLIDAYS_API_URL}/PublicHolidays/2024/GB`);
    });

    it('returns an empty array on error', async () => {
        spy.mockRejectedValue(new Error());

        const result = await getListOfPublicHolidays(2024, 'GB');
        expect(result).toEqual([]);
    });
});

describe('checkIfTodayIsPublicHoliday', () => {
    it('checks if today is a public holiday successfully', async () => {
        spy.mockResolvedValue(mockList);

        const result = await checkIfTodayIsPublicHoliday('GB');
        expect(result).toBe(false);
        expect(spy).toHaveBeenCalledWith(`${PUBLIC_HOLIDAYS_API_URL}/IsTodayPublicHoliday/GB`);
    });

    it('returns false on error', async () => {
        jest.spyOn(axios, 'get').mockRejectedValue(new Error());
        const result = await checkIfTodayIsPublicHoliday('GB');
        expect(result).toBe(false);
    });
});

describe('getNextPublicHolidays', () => {
    it('fetches next public holidays successfully', async () => {
        const result = await getNextPublicHolidays('GB');
        spy.mockResolvedValue(mockNextHolidaysList);
        expect(result).toEqual(mockNextHolidaysList);
        expect(spy).toHaveBeenCalledWith(`${PUBLIC_HOLIDAYS_API_URL}/NextPublicHolidays/GB`);
    });

    it('returns an empty array on error', async () => {
        spy.mockRejectedValue(new Error());
        const result = await getNextPublicHolidays('GB');
        expect(result).toEqual([]);
    });
});

describe('validateInput', () => {
    it('should accept valid input', () => {
        expect(validateInput({ country: 'GB', year: new Date().getFullYear() })).toBe(true);
    });

    it('should reject unsupported country', () => {
        expect(() => validateInput({ country: 'HU' })).toThrowError(/Country provided is not supported/);
    });

    it('should reject invalid year', () => {
        expect(() => validateInput({ year: 1999 })).toThrowError(/Year provided not the current/);
    });
});

describe('shortenPublicHoliday', () => {
    it('should shorten correctly', () => {
        const fullHoliday = mockList[0];

        const shortenedHoliday = shortenPublicHoliday(fullHoliday);

        const expectedShortHoliday = {
            name: 'New Year\'s Day',
            localName: 'New Year\'s Day',
            date: '2024-01-01',
        }

        expect(shortenedHoliday).toEqual(expectedShortHoliday);
    });
});
