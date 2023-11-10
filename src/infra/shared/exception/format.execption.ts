import { get } from 'lodash';
export const formatError = (error) => {
  return {
    message: error.message,
    code: get(error,'error.extensions.code',"UNDEFINED_ERROR"),
    path: error.path,
  };
};
