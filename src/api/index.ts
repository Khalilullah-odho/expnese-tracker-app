import localStorage from '@/utils/localStorage';
import {ApiErrorResponse, ApiOkResponse, ApiResponse, create} from 'apisauce';

type methods = 'get' | 'post' | 'delete' | 'put';

const api = create({
  baseURL: 'http://192.168.0.249:4000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

api.addRequestTransform(request => {
  const token = localStorage.getToken();
  if (token && request.headers) {
    request.headers['token'] = token;
  }

  return request;
});

api.addAsyncResponseTransform(response => (): any => {
  if (!response.ok) {
    return Promise.reject(response.originalError);
  }

  return Promise.resolve(response);
});

const apiCall = async (method: methods, url: string, payload?: any) => {
  try {
    const response = await api[method](url, payload);
    return response as ApiResponse<{
      status: boolean;
      message: string;
      data: any;
    }>;
  } catch (error) {
    throw error;
  }
};

export default apiCall;
