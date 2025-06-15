export class User {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly username: string,
    public readonly passwordHash: string,
    public readonly deleted_at: Date | null,
    public readonly created_at: Date,
    public readonly updated_at: Date
  ) {}

  static create(data: {
    id: string;
    email: string;
    username: string;
    passwordHash: string;
    deleted_at: Date | null;
    created_at: Date;
    updated_at: Date;
  }) {
    return new User(
      data.id,
      data.email,
      data.username,
      data.passwordHash,
      data.deleted_at,
      data.created_at,
      data.updated_at
    );
  }
}
