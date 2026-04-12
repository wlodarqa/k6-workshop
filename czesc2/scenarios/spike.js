export const options = {
  stages: [
    { duration: '15s', target: 5  },  // normalny ruch
    { duration: '10s', target: 5  },  // stabilizacja
    { duration: '5s',  target: 60 },  // SPIKE! nagły wzrost
    { duration: '20s', target: 60 },  // szczyt – jak długo wytrzyma?
    { duration: '5s',  target: 5  },  // gwałtowny spadek
    { duration: '25s', target: 5  },  // recovery – czy wróciło do normy?
    { duration: '5s',  target: 0  },
  ],

  thresholds: {
    http_req_failed:   ['rate<0.15'],   // akceptujemy do 15% błędów podczas spike
    http_req_duration: ['p(99)<5000'],  // max 5s nawet w szczycie
  },
};