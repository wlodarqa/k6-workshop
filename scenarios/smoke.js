export const options = {
  vus:      1,
  duration: '15s',

  thresholds: {
    http_req_failed:   ['rate<0.01'],   
    http_req_duration: ['p(95)<500'],   
    checks:            ['rate==1.0'],   
  },
};