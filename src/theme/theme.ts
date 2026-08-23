// Sovereign Shield Directive - Theme Tokens (Fully compatible with Light & Dark components)

export const colors = {
  // Main Canvas & Backgrounds
  background: '#f5f6f8',
  backgroundLight: '#f8f9fa',
  backgroundDark: '#121317',
  cardDark: '#18191b',
  
  // Surfaces (Light & Dark)
  surface: '#ffffff',
  surfaceCard: '#ffffff',
  surfaceVariant: '#f1f5f9',
  surfaceDim: '#121317',
  surfaceBright: '#38393d',
  surfaceContainerLowest: '#ffffff',
  surfaceContainerLow: '#f8fafc',
  surfaceContainer: '#ffffff',
  surfaceContainerHigh: '#f8fafc',
  surfaceContainerHighest: '#e2e8f0',

  // Dark Canvas Surfaces (For Login Screen & Hero)
  darkSurface: '#121317',
  darkSurfaceDim: '#121317',
  darkSurfaceContainer: '#1e1f23',
  darkSurfaceContainerHigh: '#292a2e',
  darkSurfaceContainerLow: '#1a1b1f',

  // Primary & Text
  primary: '#0f172a',
  onPrimary: '#ffffff',
  primaryContainer: '#e2e2e2',
  onPrimaryContainer: '#636565',
  primaryFixed: '#e2e2e2',
  primaryFixedDim: '#c6c6c7',

  // Secondary
  secondary: '#64748b',
  onSecondary: '#ffffff',
  secondaryContainer: '#f1f5f9',
  onSecondaryContainer: '#1e293b',
  secondaryFixed: '#e5e2e1',
  secondaryFixedDim: '#c8c6c5',
  onSecondaryFixed: '#1c1b1b',

  // Tertiary
  tertiary: '#ffffff',
  onTertiary: '#303030',
  tertiaryContainer: '#e4e2e1',
  onTertiaryContainer: '#656464',
  tertiaryFixed: '#e4e2e1',
  tertiaryFixedDim: '#c8c6c5',

  // Text & Content
  textPrimary: '#111827',
  textSecondary: '#4b5563',
  textMuted: '#6b7280',
  textLight: '#9ca3af',
  textWhite: '#ffffff',
  onSurface: '#0f172a',
  onSurfaceVariant: '#475569',
  onBackground: '#0f172a',
  
  // Borders & Outlines
  border: '#e5e7eb',
  borderLight: '#f3f4f6',
  borderDark: '#374151',
  outline: '#94a3b8',
  outlineVariant: '#e2e8f0',

  // Accent & Status Colors
  success: '#10b981',
  successText: '#15803d',
  successBg: '#ecfdf5',
  successBorder: '#bbf7d0',
  successDark: '#166534',

  warning: '#f59e0b',
  warningText: '#b45309',
  warningBg: '#fffbeb',
  warningBorder: '#fde68a',

  error: '#ef4444',
  errorCritical: '#ff453a',
  errorText: '#b91c1c',
  errorBg: '#fef2f2',
  errorBorder: '#fecaca',
  onErrorContainer: '#fee2e2',

  info: '#3b82f6',
  infoBg: '#eff6ff',
  infoBorder: '#bfdbfe',

  // Accents & Animations
  badgeOperational: '#10b981',
  scanLaser: '#00f2fe',
  scanGrid: 'rgba(0, 242, 254, 0.15)',

  // Button & Interactive
  buttonDark: '#0f172a',
  buttonText: '#ffffff',
  buttonLight: '#f3f4f6',
  buttonLightText: '#374151',
};

export const typography = {
  fontFamily: {
    regular: 'System',
    mono: 'monospace',
    bold: 'System',
  },
  sizes: {
    labelCaps: 12,
    labelMd: 13,
    bodySm: 14,
    bodyLg: 16,
    headlineMd: 20,
    headlineLgMobile: 24,
    headlineLg: 32,
  },
  lineHeights: {
    labelCaps: 16,
    labelMd: 18,
    bodySm: 20,
    bodyLg: 24,
    headlineMd: 28,
    headlineLgMobile: 32,
    headlineLg: 40,
  },
  letterSpacing: {
    labelCaps: 0.6,
    headlineLg: -0.5,
  },
};

export const rounded = {
  sm: 2,
  default: 4,
  md: 6,
  lg: 8,
  xl: 12,
  full: 9999,
};

export const spacing = {
  unit: 4,
  stackSm: 8,
  stackMd: 16,
  stackLg: 32,
  gutter: 16,
  marginMobile: 20,
  containerMaxWidth: 1200,
};
