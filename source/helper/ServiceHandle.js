/* eslint-disable no-param-reassign */
import { create } from 'apisauce';
import { Consts } from 'utilities/index';
import { Storage } from 'lib';

const moment = require('moment');

const api = create({
  baseURL: Consts.SERVICE.BASE_URL,
  timeout: 20000
});
const apiFCM = create({
  baseURL: 'https://fcm.googleapis.com/fcm/send',
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
    Authorization:
      'key=AAAAQntYK-4:APA91bELUalmFBisl0IRByQa7uNHOI4Ma__jKLdFdLAyiuMJKUCoMxL4dUWJBs7YLAq2NhsmISkcYXc85FBiyVa9EniAMxCiMpvvtTRXSYLLylPXruvbywcVfeURUEcd90jDJ9Spl6op'
  }
});

const apiBaokim = create({
  baseURL: Consts.BAOKIM_URL,
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// export function  get = async (url,params) => {
//     const response = await api.get(url,params);
//     // logic handle response here
//     return response;
// }
//
// export function post = async (url,payload) => {
//     const response = await api.post(url,payload);
//     // logic handle response here
//     return response;
// }
//
// export function  put = async (url,payload) => {
//     const response = await api.put(url,payload);
//     // logic handle response here
//     return response;
// }

export async function sendFCMMessage(tokens, body, title, data) {
  const params = {
    registration_ids: tokens,
    priority: 'high',
    content_available: true,
    notification: {
      body,
      title
    },
    data,
    collapse_key: 'type_a'
  };
  const response = await apiFCM.post('https://fcm.googleapis.com/fcm/send', params);
  console.log('FCM ======>', response);
}

function returnData(response) {
  console.log('===>>', response);

  if (
    (response.data && response.data.content) ||
    !response.ok ||
    response.data === 'The request timed out.'
  ) {
    response.data.error = true;
    return response.data;
  }
  if (!response.data && (response.status == 204 || response.status == 200)) {
    response.data = {
      suscess: true
    };
    return response.data;
  }
  return response.data;
}

async function updateURLAuthen(url) {
  const accessToken = await Storage.get(Consts.STORAGE.USER_ACCESSTOKEN);
  if (!accessToken.error) {
    if (url.indexOf('?') !== -1) {
      url = `${url}&access_token=${accessToken}`;
    } else {
      url = `${url}?access_token=${accessToken}`;
    }
  }
  console.log('===>> URL', url, accessToken);
  return url;
}

export async function get(url, params) {
  const response = await api.get(await updateURLAuthen(url), params);
  // logic handle response here
  return returnData(response);
}

export async function post(url, payload) {
  const response = await api.post(await updateURLAuthen(url), payload);
  // logic handle response here
  return returnData(response);
}

export async function put(url, payload) {
  const response = await api.put(await updateURLAuthen(url), payload);
  // logic handle response here
  return returnData(response);
}

export async function patch(url, payload) {
  const response = await api.patch(await updateURLAuthen(url), payload);
  // logic handle response here
  return returnData(response);
}

export async function deleteAction(url, payload) {
  const response = await api.delete(await updateURLAuthen(url), payload);
  // logic handle response here
  return returnData(response);
}

export async function uploadVideo(video) {
  console.log('VIDEO', video);
  const vimeoBaseUrl =
    'https://1512435599.cloud.vimeo.com/upload?ticket_id=232399494&video_file_id=1343595156&signature=585b12681ef811fe61cc4bc681855866&v6=1&redirect_url=https%3A%2F%2Fvimeo.com%2Fupload%2Fapi%3Fvideo_file_id%3D1343595156%26app_id%3D145453%26ticket_id%3D232399494%26signature%3D4bd7d79f473a6e36c464a59325645dcdae929c6f';
  const apiUpload = create({
    baseURL: 'https://api.vimeo.com',
    headers: {
      Authorization: `bearer d8691862b6fc6b1cfce242433171f7e4`,
      'Content-Type': `multipart/form-data`,
      'Content-Length': video.size
    }
  });
  const form = new FormData();
  form.append('file_data', {
    name: `video12321`,
    uri: video.path,
    type: video.mime
  });
  const uploadVideoResponse = await apiUpload.post(vimeoBaseUrl, form);
  console.log('UPLOAD VIDEO', uploadVideoResponse);
}

export async function getBaokim(url, data) {
  const response = await apiBaokim.get(url, data);
  // logic handle response here
  return response;
}

// Generate Query
export function queryGenerate(params, include) {
  const queryParams = {
    where: {
      ...params,
      active: {
        gt: 0
      }
    },
    include
  };
  return `/?filter=${JSON.stringify(queryParams)}`;
}
