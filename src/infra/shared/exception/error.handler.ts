function ErrorHandling(): ClassDecorator {
  return (target: Function) => {
    const prototype = target.prototype;
    const methodNames = Object.getOwnPropertyNames(prototype);

    methodNames.forEach(methodName => {
      if (typeof prototype[methodName] === 'function') {
        prototype[methodName] = applyMiddlewareToFunction(prototype[methodName]);
      }
    });
  };
}

function applyMiddlewareToFunction(func: Function): Function {
  return async function (...args: any[]) {
    try {
      return await func.apply(this, args);
    } catch (error) {
      throw new Error(error);
    }
  };
}

export default ErrorHandling;
