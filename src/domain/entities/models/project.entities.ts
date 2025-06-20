export class Project {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly user_id: string,

    // fixme: remove unknown to add Routes Entity type.
    public readonly routes: unknown[] = []
  ) {}

  static create(data: {
    id: string;
    name: string;
    user_id: string;
    routes?: unknown[];
  }) {
    return new Project(data.id, data.name, data.user_id, data.routes);
  }
}
