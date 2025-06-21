export interface IMigrationAdapter {
  ensureTracking(): Promise<void>;
  getApplied(): Promise<Set<string>>;
  executeSQL(sql: string): Promise<void>;
  markAsApplied(filename: string): Promise<void>;
  unmarkAsApplied(filename: string): Promise<void>;
  disconnect(): Promise<void>;
}
