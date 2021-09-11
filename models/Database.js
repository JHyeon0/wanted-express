class Database {
  constructor(database){
    this.db = database;
  }

  // prisma에서 $queryRaw는 tagged template literal을 사용하고 있습니다.
  async queryRaw(strings, ...values) {
    return await this.db.$queryRaw(strings, ...values);
  }
}

export default Database;