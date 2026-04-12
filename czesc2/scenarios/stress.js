export const options = {
  stages: [
    { duration: '15s', target: 10  },  
    { duration: '15s', target: 10  },  
    { duration: '20s', target: 25  },  
    { duration: '20s', target: 25  },  
    { duration: '20s', target: 50  },  
    { duration: '20s', target: 50  },  
    { duration: '30s', target: 0   },  
  ],

  thresholds: {
    http_req_failed:   ['rate<0.20'],
    http_req_duration: ['p(95)<3000'],
  },
};