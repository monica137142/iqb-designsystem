(() => {
  window.iqbPaletteValue = (token) => {
    const property = token.startsWith("--") ? token : `--${token}`;
    return getComputedStyle(document.documentElement).getPropertyValue(property).trim();
  };
  window.iqbColorMix = (token, opacity) => {
    const property = token.startsWith("--") ? token : `--${token}`;
    return `color-mix(in srgb, var(${property}) ${Number(opacity) * 100}%, transparent)`;
  };
  window.iqbPaletteRgb = (token) => {
    const value = window.iqbPaletteValue(token).replace("#", "");
    if (!/^[0-9a-f]{6}$/i.test(value)) return "";
    return [0, 2, 4].map((offset) => Number.parseInt(value.slice(offset, offset + 2), 16)).join(", ");
  };

  let savedMode = null;
  try {
    savedMode = localStorage.getItem("iqb-design-color-mode");
  } catch {
    // Storage can be unavailable in local previews.
  }
  const preferredMode = window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  document.documentElement.dataset.colorMode = savedMode === "dark" || savedMode === "light" ? savedMode : preferredMode;
})();
