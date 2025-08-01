"use strict";

import React, { memo, useEffect, useCallback, useMemo } from 'react';
import { View } from 'react-native';
import { SCROLLABLE_TYPE } from '../../constants';
import { useBottomSheetContentContainerStyle, useBottomSheetInternal } from '../../hooks';
import { print } from '../../utilities';
import { styles } from './styles';
import { jsx as _jsx } from "react/jsx-runtime";
function BottomSheetViewComponent({
  focusHook: useFocusHook = useEffect,
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
  } = useBottomSheetInternal();
  //#endregion

  //#region styles
  const containerStyle = useBottomSheetContentContainerStyle(enableFooterMarginAdjustment, _providedStyle);
  const style = useMemo(() => [containerStyle, styles.container], [containerStyle]);
  //#endregion

  //#region callbacks
  const handleSettingScrollable = useCallback(() => {
    animatedScrollableContentOffsetY.value = 0;
    animatedScrollableType.value = SCROLLABLE_TYPE.VIEW;
  }, [animatedScrollableContentOffsetY, animatedScrollableType]);
  const handleLayout = useCallback(event => {
    if (enableDynamicSizing) {
      animatedContentHeight.set(event.nativeEvent.layout.height);
    }
    if (onLayout) {
      onLayout(event);
    }
    if (__DEV__) {
      print({
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
  return /*#__PURE__*/_jsx(View, {
    ...rest,
    onLayout: handleLayout,
    style: style,
    children: children
  });
}
const BottomSheetView = /*#__PURE__*/memo(BottomSheetViewComponent);
BottomSheetView.displayName = 'BottomSheetView';
export default BottomSheetView;
//# sourceMappingURL=BottomSheetView.js.map