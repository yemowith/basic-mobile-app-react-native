import React from 'react';
import { Pressable, Text, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';

interface ButtonProps {
  children: React.ReactNode;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  isDisabled?: boolean;
  className?: string;
}

export function Button({
  children,
  onPress,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  isDisabled = false,
  className = '',
}: ButtonProps) {
  const baseStyle: ViewStyle = {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  };

  const sizeStyles: Record<string, ViewStyle> = {
    sm: { paddingVertical: 8, paddingHorizontal: 16, minHeight: 36 },
    md: { paddingVertical: 12, paddingHorizontal: 24, minHeight: 44 },
    lg: { paddingVertical: 16, paddingHorizontal: 32, minHeight: 52 },
  };

  const variantStyles: Record<string, ViewStyle> = {
    primary: { backgroundColor: '#1a4960' },
    secondary: { backgroundColor: '#1e7fa8' },
    outline: { backgroundColor: 'transparent', borderWidth: 1, borderColor: '#1a4960' },
  };

  const textStyles: Record<string, TextStyle> = {
    primary: { color: '#ffffff' },
    secondary: { color: '#ffffff' },
    outline: { color: '#1a4960' },
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled || isLoading}
      style={({ pressed }) => [
        baseStyle,
        sizeStyles[size],
        variantStyles[variant],
        { opacity: pressed || isDisabled ? 0.6 : 1 },
      ]}
      className={className}
    >
      {isLoading ? (
        <ActivityIndicator color={variant === 'outline' ? '#1a4960' : '#ffffff'} />
      ) : (
        <Text style={[{ fontWeight: '600' }, textStyles[variant]]}>
          {children}
        </Text>
      )}
    </Pressable>
  );
}
