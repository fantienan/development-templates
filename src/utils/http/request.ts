// @ts-nocheck
import { fetch } from "whatwg-fetch";
import hash from "hash.js";
import { stringify } from "qs";
import { notification } from "antd-design-extend";
import { responseInterceptor } from "./interceptor";
import {getCookie} from "../tools"

const codeMessage = {
  200: "服务器成功返回请求的数据。",
  201: "新建或修改数据成功。",
  202: "一个请求已经进入后台排队（异步任务）。",
  204: "删除数据成功。",
  400: "发出的请求有错误，服务器没有进行新建或修改数据的操作。",
  401: "用户没有权限（令牌、用户名、密码错误）。",
  403: "用户得到授权，但是访问是被禁止的。",
  404: "发出的请求针对的是不存在的记录，服务器没有进行操作。",
  406: "请求的格式不可得。",
  410: "请求的资源被永久删除，且不会再得到的。",
  422: "当创建一个对象时，发生一个验证错误。",
  500: "服务器发生错误，请检查服务器。",
  502: "网关错误。",
  503: "服务不可用，服务器暂时过载或维护。",
  504: "网关超时。"
};

const checkStatus = response => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const errortext = codeMessage[response.status] || response.statusText;
  notification.error({
    message: `请求错误 ${response.status}: ${response.url}`,
    description: errortext
  });
  const error = new Error(errortext);
  error.name = response.status;
  error.response = response;
  throw error;
};

const cachedSave = (response, hashcode) => {
  /**
   * 将相应数据复制并保存到sessionstorage中
   * 支持json
   */
  const contentType = response.headers.get("Content-Type");
  if (contentType && contentType.match(/application\/json/i)) {
    // 将所有数据保存为文本
    response
      .clone()
      .text()
      .then(content => {
        sessionStorage.setItem(hashcode, content);
        sessionStorage.setItem(`${hashcode}:timestamp`, Date.now());
      });
  }
  return response;
};

/**
 * 主请求函数，返回一个promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [option] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(option) {
  let { url } = option;
  const token = localStorage.getItem("token") || getCookie().token ||""
  const options = {
    ...option
  };
  /**
   * 基于URL和parameters生成一个指纹fingerprints
   */
  const fingerprint = url + (options.body ? stringify(options.body) : "");
  const hashcode = hash
    .sha256()
    .update(fingerprint)
    .digest("hex");

  const defaultOptions = {
    // credentials: 'include',
  };
  const newOptions = { ...defaultOptions, ...options };

  // 判断是否为GET请求
  if (newOptions.method === "GET") {
    newOptions.headers = {
      // Accept: "application/json",
      // "Content-Type": "application/json",
    };
    const { body } = newOptions;
    /* eslint-disable-next-line */
    const pattern = /\{[^\}\/]*\}/g
    if (pattern.test(url)) {
      Object.keys(body).forEach(key => {
        url = url.replace(`{${key}}`, body[key])
      })
    } else {
      url = body ? `${url}${stringify(body) ? `?${stringify(body)}` : ""}` : url;
    }
    delete newOptions.body;
  }
  if (
    newOptions.method === "POST" ||
    newOptions.method === "PUT" ||
    newOptions.method === "DELETE"
  ) {
    if (!(newOptions.body instanceof FormData)) {
      newOptions.headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
        token,
        ...newOptions.headers
      };
      newOptions.body = JSON.stringify(newOptions.body);
    } else {
      // newOptions.body is FormData
      newOptions.headers = {
        Accept: "application/json",
        token,
        ...newOptions.headers
      };
    }
  }

  const expirys = options.expirys && 60;
  // options.expirys !== false, return the cache,
  if (options.expirys !== false) {
    const cached = sessionStorage.getItem(hashcode);
    const whenCached = sessionStorage.getItem(`${hashcode}:timestamp`);
    if (cached !== null && whenCached !== null) {
      const age = (Date.now() - whenCached) / 1000;
      if (age < expirys) {
        const response = new Response(new Blob([cached]));
        return response.json();
      }
      sessionStorage.removeItem(hashcode);
      sessionStorage.removeItem(`${hashcode}:timestamp`);
    }
  }


  return fetch(url, newOptions)
    .then(checkStatus)
    .then(response => cachedSave(response, hashcode))
    .then(response => {
      // 当请求方法是DELETE 或状态码为 204 时默认不返回数据
      // 如果使用.json会报错
      if (newOptions.method === "DELETE" || response.status === 204) {
        return response.text();
      }
      return response.json();
    })
    .then(response => responseInterceptor(response))
    .catch(e => {
      if (e.name) {
        return Promise.reject({
          code: e.name,
          msg: `${e.name}: ${e.message}`
        })
      }
      console.error(e)
    });
}
