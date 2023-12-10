import { vi } from 'vitest';

export const getMockRequests = (response: object = {}) => vi.fn(() => (response));
