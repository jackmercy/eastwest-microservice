// Safari 3.0+ "[object HTMLElementConstructor]"
export const isFirefox = () => typeof InstallTrigger !== 'undefined';

// Internet Explorer 6-11
export const isIE = () =>
  typeof window !== 'undefined' &&
  /MSIE (\d+\.\d+);/.test(window.navigator.userAgent);

// Safari 3.0+ "[object HTMLElementConstructor]"
export const isEdge = () => !isIE() && !!window.StyleMedia;
