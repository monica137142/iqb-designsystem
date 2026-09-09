(() => {
  const topbar = document.querySelector(".topbar");
  const topbarNav = document.querySelector(".topbar-nav");
  const productSelect = document.querySelector(".topbar > .product-select");
  const sharedScriptUrl = document.currentScript?.src || window.location.href;
  if (!topbar || !topbarNav || !productSelect) return;

  const componentsTab = topbarNav.querySelector('[data-topbar-nav="components"]');
  componentsTab?.addEventListener("click", () => {
    try {
      sessionStorage.setItem("iqb-design-active-nav-menu", "components");
    } catch {
      // Storage can be unavailable in local previews; navigation still proceeds.
    }
    window.location.assign(new URL("../index.html", sharedScriptUrl));
  });

  productSelect.querySelector('[data-product-option="business-theme"]')?.closest("li")?.remove();
  const availableProductOptions = Array.from(productSelect.querySelectorAll("[data-product-option]"));
  if (!availableProductOptions.some((option) => option.getAttribute("aria-selected") === "true")) {
    const fallbackProduct = document.documentElement.dataset.productTheme === "test-theme-1"
      ? "decentralized"
      : "default-theme";
    availableProductOptions.forEach((option) => {
      option.setAttribute("aria-selected", String(option.dataset.productOption === fallbackProduct));
    });
    const fallbackOption = availableProductOptions.find(
      (option) => option.dataset.productOption === fallbackProduct,
    );
    productSelect.querySelector("[data-product-select-value]")?.replaceChildren(
      fallbackOption?.textContent.trim() || "默认主题",
    );
  }
  if (document.documentElement.dataset.productTheme === "business-theme") {
    document.documentElement.dataset.productTheme = "default-theme";
    [
      "--brand-0", "--brand-1", "--brand-2", "--brand-3", "--brand-4",
      "--brand-5", "--brand-6", "--brand-7", "--brand-8", "--brand-9", "--brand-text", "--brand-text-hover", "--brand-border-soft", "--brand-border-hover",
      "--input-hover-border-color", "--input-focus-color",
      "--input-number-hover-border-color", "--input-number-focus-color",
    ].forEach((name) => document.documentElement.style.removeProperty(name));
    productSelect.querySelector("[data-product-select-value]")?.replaceChildren("默认主题");
    productSelect.querySelector('[data-product-option="default-theme"]')?.setAttribute("aria-selected", "true");
    try {
      localStorage.setItem("design-system-active-product", "default-theme");
    } catch {
      // Local previews may disable storage; the in-page reset still applies.
    }
  }

  const openInNewIcon = `<span class="topbar-template-open-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" focusable="false"><path d="M13.5 5H17a2 2 0 0 1 2 2v3.5M18.5 5.5 11 13M19 14v3a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span>`;
  const templateOptionsMarkup = `
    <li role="none"><button class="topbar-template-option" type="button" role="menuitem"><span class="topbar-template-logo topbar-template-logo-studio" aria-hidden="true">S</span><span class="topbar-template-label">IQ Studio</span>${openInNewIcon}</button></li>
    <li role="none"><button class="topbar-template-option" type="button" role="menuitem" disabled><span class="topbar-template-logo topbar-template-logo-buddy" aria-hidden="true">B</span><span class="topbar-template-label">IQ Buddy</span>${openInNewIcon}</button></li>
    <li role="none"><button class="topbar-template-option" type="button" role="menuitem" disabled><span class="topbar-template-logo topbar-template-logo-survey" aria-hidden="true">Q</span><span class="topbar-template-label">IQ Survey</span>${openInNewIcon}</button></li>`;

  if (!topbarNav.querySelector(".topbar-nav-dropdown")) {
    topbarNav.insertAdjacentHTML(
      "beforeend",
      `<div class="topbar-nav-dropdown">
        <button class="topbar-nav-tab topbar-template-tab" type="button" aria-haspopup="menu">模版<span class="topbar-menu-chevron" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></svg></span></button>
        <ul class="topbar-template-menu" role="menu" aria-label="模版主题">
          ${templateOptionsMarkup}
        </ul>
      </div>`,
    );
  }

  const templateMenu = topbarNav.querySelector(".topbar-template-menu");
  if (templateMenu) templateMenu.innerHTML = templateOptionsMarkup;

  topbar.querySelector("[data-theme-toggle]")?.remove();
  const colorModeStorageKey = "iqb-design-color-mode";
  const applyColorMode = (mode, persist = false) => {
    const isDark = mode === "dark";
    document.documentElement.dataset.colorMode = isDark ? "dark" : "light";
    if (persist) {
      try {
        localStorage.setItem(colorModeStorageKey, isDark ? "dark" : "light");
      } catch {
        // Local previews may disable storage; the toggle still works in-page.
      }
    }
  };
  let initialColorMode = document.documentElement.dataset.colorMode;
  if (!initialColorMode) {
    try {
      initialColorMode = localStorage.getItem(colorModeStorageKey);
    } catch {
      // Storage can be unavailable in local previews.
    }
  }
  if (!initialColorMode) {
    initialColorMode = window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  applyColorMode(initialColorMode);

  const productSelectTrigger = productSelect.querySelector("[data-product-select-trigger]");
  const productSelectMenu = productSelect.querySelector("[data-product-select-menu]");
  const productSelectValue = productSelect.querySelector("[data-product-select-value]");
  if (productSelectTrigger && !productSelectTrigger.querySelector(".product-select-chevron")) {
    productSelectTrigger.insertAdjacentHTML(
      "beforeend",
      `<span class="product-select-chevron" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path d="m6 9 6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span>`,
    );
  }
  const legacyProductOptions = Object.fromEntries(
    availableProductOptions.map((option) => [option.dataset.productOption, option]),
  );
  const combinedThemes = [
    { id: "default-light", label: "主题1", product: "default-theme", mode: "light" },
    { id: "default-dark", label: "主题2", product: "default-theme", mode: "dark" },
    { id: "pure-light", label: "主题3", product: "decentralized", mode: "light" },
    { id: "pure-dark", label: "主题4", product: "decentralized", mode: "dark" },
  ];
  const themeIcon = (theme) => `<span class="combined-theme-icon" data-theme-preview="${theme.id}" aria-hidden="true"><i></i><b>Aa</b></span>`;
  const activeCombinedTheme = () => {
    const family = document.documentElement.dataset.productTheme === "test-theme-1" ? "pure" : "default";
    const mode = document.documentElement.dataset.colorMode === "dark" ? "dark" : "light";
    return combinedThemes.find((theme) => theme.id === `${family}-${mode}`) || combinedThemes[0];
  };
  const syncCombinedTheme = () => {
    const active = activeCombinedTheme();
    productSelectValue?.closest("button")?.setAttribute("aria-label", `当前主题：${active.label}`);
    if (productSelectValue) productSelectValue.innerHTML = `${themeIcon(active)}<span>${active.label}</span>`;
    productSelectMenu?.querySelectorAll("[data-combined-theme]").forEach((option) => {
      option.setAttribute("aria-selected", String(option.dataset.combinedTheme === active.id));
    });
  };
  if (productSelectMenu) {
    productSelectMenu.setAttribute("aria-label", "主题与亮暗模式");
    productSelectMenu.innerHTML = combinedThemes.map((theme, index) => `
      <li>
        <button class="product-select-option combined-theme-option" type="button" role="option" aria-selected="false" data-combined-theme="${theme.id}"${index >= 2 ? " disabled" : ""}>
          ${themeIcon(theme)}<span>${theme.label}</span><span class="combined-theme-check" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path d="M20 6 9 17l-5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
        </button>
      </li>`).join("");
    productSelectMenu.addEventListener("click", (event) => {
      const option = event.target.closest("[data-combined-theme]");
      if (!option || option.disabled) return;
      event.preventDefault();
      event.stopPropagation();
      const theme = combinedThemes.find((item) => item.id === option.dataset.combinedTheme);
      if (!theme) return;
      legacyProductOptions[theme.product]?.click();
      applyColorMode(theme.mode, true);
      syncCombinedTheme();
      closeProductSelectMenu();
    });
  }
  syncCombinedTheme();
  let productSelectCloseTimer = 0;
  const cancelProductSelectClose = () => {
    window.clearTimeout(productSelectCloseTimer);
    productSelectCloseTimer = 0;
  };
  const openProductSelectMenu = () => {
    cancelProductSelectClose();
    productSelectTrigger?.setAttribute("aria-expanded", "true");
    if (productSelectMenu) productSelectMenu.hidden = false;
  };
  const closeProductSelectMenu = () => {
    cancelProductSelectClose();
    productSelectTrigger?.setAttribute("aria-expanded", "false");
    if (productSelectMenu) productSelectMenu.hidden = true;
  };
  const scheduleProductSelectClose = () => {
    cancelProductSelectClose();
    productSelectCloseTimer = window.setTimeout(closeProductSelectMenu, 120);
  };

  productSelect.addEventListener("pointerenter", openProductSelectMenu);
  productSelect.addEventListener("pointerleave", scheduleProductSelectClose);
  productSelect.addEventListener("focusin", openProductSelectMenu);
  productSelect.addEventListener("focusout", (event) => {
    if (!productSelect.contains(event.relatedTarget)) closeProductSelectMenu();
  });
  productSelectTrigger?.addEventListener(
    "click",
    (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      openProductSelectMenu();
    },
    true,
  );
  productSelectMenu?.addEventListener("click", (event) => {
    if (event.target.closest("[data-product-option]")) closeProductSelectMenu();
  });

  const dropdown = topbarNav.querySelector(".topbar-nav-dropdown");
  const options = Array.from(dropdown.querySelectorAll(".topbar-template-option:not(:disabled)"));
  options.forEach((option) => {
    option.addEventListener("click", () => {
      const studioUrl = new URL("../template/StudioDemo/index.html", sharedScriptUrl);
      window.open(studioUrl, "_blank", "noopener");
      dropdown.classList.add("is-menu-dismissed");
      option.blur();
    });
  });

  dropdown.addEventListener("pointerleave", () => {
    dropdown.classList.remove("is-menu-dismissed");
  });
  dropdown.querySelector(".topbar-template-tab")?.addEventListener("focus", () => {
    dropdown.classList.remove("is-menu-dismissed");
  });
})();
