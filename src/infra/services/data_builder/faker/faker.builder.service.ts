import { faker } from "@faker-js/faker";
import { IBuilderService } from "../builder.service.definition";

type ConstructorField = {
  key: string;
  value: string;
};

export class FakerBuilderService implements IBuilderService {
  async construct(stringifiedData: string): Promise<unknown> {
    const parsedConstructor = JSON.parse(stringifiedData) as ConstructorField[];

    const constructorPaths = parsedConstructor.map(({ key, value }) => ({
      key,
      path: value.split("."),
    }));

    const result: Record<string, string>[] = [];
    for (let i = 0; i < 5; i++) {
      result.push(this.generateMockData(constructorPaths));
    }

    return result;
  }

  private generateMockData(
    constructorPaths: Array<{
      key: string;
      path: string[];
    }>
  ): Record<string, string> {
    const result: Record<string, string> = {};

    for (const { key, path } of constructorPaths) {
      let current: unknown = faker;

      for (const segment of path) {
        if (
          typeof current === "object" &&
          current !== null &&
          segment in current
        ) {
          current = (current as Record<string, unknown>)[segment];
        } else {
          throw new Error(`Invalid faker path: ${path.join(".")}`);
        }
      }

      result[key] =
        typeof current === "function"
          ? String((current as () => unknown)())
          : String(current);
    }

    return result;
  }
}
