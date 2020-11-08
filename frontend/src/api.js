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

export { loadScript, removeScript };
