import { get } from "http";

export default class HttpClient {
  constructor(baseUrl = '', defaultOptions = {}) {
    this.baseUrl = baseUrl;
    this.defaultOptions = {
      headers: { 'Content-Type': 'application/json' },
      ...defaultOptions,
    };

    // 存储拦截器
    this.interceptors = {
      request: [],
      response: [],
    };
  }

  // 添加请求拦截器
  useRequestInterceptor(interceptor) {
    this.interceptors.request.push(interceptor);
  }

  // 添加响应拦截器
  useResponseInterceptor(interceptor) {
    this.interceptors.response.push(interceptor);
  }

  // 运行拦截器
  async runInterceptors(type, initialValue, reqData, reqCustomOptions) {
    let value = initialValue;
    for (const interceptor of this.interceptors[type]) {
      value = await interceptor(value, reqData, reqCustomOptions);
    }
    return value;
  }

  async request(url, method, data = {}, customOptions = {}) {
    const fullUrl = `${this.baseUrl}${url}`;
    const options = {
      ...this.defaultOptions,
      method,
      ...customOptions,
    };
    let requestConfig = { url: fullUrl, options };
    try {
      requestConfig = await this.runInterceptors('request', requestConfig, data, customOptions);
      if ((method ?? '').toLowerCase() !== 'get' && data) {
        options.body = JSON.stringify(data ?? '');
      }
      const response = await fetch(requestConfig.url, requestConfig.options);
      let responseData = await response.json();
      responseData = await this.runInterceptors('response', responseData, data, customOptions);
      if (!response.ok) {
        throw new Error(responseData);
      }
      return responseData;
    } catch (error) {
      throw error;
    }
  }

  // GET 请求
  async get(url, params = {}, options = {}) {
    const query = new URLSearchParams(params).toString();
    const fullUrl = query ? `${url}?${query}` : url;
    return this.request(fullUrl, 'GET', null, options);
  }

  // POST 请求
  async post(url, data = {}, options = {}) {
    return this.request(url, 'POST', data, options);
  }

  // PUT 请求
  async put(url, data = {}, options = {}) {
    return this.request(url, 'PUT', data, options);
  }

  // DELETE 请求
  async delete(url, data = {}, options = {}) {
    return this.request(url, 'DELETE', data, options);
  }
}
