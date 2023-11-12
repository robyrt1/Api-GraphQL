const colors = require("colors");
export const logginPlugin = {
  async requestDidStart(requestContext) {
    const log = `Received request for:[${
      requestContext.request.http.method
    }] - ${requestContext.request.operationName} ${new Date().toISOString()}`;
    console.log(colors.blue(log));

    return;
  },
};
