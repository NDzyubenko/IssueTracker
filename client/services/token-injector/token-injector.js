import { CALL_API } from 'redux-api-middleware';

export const tokenInjector = () => next => (action) => {
  const callApi = action[CALL_API];

  if (callApi) {
    if (!callApi.headers || !callApi.headers.Authorization) {
      const tokenStorage = JSON.parse(sessionStorage.getItem('token'));
      if (tokenStorage) {
        const { token } = tokenStorage;
        callApi.headers = {
          ...callApi.headers,
          Authorization: token,
        };
      }
    }
  }

  return next(action);
};
