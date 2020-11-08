const loadScript = src => {
  var script = document.createElement('script');
  script.src = src;
  document.head.appendChild(script);
  return () => removeScript(src);
};

const removeScript = src => {
  [...document.querySelectorAll(`script[src*="${src}"]`)].forEach(s =>
    s.parentElement.removeChild(s),
  );
};

const getDataA = () => {
  return new Promise(resolve => {
    if (!window.CallbacksApi) {
      window.CallbacksApi = {};
    }
    window.CallbacksApi.dataA = dataA => {
      resolve(dataA);
    };
  });
};

const getDataB = () => {
  return new Promise(resolve => {
    if (!window.CallbacksApi) {
      window.CallbacksApi = {};
    }
    window.CallbacksApi.dataB = dataB => {
      resolve(dataB);
    };
  });
};

export { loadScript, removeScript, getDataA, getDataB };
