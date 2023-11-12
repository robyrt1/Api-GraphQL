import { MiddlewareFn } from "type-graphql";
const colors = require('colors');

export const LoggingMiddleware: MiddlewareFn<any> = async ({ info }, next) => {
    const requestInfo = `${info.parentType.name}.${info.fieldName}`;
    process.stdout.write(colors.blue(`Received request for: ${requestInfo} | `));
    return next();
};
