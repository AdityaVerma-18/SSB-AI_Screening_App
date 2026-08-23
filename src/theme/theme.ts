// Design Tokens based on the 5 Stitch Screens (Light Theme + Dark Login & Hero)

export const colors = {
  // Main Canvas
  background: '#f5f6f8',
  backgroundLight: '#f8f9fa',
  backgroundDark: '#121317',
  cardDark: '#18191b',
  
  // Surfaces
  surface: '#ffffff',
  surfaceCard: '#ffffff',
  surfaceVariant: '#f1f5f9',
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
  textPrimary: '#111827',
  textSecondary: '#4b5563',
  textMuted: '#6b7280',
  textLight: '#9ca3af',
  textWhite: '#ffffff',
  
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
  errorText: '#b91c1c',
  errorBg: '#fef2f2',
  errorBorder: '#fecaca',

  info: '#3b82f6',
  infoBg: '#eff6ff',
  infoBorder: '#bfdbfe',

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
