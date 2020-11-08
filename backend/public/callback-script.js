var dataA = [
  {
    name: 'homeSplashBanner',
    position: 'position1',
    recommendation: ['21336', '43213'],
  },
  {
    name: 'homeSplashBanner',
    position: 'position1',
    recommendation: ['43213', '31412'],
  },
  {
    name: 'homeSplashBanner',
    position: 'position2',
    recommendation: ['341234', '132421'],
  },
  {
    name: 'cartBanner',
    position: 'position1',
    recommendation: ['341234', '43213'],
  },
];

var dataB = [
  {
    name: 'someName',
    position: 'position1',
    smthElse: [true, false],
  },
  {
    name: 'anotherName',
    position: 'position2',
    smthElse: [false, true],
  },
];

var CallbacksApi = window.CallbacksApi;
if (CallbacksApi) {
  setTimeout(() => {
    CallbacksApi.dataA(dataA);
  }, 5000);
}

if (CallbacksApi) {
  setTimeout(() => {
    CallbacksApi.dataB(dataB);
  }, 7000);
}
