export = {
    NOT_FOUND: (entity: string) => `${entity} does not exist yet`,
    DUPLICATE_ENTRY: (entity: string) => `This ${entity} is already in use`,
    SERVER_ERROR: (entity: string) => `Oops, something went wrong in ${entity} endpoint`,
  };
  