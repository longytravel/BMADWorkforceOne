export interface Agent {
  id: string;
  name: string;
  skills: string[];
}

export interface DemoData {
  agents: Agent[];
}

export class DataLoader {
  private basePath = '/demo-data';

  async loadAgents(): Promise<Agent[]> {
    const response = await fetch(`${this.basePath}/agents.json`);

    if (!response.ok) {
      throw new Error('Failed to load agents');
    }

    return response.json();
  }

  async loadAllData(): Promise<DemoData> {
    const [agents] = await Promise.all([this.loadAgents()]);

    return {
      agents,
    };
  }
}
