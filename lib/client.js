window.__ModuleLoader__ && window.__ModuleLoader__.load({ id: "dsh-snippet-vault", factory: function(require, exports, module) {
var __dsh_client_snippet_vault__ = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined") return require.apply(this, arguments);
    throw Error('Dynamic require of "' + x + '" is not supported');
  });
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // src/client/index.ts
  var client_exports = {};
  __export(client_exports, {
    apply: () => apply,
    default: () => client_default,
    inject: () => inject
  });
  var import_react3 = __require("react");
  var import_client = __require("react-dom/client");

  // src/client/i18n.ts
  var import_react = __require("react");
  var DICTS = {
    zh: {
      "vault.title": "\u63D0\u793A\u8BCD\u5E93",
      "vault.open": "\u5E38\u7528\u63D0\u793A\u8BCD\u4E0E\u6307\u4EE4\u5E93",
      "vault.search": "\u641C\u7D22\u63D0\u793A\u8BCD\u2026",
      "vault.add": "\u65B0\u5EFA\u63D0\u793A\u8BCD",
      "vault.empty": "\u6682\u65E0\u63D0\u793A\u8BCD\uFF0C\u70B9\u51FB\u4E0A\u65B9\u65B0\u5EFA",
      "vault.edit": "\u7F16\u8F91",
      "vault.delete": "\u5220\u9664",
      "vault.copy": "\u590D\u5236",
      "vault.insert": "\u63D2\u5165\u5230\u8F93\u5165\u6846",
      "vault.copied": "\u5DF2\u590D\u5236",
      "vault.inserted": "\u5DF2\u63D2\u5165\u8F93\u5165\u6846",
      "form.title": "\u6807\u9898",
      "form.title.ph": "\u5982\uFF1A\u6781\u7B80\u4EE3\u7801\u91CD\u6784",
      "form.category": "\u5206\u7C7B",
      "form.category.ph": "\u5982\uFF1A\u5F00\u53D1 / \u5BA1\u67E5 / \u5199\u4F5C",
      "form.content": "\u63D0\u793A\u8BCD\u5185\u5BB9",
      "form.content.ph": "\u8F93\u5165 Prompt \u5185\u5BB9\uFF0C\u652F\u6301 {{selected}} \u5360\u4F4D\u7B26",
      "form.save": "\u4FDD\u5B58",
      "form.cancel": "\u53D6\u6D88"
    },
    en: {
      "vault.title": "Snippet Vault",
      "vault.open": "Prompt & Instruction Vault",
      "vault.search": "Search snippets\u2026",
      "vault.add": "New Snippet",
      "vault.empty": "No snippets yet, click above to create one",
      "vault.edit": "Edit",
      "vault.delete": "Delete",
      "vault.copy": "Copy",
      "vault.insert": "Insert into composer",
      "vault.copied": "Copied",
      "vault.inserted": "Inserted",
      "form.title": "Title",
      "form.title.ph": "e.g., Concise Code Refactor",
      "form.category": "Category",
      "form.category.ph": "e.g., Dev / Review / Writing",
      "form.content": "Prompt Content",
      "form.content.ph": "Enter prompt text, supports {{selected}} placeholder",
      "form.save": "Save",
      "form.cancel": "Cancel"
    },
    es: {
      "vault.title": "B\xF3veda de Prompts",
      "vault.open": "B\xF3veda de Prompts e Instrucciones",
      "vault.search": "Buscar prompts\u2026",
      "vault.add": "Nuevo Prompt",
      "vault.empty": "No hay prompts, haz clic arriba para crear uno",
      "vault.edit": "Editar",
      "vault.delete": "Eliminar",
      "vault.copy": "Copiar",
      "vault.insert": "Insertar en entrada",
      "vault.copied": "Copiado",
      "vault.inserted": "Insertado",
      "form.title": "T\xEDtulo",
      "form.title.ph": "p. ej. Refactorizaci\xF3n concisa",
      "form.category": "Categor\xEDa",
      "form.category.ph": "p. ej. Desarrollo / Revisi\xF3n",
      "form.content": "Contenido del Prompt",
      "form.content.ph": "Texto del prompt, admite {{selected}}",
      "form.save": "Guardar",
      "form.cancel": "Cancelar"
    }
  };
  var locale = null;
  var lang = "zh";
  var revision = 0;
  var listeners = /* @__PURE__ */ new Set();
  function notify() {
    revision += 1;
    for (const fn of listeners) fn();
  }
  function detectLang() {
    const active = locale?.getLocale().active;
    if (active === "zh") return "zh";
    const nav = (navigator.language || "").toLowerCase();
    if (nav.startsWith("es")) return "es";
    if (active === "en") return "en";
    if (nav.startsWith("zh")) return "zh";
    return "zh";
  }
  function initI18n(service) {
    if (locale === service) return;
    locale = service;
    lang = detectLang();
    service.subscribe(() => {
      const next = detectLang();
      if (next !== lang) {
        lang = next;
        notify();
      }
    });
  }
  function t(key) {
    return DICTS[lang][key] ?? DICTS.zh[key] ?? key;
  }
  function useT() {
    (0, import_react.useSyncExternalStore)((fn) => {
      listeners.add(fn);
      return () => listeners.delete(fn);
    }, () => revision);
    return t;
  }

  // src/client/VaultPage.tsx
  var import_react2 = __require("react");
  var DEFAULT_SNIPPETS = [
    {
      id: "code-refactor",
      title: "\u6781\u7B80\u4EE3\u7801\u91CD\u6784",
      category: "\u5F00\u53D1",
      content: "\u8BF7\u7528\u7B80\u6D01\u3001\u5730\u9053\u3001\u6A21\u5757\u5316\u7684\u98CE\u683C\u91CD\u6784\u4EE5\u4E0B\u4EE3\u7801\uFF0C\u4FDD\u7559\u5168\u90E8\u539F\u6709\u529F\u80FD\u5E76\u63D0\u5347\u53EF\u8BFB\u6027\uFF1A\n\n```\n{{selected}}\n```",
      createdAt: 1
    },
    {
      id: "unit-test",
      title: "\u7F16\u5199\u5355\u5143\u6D4B\u8BD5",
      category: "\u5F00\u53D1",
      content: "\u8BF7\u4E3A\u4EE5\u4E0B\u51FD\u6570/\u6A21\u5757\u7F16\u5199\u5B8C\u6574\u7684 Vitest \u5355\u5143\u6D4B\u8BD5\uFF0C\u8986\u76D6\u6838\u5FC3\u8DEF\u5F84\u4E0E\u8FB9\u754C\u5F02\u5E38\u60C5\u51B5\uFF1A\n\n```\n{{selected}}\n```",
      createdAt: 2
    },
    {
      id: "bug-analyze",
      title: "\u62A5\u9519\u539F\u56E0\u5206\u6790\u4E0E\u4FEE\u590D",
      category: "\u6392\u9519",
      content: "\u5206\u6790\u4EE5\u4E0B\u62A5\u9519\u5806\u6808\u4E0E\u76F8\u5173\u4EE3\u7801\uFF0C\u7ED9\u51FA\u5177\u4F53\u7684\u6839\u672C\u539F\u56E0\u89E3\u91CA\u5E76\u63D0\u4F9B\u4FEE\u590D\u65B9\u6848\uFF1A\n\n\u62A5\u9519\u4FE1\u606F\uFF1A\n{{selected}}",
      createdAt: 3
    }
  ];
  var STYLE = `
.dsh-sv-overlay { position:fixed; inset:0; z-index:990; background:rgba(0,0,0,0.45); backdrop-filter:blur(2px);
  display:flex; align-items:center; justify-content:center; }
.dsh-sv-card { width:90%; max-width:680px; max-height:85vh; background:var(--gw-bg, #fff);
  border:1px solid var(--gw-border, rgba(128,128,128,0.25)); border-radius:12px;
  box-shadow:0 16px 48px rgba(0,0,0,0.25); display:flex; flex-direction:column; overflow:hidden;
  color:var(--gw-fg, #24292f); font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif; }
[data-ds-dark-theme] .dsh-sv-card { background:#1f2328; color:#d1d9e0; border-color:rgba(255,255,255,0.15); }
.dsh-sv-head { display:flex; align-items:center; gap:8px; padding:12px 16px; border-bottom:1px solid var(--gw-border, rgba(128,128,128,0.2)); font-weight:600; font-size:14px; }
.dsh-sv-head .spacer { flex:1; }
.dsh-sv-close { border:none; background:transparent; color:inherit; opacity:0.6; cursor:pointer; padding:4px; border-radius:6px; }
.dsh-sv-close:hover { opacity:1; background:rgba(128,128,128,0.1); }
.dsh-sv-toolbar { display:flex; gap:8px; padding:10px 16px; border-bottom:1px solid var(--gw-border, rgba(128,128,128,0.15)); align-items:center; }
.dsh-sv-input { flex:1; padding:6px 10px; font-size:12.5px; border-radius:6px; border:1px solid var(--gw-border, rgba(128,128,128,0.25)); background:transparent; color:inherit; outline:none; }
.dsh-sv-input:focus { border-color:#1976d2; }
.dsh-sv-btn { border:1px solid var(--gw-border, rgba(128,128,128,0.25)); background:transparent; color:inherit; border-radius:6px; padding:5px 12px; font-size:12px; cursor:pointer; font-weight:500; display:flex; align-items:center; gap:4px; }
.dsh-sv-btn.primary { background:#1976d2; border-color:#1976d2; color:#fff; }
.dsh-sv-btn:hover { background:rgba(128,128,128,0.1); }
.dsh-sv-btn.primary:hover { background:#1565c0; }
.dsh-sv-body { flex:1; overflow-y:auto; padding:12px 16px; display:flex; flex-direction:column; gap:8px; }
.dsh-sv-item { border:1px solid var(--gw-border, rgba(128,128,128,0.2)); border-radius:8px; padding:10px 12px; display:flex; flex-direction:column; gap:6px; background:rgba(128,128,128,0.03); }
.dsh-sv-item-top { display:flex; align-items:center; gap:8px; }
.dsh-sv-item-title { font-weight:600; font-size:13px; flex:1; }
.dsh-sv-item-tag { font-size:10.5px; padding:1px 6px; border-radius:10px; background:rgba(25,118,210,0.12); color:#1976d2; font-weight:600; }
.dsh-sv-item-content { font-size:11.5px; opacity:0.8; white-space:pre-wrap; word-break:break-all; max-height:80px; overflow:hidden; text-overflow:ellipsis; font-family:ui-monospace,Menlo,monospace; }
.dsh-sv-item-acts { display:flex; gap:6px; justify-content:flex-end; margin-top:2px; }
.dsh-sv-item-acts .dsh-sv-btn { padding:2px 8px; font-size:11px; }
.dsh-sv-form { display:flex; flex-direction:column; gap:10px; padding:12px 16px; }
.dsh-sv-field { display:flex; flex-direction:column; gap:4px; }
.dsh-sv-field label { font-size:11px; opacity:0.75; font-weight:600; }
.dsh-sv-textarea { width:100%; min-height:120px; padding:8px 10px; font-size:12px; border-radius:6px; border:1px solid var(--gw-border, rgba(128,128,128,0.25)); background:transparent; color:inherit; outline:none; font-family:ui-monospace,Menlo,monospace; box-sizing:border-box; }
`;
  var styleInjected = false;
  function ensureStyle() {
    if (styleInjected) return;
    styleInjected = true;
    const tag = document.createElement("style");
    tag.textContent = STYLE;
    document.head.appendChild(tag);
  }
  function VaultPage(props) {
    const { onClose } = props;
    const t2 = useT();
    ensureStyle();
    const [snippets, setSnippets] = (0, import_react2.useState)(() => {
      try {
        const raw = localStorage.getItem("dsh-snippet-vault.items");
        return raw ? JSON.parse(raw) : DEFAULT_SNIPPETS;
      } catch {
        return DEFAULT_SNIPPETS;
      }
    });
    const [query, setQuery] = (0, import_react2.useState)("");
    const [editing, setEditing] = (0, import_react2.useState)(null);
    const [formTitle, setFormTitle] = (0, import_react2.useState)("");
    const [formCat, setFormCat] = (0, import_react2.useState)("");
    const [formContent, setFormContent] = (0, import_react2.useState)("");
    const [msg, setMsg] = (0, import_react2.useState)("");
    const saveToStorage = (items) => {
      setSnippets(items);
      try {
        localStorage.setItem("dsh-snippet-vault.items", JSON.stringify(items));
      } catch {
      }
    };
    const showFeedback = (text) => {
      setMsg(text);
      setTimeout(() => setMsg(""), 2e3);
    };
    const filtered = (0, import_react2.useMemo)(() => {
      const q = query.trim().toLowerCase();
      if (!q) return snippets;
      return snippets.filter((s) => s.title.toLowerCase().includes(q) || s.category.toLowerCase().includes(q) || s.content.toLowerCase().includes(q));
    }, [snippets, query]);
    const openForm = (target) => {
      setEditing(target);
      setFormTitle(target?.title ?? "");
      setFormCat(target?.category ?? "\u5E38\u7528");
      setFormContent(target?.content ?? "");
    };
    const submitForm = () => {
      if (!formTitle.trim() || !formContent.trim()) return;
      let next;
      if (editing && editing.id) {
        next = snippets.map((s) => s.id === editing.id ? { ...s, title: formTitle.trim(), category: formCat.trim() || "\u5E38\u7528", content: formContent.trim() } : s);
      } else {
        const item = {
          id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
          title: formTitle.trim(),
          category: formCat.trim() || "\u5E38\u7528",
          content: formContent.trim(),
          createdAt: Date.now()
        };
        next = [item, ...snippets];
      }
      saveToStorage(next);
      setEditing(null);
    };
    const remove = (id) => {
      saveToStorage(snippets.filter((s) => s.id !== id));
    };
    const copySnippet = (content) => {
      if (navigator?.clipboard?.writeText) {
        void navigator.clipboard.writeText(content).then(() => showFeedback(t2("vault.copied")));
      }
    };
    const insertToComposer = (content) => {
      const composer = document.querySelector('[contenteditable="true"], textarea');
      if (composer) {
        if ("value" in composer) {
          composer.value = (composer.value ? composer.value + "\n" : "") + content;
          composer.dispatchEvent(new Event("input", { bubbles: true }));
        } else {
          composer.textContent = (composer.textContent ? composer.textContent + "\n" : "") + content;
          composer.dispatchEvent(new Event("input", { bubbles: true }));
        }
        showFeedback(t2("vault.inserted"));
        setTimeout(onClose, 500);
      } else {
        copySnippet(content);
      }
    };
    return (0, import_react2.createElement)(
      "div",
      { className: "dsh-sv-overlay", onClick: onClose },
      (0, import_react2.createElement)(
        "div",
        { className: "dsh-sv-card", onClick: (e) => e.stopPropagation() },
        (0, import_react2.createElement)(
          "div",
          { className: "dsh-sv-head" },
          (0, import_react2.createElement)("span", null, `\u{1F4A1} ${t2("vault.title")}`),
          msg ? (0, import_react2.createElement)("span", { style: { color: "#2ea043", fontSize: 12, marginLeft: 8 } }, msg) : null,
          (0, import_react2.createElement)("span", { className: "spacer" }),
          (0, import_react2.createElement)("button", { type: "button", className: "dsh-sv-close", onClick: onClose }, "\u2715")
        ),
        editing !== null ? (0, import_react2.createElement)(
          "div",
          { className: "dsh-sv-form" },
          (0, import_react2.createElement)(
            "div",
            { className: "dsh-sv-field" },
            (0, import_react2.createElement)("label", null, t2("form.title")),
            (0, import_react2.createElement)("input", { className: "dsh-sv-input", value: formTitle, placeholder: t2("form.title.ph"), onChange: (e) => setFormTitle(e.target.value) })
          ),
          (0, import_react2.createElement)(
            "div",
            { className: "dsh-sv-field" },
            (0, import_react2.createElement)("label", null, t2("form.category")),
            (0, import_react2.createElement)("input", { className: "dsh-sv-input", value: formCat, placeholder: t2("form.category.ph"), onChange: (e) => setFormCat(e.target.value) })
          ),
          (0, import_react2.createElement)(
            "div",
            { className: "dsh-sv-field" },
            (0, import_react2.createElement)("label", null, t2("form.content")),
            (0, import_react2.createElement)("textarea", { className: "dsh-sv-textarea", value: formContent, placeholder: t2("form.content.ph"), onChange: (e) => setFormContent(e.target.value) })
          ),
          (0, import_react2.createElement)(
            "div",
            { style: { display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 8 } },
            (0, import_react2.createElement)("button", { type: "button", className: "dsh-sv-btn primary", onClick: submitForm }, t2("form.save")),
            (0, import_react2.createElement)("button", { type: "button", className: "dsh-sv-btn", onClick: () => setEditing(null) }, t2("form.cancel"))
          )
        ) : (0, import_react2.createElement)(
          "div",
          null,
          (0, import_react2.createElement)(
            "div",
            { className: "dsh-sv-toolbar" },
            (0, import_react2.createElement)("input", { className: "dsh-sv-input", value: query, placeholder: t2("vault.search"), onChange: (e) => setQuery(e.target.value) }),
            (0, import_react2.createElement)("button", { type: "button", className: "dsh-sv-btn primary", onClick: () => openForm({}) }, `+ ${t2("vault.add")}`)
          ),
          (0, import_react2.createElement)(
            "div",
            { className: "dsh-sv-body" },
            filtered.length === 0 ? (0, import_react2.createElement)("div", { style: { textAlign: "center", opacity: 0.5, padding: 30, fontSize: 13 } }, t2("vault.empty")) : filtered.map(
              (s) => (0, import_react2.createElement)(
                "div",
                { key: s.id, className: "dsh-sv-item" },
                (0, import_react2.createElement)(
                  "div",
                  { className: "dsh-sv-item-top" },
                  (0, import_react2.createElement)("span", { className: "dsh-sv-item-title" }, s.title),
                  (0, import_react2.createElement)("span", { className: "dsh-sv-item-tag" }, s.category)
                ),
                (0, import_react2.createElement)("div", { className: "dsh-sv-item-content" }, s.content),
                (0, import_react2.createElement)(
                  "div",
                  { className: "dsh-sv-item-acts" },
                  (0, import_react2.createElement)("button", { type: "button", className: "dsh-sv-btn primary", onClick: () => insertToComposer(s.content) }, t2("vault.insert")),
                  (0, import_react2.createElement)("button", { type: "button", className: "dsh-sv-btn", onClick: () => copySnippet(s.content) }, t2("vault.copy")),
                  (0, import_react2.createElement)("button", { type: "button", className: "dsh-sv-btn", onClick: () => openForm(s) }, t2("vault.edit")),
                  (0, import_react2.createElement)("button", { type: "button", className: "dsh-sv-btn", style: { color: "#cf222e" }, onClick: () => remove(s.id) }, t2("vault.delete"))
                )
              )
            )
          )
        )
      )
    );
  }

  // src/client/index.ts
  var inject = ["locale"];
  var BUTTON_STYLE = `
.dsh-sv-open { display:flex; align-items:center; gap:8px; width:100%; padding:8px 12px;
  border:none; background:transparent; color:inherit; cursor:pointer;
  font-size:12px; font-weight:500; border-radius:8px; box-sizing:border-box; }
.dsh-sv-open:hover { background:rgba(128,128,128,0.1); }
.dsh-sv-open .icon { font-size:14px; display:flex; align-items:center; }
.dsh-sv-open .label { flex:1; font-weight:500; }
`;
  var NEW_SESSION_SELECTOR = '[class*="newSession"]';
  var styleInjected2 = false;
  function ensureButtonStyle() {
    if (styleInjected2) return;
    styleInjected2 = true;
    const tag = document.createElement("style");
    tag.dataset.plugin = "dsh-snippet-vault-btn";
    tag.textContent = BUTTON_STYLE;
    document.head.appendChild(tag);
  }
  function VaultApp() {
    const t2 = useT();
    const [open, setOpen] = (0, import_react3.useState)(false);
    const close = (0, import_react3.useCallback)(() => setOpen(false), []);
    ensureButtonStyle();
    return (0, import_react3.createElement)(
      "div",
      null,
      (0, import_react3.createElement)(
        "button",
        { type: "button", className: "dsh-sv-open", title: t2("vault.open"), onClick: () => setOpen(true) },
        (0, import_react3.createElement)("span", { className: "icon" }, "\u{1F4A1}"),
        (0, import_react3.createElement)("span", { className: "label" }, t2("vault.title"))
      ),
      open ? (0, import_react3.createElement)(VaultPage, { onClose: close }) : null
    );
  }
  function apply(ctx) {
    try {
      initI18n(ctx.locale);
    } catch (e) {
      console.error("dsh-snippet-vault: i18n init error", e);
    }
    ctx.effect(() => {
      const host = document.createElement("div");
      host.dataset.vaultHost = "";
      const root = (0, import_client.createRoot)(host);
      let disposed = false;
      const render = () => {
        if (disposed) return;
        root.render((0, import_react3.createElement)(VaultApp, null));
      };
      let raf = 0;
      let polling = true;
      const poll = () => {
        if (disposed || !polling) return;
        if (!host.isConnected) {
          const btn = document.querySelector(NEW_SESSION_SELECTOR);
          if (btn !== null && btn.parentElement !== null) {
            btn.parentElement.appendChild(host);
            render();
            polling = false;
            return;
          }
        } else {
          polling = false;
          return;
        }
        raf = requestAnimationFrame(poll);
      };
      raf = requestAnimationFrame(poll);
      const fallback = window.setInterval(() => {
        if (disposed) return;
        if (!host.isConnected) {
          const btn = document.querySelector(NEW_SESSION_SELECTOR);
          if (btn !== null && btn.parentElement !== null) {
            btn.parentElement.appendChild(host);
            render();
          }
        }
      }, 2e3);
      return () => {
        disposed = true;
        cancelAnimationFrame(raf);
        clearInterval(fallback);
        try {
          root.unmount();
        } catch {
        }
        host.remove();
      };
    }, "dsh-snippet-vault: mount");
  }
  var client_default = { apply, inject };
  return __toCommonJS(client_exports);
})();
}});
//# sourceMappingURL=client.js.map
