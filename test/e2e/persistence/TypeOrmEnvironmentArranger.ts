import { DataSource } from 'typeorm';
import { EnvironmentArranger } from './EnvironmentArranger';

export class TypeOrmEnvironmentArranger implements EnvironmentArranger {
  private connection?: DataSource;

  async arrange(): Promise<void> {
    await this.createTheConnection();

    if (!this.connection) throw new Error('The connection not exists');

    await this.cleanDatabase();
  }
  async close(): Promise<void> {
    if (!this.connection) return;

    await this.connection.destroy();
  }

  private async cleanDatabase() {
    for (const entity of this.connection.entityMetadatas) {
      const respository = await this.connection.getRepository(entity.target);
      await respository.clear();
    }
  }

  private async createTheConnection() {
    const appDataSource = new DataSource({
      type: 'postgres',
      username: 'mitienda',
      password: 'password',
      port: 5432,
      host: 'localhost',
      database: 'mitienda_local',
      entities: [__dirname + '/../../../src/**/**/entities/*{.js,.ts}'],
      synchronize: true,
    });

    this.connection = await appDataSource.initialize();
  }
}
