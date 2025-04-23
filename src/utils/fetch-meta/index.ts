enum AjaxMethod { // 请求方法
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}
type AjaxMethodType = typeof AjaxMethod; // "GET" | "POST" | "PUT" | "DELETE"
enum AjaxStep { // 拦截器类型
  REQUEST = 'request',
  RESPONSE = 'response',
}
type InterceptorType =  AjaxStep.REQUEST | AjaxStep.RESPONSE; // "request" | "response";
type Interceptor<T, K extends T> = (value: T, reqData: any, reqCustomOptions: any) => Promise<K>;
export type { AjaxMethodType, Interceptor, InterceptorType };
export { AjaxMethod };

export default class HttpClient {
  private baseUrl: string;
  private defaultOptions: RequestInit;
  private interceptors: Record<InterceptorType, Array<Interceptor<any, any>>>; // 拦截器存储
  constructor(baseUrl = '', defaultOptions = {}) {
    this.baseUrl = baseUrl;
    this.defaultOptions = {
      headers: { 'Content-Type': 'application/json' },
      ...defaultOptions,
    };

    // 存储拦截器
    this.interceptors = {
      'request': [],
      'response': [],
    };
  }

  // 添加请求拦截器
  useRequestInterceptor(interceptor: Interceptor<any, any>) {
    this.interceptors.request.push(interceptor);
  }

  // 添加响应拦截器
  useResponseInterceptor(interceptor: Interceptor<any, any>) {
    this.interceptors.response.push(interceptor);
  }

  // 运行拦截器
  async runInterceptors(type: InterceptorType, initialValue: Awaited<ReturnType<Interceptor<any, any>>>, reqData: any, reqCustomOptions: any) {
    let value = initialValue;
    for (const interceptor of this.interceptors[type]) {
      value = await interceptor(value, reqData, reqCustomOptions);
    }
    return value;
  }

  async request(url: string, method: AjaxMethod, data: object|null = {}, customOptions = {}) {
    const fullUrl = url.startsWith('http') ? url : `${this.baseUrl}${url}`;
    const options = {
      ...this.defaultOptions,
      method,
      ...customOptions,
    };
    let requestConfig = { url: fullUrl, options };
    try {
      requestConfig = await this.runInterceptors(AjaxStep.REQUEST, requestConfig, data, customOptions);
      if ((method ?? '').toLowerCase() !== 'get' && data) {
        options.body = JSON.stringify(data ?? '');
      }
      const response = await fetch(requestConfig.url, requestConfig.options);
      let responseData = await response.json();
      responseData = await this.runInterceptors(AjaxStep.RESPONSE, responseData, data, customOptions);
      if (!response.ok) {
        throw new Error(responseData);
      }
      return responseData;
    } catch (error) {
      throw error;
    }
  }

  // GET 请求
  async get(url: string, params = {}, options = {}) {
    const query = new URLSearchParams(params).toString();
    const fullUrl = query ? `${url}?${query}` : url;
    return this.request(fullUrl, AjaxMethod.GET, null, options);
  }

  // POST 请求
  async post(url: string, data = {}, options = {}) {
    return this.request(url, AjaxMethod.POST, data, options);
  }

  // PUT 请求
  async put(url: string, data = {}, options = {}) {
    return this.request(url, AjaxMethod.PUT, data, options);
  }

  // DELETE 请求
  async delete(url: string, data = {}, options = {}) {
    return this.request(url, AjaxMethod.DELETE, data, options);
  }
}
