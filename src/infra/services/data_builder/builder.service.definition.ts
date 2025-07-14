export interface IBuilderService {
  construct(stringifiedData: string): Promise<unknown>;
}
