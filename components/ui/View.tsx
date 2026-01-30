import React from 'react';
import { View as RNView, ViewProps as RNViewProps } from 'react-native';

interface ViewProps extends RNViewProps {
  className?: string;
}

export function View({ className = '', style, ...props }: ViewProps) {
  return <RNView className={className} style={style} {...props} />;
}
