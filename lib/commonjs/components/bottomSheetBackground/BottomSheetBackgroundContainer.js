"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BottomSheetBackgroundContainer = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _BottomSheetBackground = require("./BottomSheetBackground");
var _styles = require("./styles");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const BottomSheetBackgroundContainerComponent = ({
  animatedIndex,
  animatedPosition,
  backgroundComponent: _providedBackgroundComponent,
  backgroundStyle: _providedBackgroundStyle
}) => {
  //#region style
  const backgroundStyle = (0, _react.useMemo)(() => _reactNative.StyleSheet.flatten([_styles.styles.container, _providedBackgroundStyle]), [_providedBackgroundStyle]);
  //#endregion

  const BackgroundComponent = _providedBackgroundComponent ?? _BottomSheetBackground.BottomSheetBackground;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(BackgroundComponent, {
    pointerEvents: "none",
    animatedIndex: animatedIndex,
    animatedPosition: animatedPosition,
    style: backgroundStyle
  });
};
const BottomSheetBackgroundContainer = exports.BottomSheetBackgroundContainer = /*#__PURE__*/(0, _react.memo)(BottomSheetBackgroundContainerComponent);
BottomSheetBackgroundContainer.displayName = 'BottomSheetBackgroundContainer';
//# sourceMappingURL=BottomSheetBackgroundContainer.js.map