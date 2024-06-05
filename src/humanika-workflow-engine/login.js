import { sleep, group, check } from 'k6'
import http from 'k6/http'

export const options = {
  cloud: {
    distribution: { 'amazon:us:ashburn': { loadZone: 'amazon:us:ashburn', percent: 100 } },
    apm: [],
    name: 'Humanika Workflow Engine'
  },
  thresholds: {},
  scenarios: {
    user_login: {
      executor: 'ramping-vus',
      gracefulStop: '30s',
      stages: [
        { target: 1, duration: '30s' },
        // { target: 1, duration: '30s' },
        // { target: 0, duration: '30s' },
      ],
      gracefulRampDown: '30s',
      exec: 'user_login',
    },
    // user_logout: {
    //     executor: 'ramping-vus',
    //     gracefulStop: '30s',
    //     stages: [
    //       { target: 20, duration: '1m' },
    //       { target: 20, duration: '3m30s' },
    //       { target: 0, duration: '1m' },
    //     ],
    //     gracefulRampDown: '30s',
    //     exec: 'user_logout',
    //   },
  },
}

export function user_login() {
  let response

  group(`PAGE LOGIN - ${__ENV.HOST}/login`, function () {
    // login
    response = http.get(`${__ENV.HOST}/login`, {
      headers: {
        'upgrade-insecure-requests': '1',
        'sec-ch-ua': '"Microsoft Edge";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
      },
      tags: {
        "name": "OPEN WEB WORKFLOW"
      }
    })
    sleep(13.2)

    // user login
    response = http.post(
      __ENV.HOST_GATEWAY,
      `{"operationName":"Login","variables":{"input":{"client_id":"660254c916c4219b5226fc8d","application_id":"66388e99f141061e3f4cb32f","username":"${__ENV.USERNAME}", "password":"${__ENV.PASSWORD}"}},"query":"mutation Login($input: LoginInput!) {\\n  login(input: $input) {\\n    access_token\\n    expires_in\\n    refresh_token\\n    scope\\n    token_type\\n  }\\n}"}`,
      {
        headers: {
          accept: 'application/json, text/plain, */*',
          'content-type': 'application/json',
          'sec-ch-ua': '"Microsoft Edge";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
        tags: {
          "name": "LOGIN WITH USERNAME AND PASSWORD"
        }
      }
    )
    // console.log('ACCESS TOKEN NEW LOGIN : ' + result.data.login.access_token);

    const accessToken = (JSON.parse(response.body.toString())).data.login.access_token;

    response = http.options(__ENV.HOST_GATEWAY, null, {
      headers: {
        accept: '*/*',
        'access-control-request-headers': 'content-type',
        'access-control-request-method': 'POST',
        origin: __ENV.HOST,
        'sec-fetch-mode': 'cors',
      },
    })

    sleep(0.5)

    response = http.post(
      __ENV.HOST_GATEWAY,
      `{"operationName":"GetAccountInfo","variables":{"access_token":"${accessToken}"},"query":"query GetAccountInfo($access_token: String!) {\\n  getAccountInfo(access_token: $access_token) {\\n    fullname\\n    email\\n  }\\n}"}`,
      {
        headers: {
          accept: 'application/json, text/plain, */*',
          'content-type': 'application/json',
          'sec-ch-ua': '"Microsoft Edge";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
        tags: {
          "name": "GET ACCOUNT INFO"
        }
      },
    )
    const resp = JSON.parse(response.request.body);
    console.log('GET ACCOUNT INFO 1 : '+ resp.operationName + ' \n ACCESS TOKEN : ' + resp.variables.access_token);
    
    const resBody = JSON.parse(response.body.toString());
    console.log('RESPONSE BODY : ' + resBody.data.getAccountInfo);

    response = http.post(
      __ENV.HOST_GATEWAY,
      `{"operationName":"GetAccountInfo","variables":{"access_token":"${accessToken}"},"query":"query GetAccountInfo($access_token: String!) {\\n  getAccountInfo(access_token: $access_token) {\\n    fullname\\n    email\\n  }\\n}"}`,
      {
        headers: {
          accept: 'application/json, text/plain, */*',
          'content-type': 'application/json',
          'sec-ch-ua': '"Microsoft Edge";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
        tags: {
          "name": "GET ACCOUNT INFO 2"
        }
      }
    )

    const resp1 = JSON.parse(response.request.body);
    console.log('GET ACCOUNT INFO 2 : '+ resp1.operationName + ' \n ACCESS TOKEN : ' + resp1.variables.access_token);
    const resBody1 = JSON.parse(response.body.toString());
    console.log('RESPONSE BODY 1: ' + resBody1.data.getAccountInfo);

    response = http.post(
      __ENV.HOST_GATEWAY,
      `{"operationName":"GetAccountInfo","variables":{"access_token":"${accessToken}"},"query":"query GetAccountInfo($access_token: String!) {\\n  getAccountInfo(access_token: $access_token) {\\n    fullname\\n    email\\n  }\\n}"}`,
      {
        headers: {
          accept: 'application/json, text/plain, */*',
          'content-type': 'application/json',
          'sec-ch-ua': '"Microsoft Edge";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
        tags: {
          "name": "GET ACCOUNT INFO 3"
        }
      }
    )

    const resp2 = JSON.parse(response.request.body);
    const resBody2 = JSON.parse(response.body.toString());
    console.log('RESPONSE BODY 2: ' + resBody2.data.getAccountInfo);

    console.log('GET ACCOUNT INFO 3 : '+ resp2.operationName + ' \n ACCESS TOKEN : ' + resp2.variables.access_token);

    response = http.post(
      __ENV.HOST_GATEWAY,
      `{"operationName":"GetAccountInfo","variables":{"access_token":"${accessToken}"},"query":"query GetAccountInfo($access_token: String!) {\\n  getAccountInfo(access_token: $access_token) {\\n    fullname\\n    email\\n  }\\n}"}`,
      {
        headers: {
          accept: 'application/json, text/plain, */*',
          'content-type': 'application/json',
          'sec-ch-ua': '"Microsoft Edge";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
        tags: {
          "name": "GET ACCOUNT INFO 4"
        }
      }
    )
    const resp3 = JSON.parse(response.request.body);
    console.log('GET ACCOUNT INFO 4 : '+ resp3.operationName + ' \n ACCESS TOKEN : ' + resp3.variables.access_token);
    const resBody3 = JSON.parse(response.body.toString());
    console.log('RESPONSE BODY 4: ' + JSON.stringify(resBody3.data.getAccountInfo));
  })

  // group(`PAGE ACCOUNT LIST - ${__ENV.HOST}/pages/auth/account/list`, function () {
    response = http.post(
      __ENV.HOST_GATEWAY,
      `{"operationName":"lookupService","variables":{"param":{"key":"ACCOUNT-STATUS"}},"query":"query lookupService($param: LookupFilterInput!) {\\n  getLookupFilter(params: $param) {\\n    value\\n    label\\n  }\\n}"}`,
      {
        headers: {
          accept: 'application/json, text/plain, */*',
          'content-type': 'application/json',
          'sec-ch-ua': '"Microsoft Edge";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )

  //   response = http.post(
  //     __ENV.HOST_GATEWAY,
  //     `{"operationName":"getAccountPage","variables":{"params":{"search":"","status":"","page":1,"offset":5}},"query":"query getAccountPage($params: AccountFilterInput) {\\n  getAccountPage(params: $params) {\\n    data {\\n      _id\\n      fullname\\n      username\\n      account_id\\n      nik\\n      email\\n      phone\\n      password\\n      status\\n      applications {\\n        application {\\n          _id\\n          name\\n        }\\n        group\\n      }\\n      refresh_token\\n    }\\n    paging {\\n      page\\n      rowsPerpage\\n      totalPages\\n      totalRows\\n    }\\n  }\\n}"}`,
  //     {
  //       headers: {
  //         accept: 'application/json, text/plain, */*',
  //         'content-type': 'application/json',
  //         'sec-ch-ua': '"Microsoft Edge";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
  //         'sec-ch-ua-mobile': '?0',
  //         'sec-ch-ua-platform': '"Windows"',
  //       },
  //     }
  //   )W
  // })
}


export function user_logout() {
    let response
  
    group(`page_1 - ${__ENV.HOST}/pages/auth/account/list`, function () {
      response = http.get(`${__ENV.HOST}/pages/auth/account/list`, {
        headers: {
          'upgrade-insecure-requests': '1',
          'sec-ch-ua': '"Microsoft Edge";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      })
      sleep(0.8)
  
      response = http.post(
        __ENV.HOST_GATEWAY,
        `{"operationName":"GetAccountInfo","variables":{"access_token":"${accessToken}"},"query":"query GetAccountInfo($access_token: String!) {\\n  getAccountInfo(access_token: $access_token) {\\n    fullname\\n    email\\n  }\\n}"}`,
        {
          headers: {
            accept: 'application/json, text/plain, */*',
            'content-type': 'application/json',
            'sec-ch-ua': '"Microsoft Edge";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
          },
        }
      )
  
      response = http.options(__ENV.HOST_GATEWAY, null, {
        headers: {
          accept: '*/*',
          'access-control-request-headers': 'content-type',
          'access-control-request-method': 'POST',
          origin: __ENV.HOST,
          'sec-fetch-mode': 'cors',
        },
      })
  
      response = http.post(
        __ENV.HOST_GATEWAY,
        `{"operationName":"GetAccountInfo","variables":{"access_token":"${accessToken}"},"query":"query GetAccountInfo($access_token: String!) {\\n  getAccountInfo(access_token: $access_token) {\\n    fullname\\n    email\\n  }\\n}"}`,
        {
          headers: {
            accept: 'application/json, text/plain, */*',
            'content-type': 'application/json',
            'sec-ch-ua': '"Microsoft Edge";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
          },
        }
      )
  
      response = http.post(
        __ENV.HOST_GATEWAY,
        `{"operationName":"GetAccountInfo","variables":{"access_token":"${accessToken}"},"query":"query GetAccountInfo($access_token: String!) {\\n  getAccountInfo(access_token: $access_token) {\\n    fullname\\n    email\\n  }\\n}"}`,
        {
          headers: {
            accept: 'application/json, text/plain, */*',
            'content-type': 'application/json',
            'sec-ch-ua': '"Microsoft Edge";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
          },
        }
      )
  
      response = http.post(
        __ENV.HOST_GATEWAY,
        `{"operationName":"GetAccountInfo","variables":{"access_token":"${accessToken}"},"query":"query GetAccountInfo($access_token: String!) {\\n  getAccountInfo(access_token: $access_token) {\\n    fullname\\n    email\\n  }\\n}"}`,
        {
          headers: {
            accept: 'application/json, text/plain, */*',
            'content-type': 'application/json',
            'sec-ch-ua': '"Microsoft Edge";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
          },
        }
      )
  
      response = http.post(
        __ENV.HOST_GATEWAY,
        `{"operationName":"lookupService","variables":{"param":{"key":"ACCOUNT-STATUS"}},"query":"query lookupService($param: LookupFilterInput!) {\\n  getLookupFilter(params: $param) {\\n    value\\n    label\\n  }\\n}"}`,
        {
          headers: {
            accept: 'application/json, text/plain, */*',
            'content-type': 'application/json',
            'sec-ch-ua': '"Microsoft Edge";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
          },
        }
      )
  
      response = http.post(
        __ENV.HOST_GATEWAY,
        `{"operationName":"getAccountPage","variables":{"params":{"search":"","status":"","page":1,"offset":5}},"query":"query getAccountPage($params: AccountFilterInput) {\\n  getAccountPage(params: $params) {\\n    data {\\n      _id\\n      fullname\\n      username\\n      account_id\\n      nik\\n      email\\n      phone\\n      password\\n      status\\n      applications {\\n        application {\\n          _id\\n          name\\n        }\\n        group\\n      }\\n      refresh_token\\n    }\\n    paging {\\n      page\\n      rowsPerpage\\n      totalPages\\n      totalRows\\n    }\\n  }\\n}"}`,
        {
          headers: {
            accept: 'application/json, text/plain, */*',
            'content-type': 'application/json',
            'sec-ch-ua': '"Microsoft Edge";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
          },
        }
      )
      sleep(3.1)
  
      response = http.post(
        __ENV.HOST_GATEWAY,
        `{"operationName":"GetAccountInfo","variables":{"access_token":"${accessToken}"},"query":"query GetAccountInfo($access_token: String!) {\\n  getAccountInfo(access_token: $access_token) {\\n    fullname\\n    email\\n  }\\n}"}`,
        {
          headers: {
            accept: 'application/json, text/plain, */*',
            'content-type': 'application/json',
            'sec-ch-ua': '"Microsoft Edge";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
          },
        }
      )
  
      response = http.post(
        __ENV.HOST_GATEWAY,
        `{"operationName":"GetAccountInfo","variables":{"access_token":"${accessToken}"},"query":"query GetAccountInfo($access_token: String!) {\\n  getAccountInfo(access_token: $access_token) {\\n    fullname\\n    email\\n  }\\n}"}`,
        {
          headers: {
            accept: 'application/json, text/plain, */*',
            'content-type': 'application/json',
            'sec-ch-ua': '"Microsoft Edge";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
          },
        }
      )
      sleep(4.9)
    })
  
    group(`page_2 - ${__ENV.HOST}/pages/profile`, function () {
      response = http.post(
        __ENV.HOST_GATEWAY,
        `{"operationName":"Logout","variables":{"input":{"client_id":"660254c916c4219b5226fc8d","access_token":"${accessToken}"}},"query":"mutation Logout($input: LogoutInput!) {\\n  logout(input: $input)\\n}"}`,
        {
          headers: {
            accept: 'application/json, text/plain, */*',
            'content-type': 'application/json',
            'sec-ch-ua': '"Microsoft Edge";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
          },
        }
      )
  
      response = http.options(__ENV.HOST_GATEWAY, null, {
        headers: {
          accept: '*/*',
          'access-control-request-headers': 'content-type',
          'access-control-request-method': 'POST',
          origin: __ENV.HOST,
          'sec-fetch-mode': 'cors',
        },
      })
    })
}