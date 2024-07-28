import { scheduleJob } from '../src';
import cron from 'node-cron';

// Mock job function
const mockJob = jest.fn(() => Promise.resolve());

describe('scheduleJob', () => {
    beforeAll(() => {
        jest.useFakeTimers();
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    it('should schedule a cron job successfully', () => {
        // Berikan URL sebagai argumen ketiga, bisa string kosong atau URL dummy
        const dummyUrl = 'https://example.com';

        scheduleJob('* * * * *', mockJob, dummyUrl);

        expect(mockJob).not.toHaveBeenCalled();
        jest.advanceTimersByTime(60000); // Simulate passing of one minute
        expect(mockJob).toHaveBeenCalled();
    });
});
