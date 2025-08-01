"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _constants = require("../../constants");
var _hooks = require("../../hooks");
var _utilities = require("../../utilities");
var _styles = require("./styles");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function BottomSheetViewComponent({
  focusHook: useFocusHook = _react.useEffect,
  enableFooterMarginAdjustment = false,
  onLayout,
  style: _providedStyle,
  children,
  ...rest
}) {
  //#region hooks
  const {
    animatedScrollableContentOffsetY,
    animatedScrollableType,
    enableDynamicSizing,
    animatedContentHeight
  } = (0, _hooks.useBottomSheetInternal)();
  //#endregion

  //#region styles
  const containerStyle = (0, _hooks.useBottomSheetContentContainerStyle)(enableFooterMarginAdjustment, _providedStyle);
  const style = (0, _react.useMemo)(() => [containerStyle, _styles.styles.container], [containerStyle]);
  //#endregion

  //#region callbacks
  const handleSettingScrollable = (0, _react.useCallback)(() => {
    animatedScrollableContentOffsetY.value = 0;
    animatedScrollableType.value = _constants.SCROLLABLE_TYPE.VIEW;
  }, [animatedScrollableContentOffsetY, animatedScrollableType]);
  const handleLayout = (0, _react.useCallback)(event => {
    if (enableDynamicSizing) {
      animatedContentHeight.set(event.nativeEvent.layout.height);
    }
    if (onLayout) {
      onLayout(event);
    }
    if (__DEV__) {
      (0, _utilities.print)({
        component: BottomSheetView.displayName,
        method: 'handleLayout',
        category: 'layout',
        params: {
          height: event.nativeEvent.layout.height
        }
      });
    }
  }, [onLayout, animatedContentHeight, enableDynamicSizing]);
  //#endregion

  //#region effects
  useFocusHook(handleSettingScrollable);
  //#endregion

  //render
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
    ...rest,
    onLayout: handleLayout,
    style: style,
    children: children
  });
}
const BottomSheetView = /*#__PURE__*/(0, _react.memo)(BottomSheetViewComponent);
BottomSheetView.displayName = 'BottomSheetView';
var _default = exports.default = BottomSheetView;
//# sourceMappingURL=BottomSheetView.js.map