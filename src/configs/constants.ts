class ErrorMessage {
  NOT_FOUND(entity: string): string {
    return `${entity} does not exist yet`;
  }

  DUPLICATE_ENTRY(entity: string): string {
    return `This ${entity} is already in use`;
  }

  SERVER_ERROR(entity: string): string {
    return `Oops, something went wrong in ${entity} endpoint`;
  }
}

export = ErrorMessage;