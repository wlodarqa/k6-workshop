export const options = {
  stages: [
    { duration: '30s', target: 10 },  // ramp-up:   0 → 10 VUs
    { duration: '1m',  target: 10 },  // stable:   10 VUs przez minutę
    { duration: '20s', target: 0  },  // ramp-down: 10 → 0 VUs
  ],

  thresholds: {
    http_req_failed:   ['rate<0.05'],            // < 5% błędów
    http_req_duration: ['p(95)<1000', 'p(99)<2000'],
    checks:            ['rate>0.95'],
  },
};