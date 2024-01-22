import {Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs} from "preact/jsx-runtime";
export const frontmatter = {
  "title": "Taxes",
  "description": "\"There are only two guarantees in life: death and taxes.\"",
  "category": "monies"
};
function _createMdxContent(props) {
  const _components = {
    h2: "h2",
    p: "p",
    ...props.components
  };
  return _jsxs(_Fragment, {
    children: [_jsx(_components.h2, {
      children: "Tax Rebates"
    }), "\n", _jsx(_components.p, {
      children: "Looking for information about tax rebates and incentives for green\nenergy?"
    }), "\n", _jsx(_components.p, {
      children: "Please keep in mind that, like death, taxes are a certainty, and thus\ntax evasion is illegal. If you wish to avoid taxes, please consult a\nregistered accountant rather than willy-nilly skipping them based on\nour advice."
    })]
  });
}
export default function MDXContent(props = {}) {
  const {wrapper: MDXLayout} = props.components || ({});
  return MDXLayout ? _jsx(MDXLayout, {
    ...props,
    children: _jsx(_createMdxContent, {
      ...props
    })
  }) : _createMdxContent(props);
}
