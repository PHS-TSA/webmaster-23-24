import {Fragment as _Fragment, jsx as _jsx} from "preact/jsx-runtime";
export const title = "Programs";
export const description = "Green energy programs";
export const category = "green";
function _createMdxContent(props) {
  return _jsx(_Fragment, {});
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