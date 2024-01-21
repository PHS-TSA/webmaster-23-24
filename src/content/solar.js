import {Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs} from "preact/jsx-runtime";
export const title = "Solar Energy Solutions";
export const description = "Solar Energy is an undertapped energy resource.";
export const category = "solar";
function _createMdxContent(props) {
  const _components = {
    a: "a",
    em: "em",
    h2: "h2",
    p: "p",
    ...props.components
  };
  return _jsxs(_Fragment, {
    children: [_jsx(_components.h2, {
      children: "What is it?"
    }), "\n", _jsx(_components.p, {
      children: "Solar panels are useful. They collect energy from the sun, and can be placed on roofs discreetly."
    }), "\n", _jsx(_components.h2, {
      children: "Cost"
    }), "\n", _jsx(_components.h2, {
      children: "Tax Rebates"
    }), "\n", _jsx(_components.h2, {
      children: "Best Practices"
    }), "\n", _jsx(_components.h2, {
      children: "Buy Now"
    }), "\n", _jsxs(_components.p, {
      children: ["You can use our ", _jsx(_components.a, {
        href: "/calculator/",
        children: "online calculator"
      }), " to calculate costs and buy ", _jsx(_components.em, {
        children: "your"
      }), " solar energy solution today!"]
    }), "\n", _jsx(_components.h2, {
      children: "Sources"
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
