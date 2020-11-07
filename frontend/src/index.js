const loadScript = src => {
  var script = document.createElement('script');
  script.src = src;
  document.head.appendChild(script);
  return () => removeScriptElement(src);
}

const removeScriptElement = src => {
  [...document.querySelectorAll(`script[src*="${src}"]`)]
    .forEach(s =>s.parentElement.removeChild(s));
}

const removeCallbackScript = loadScript('http://localhost:3500/callback-script.js');
setTimeout(
  () => {
    removeCallbackScript();
  },
  5000,
);
