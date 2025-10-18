import { describe, it, expect, vi, beforeEach } from 'vitest';
import { DataLoader } from './dataLoader';

describe('DataLoader', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('loads agents.json successfully', async () => {
    const mockAgents = [
      {
        id: '1',
        name: 'Test Agent',
        skills: ['customer_service', 'chat'],
      },
    ];

    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockAgents),
      } as Response)
    );

    const loader = new DataLoader();
    const agents = await loader.loadAgents();

    expect(agents).toBeDefined();
    expect(agents.length).toBeGreaterThan(0);
    expect(agents[0]).toHaveProperty('id');
    expect(agents[0]).toHaveProperty('name');
    expect(agents[0]).toHaveProperty('skills');
  });

  it('loads all demo data files in parallel', async () => {
    const mockAgents = [
      {
        id: '1',
        name: 'Test Agent',
        skills: ['customer_service'],
      },
    ];

    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockAgents),
      } as Response)
    );

    const loader = new DataLoader();
    const data = await loader.loadAllData();

    expect(data).toBeDefined();
    expect(data.agents).toBeDefined();
    expect(data.agents.length).toBeGreaterThan(0);
  });

  it('throws error when file not found', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
        status: 404,
      } as Response)
    );

    const loader = new DataLoader();
    await expect(loader.loadAgents()).rejects.toThrow('Failed to load agents');
  });
});
