// Sovereign Shield Directive - Comprehensive Theme Engine (Light & Dark Modes)

export interface AppTheme {
  isDark: boolean;
  background: string;
  backgroundLight: string;
  backgroundDark: string;
  backgroundSecondary: string;
  cardDark: string;
  
  surface: string;
  surfaceCard: string;
  surfaceVariant: string;
  surfaceDim: string;
  surfaceBright: string;
  surfaceContainer: string;
  surfaceContainerLowest: string;
  surfaceContainerLow: string;
  surfaceContainerHigh: string;
  surfaceContainerHighest: string;
  
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  textLight: string;
  textWhite: string;
  onSurface: string;
  onSurfaceVariant: string;
  onBackground: string;
  
  border: string;
  borderLight: string;
  borderDark: string;
  outline: string;
  outlineVariant: string;
  
  inputBg: string;
  inputBorder: string;
  inputText: string;
  
  navBg: string;
  navBorder: string;
  headerBg: string;
  headerBorder: string;
  
  primary: string;
  onPrimary: string;
  primaryContainer: string;
  onPrimaryContainer: string;
  secondary: string;
  onSecondary: string;
  secondaryContainer: string;
  onSecondaryContainer: string;
  tertiary: string;
  onTertiary: string;
  
  heroBg: string;
  heroText: string;
  heroSubtext: string;
  heroBtnBg: string;
  heroBtnText: string;

  // Status & Badges
  success: string;
  successText: string;
  successBg: string;
  successBorder: string;
  successDark: string;

  warning: string;
  warningText: string;
  warningBg: string;
  warningBorder: string;

  error: string;
  errorCritical: string;
  errorText: string;
  errorBg: string;
  errorBorder: string;
  onErrorContainer: string;

  info: string;
  infoBg: string;
  infoBorder: string;

  badgeOperational: string;
  scanLaser: string;
  scanGrid: string;
}

export const lightTheme: AppTheme = {
  isDark: false,
  background: '#f5f6f8',
  backgroundLight: '#f8f9fa',
  backgroundDark: '#121317',
  backgroundSecondary: '#f8f9fa',
  cardDark: '#18191b',

  surface: '#ffffff',
  surfaceCard: '#ffffff',
  surfaceVariant: '#f1f5f9',
  surfaceDim: '#121317',
  surfaceBright: '#38393d',
  surfaceContainer: '#ffffff',
  surfaceContainerLowest: '#ffffff',
  surfaceContainerLow: '#f8fafc',
  surfaceContainerHigh: '#f1f5f9',
  surfaceContainerHighest: '#e2e8f0',

  textPrimary: '#111827',
  textSecondary: '#4b5563',
  textMuted: '#6b7280',
  textLight: '#9ca3af',
  textWhite: '#ffffff',
  onSurface: '#111827',
  onSurfaceVariant: '#475569',
  onBackground: '#111827',

  border: '#e5e7eb',
  borderLight: '#f3f4f6',
  borderDark: '#d1d5db',
  outline: '#94a3b8',
  outlineVariant: '#e2e8f0',

  inputBg: '#f9fafb',
  inputBorder: '#d1d5db',
  inputText: '#111827',

  navBg: '#ffffff',
  navBorder: '#e5e7eb',
  headerBg: '#ffffff',
  headerBorder: '#e5e7eb',

  primary: '#0f172a',
  onPrimary: '#ffffff',
  primaryContainer: '#e2e2e2',
  onPrimaryContainer: '#636565',
  secondary: '#64748b',
  onSecondary: '#ffffff',
  secondaryContainer: '#f1f5f9',
  onSecondaryContainer: '#1e293b',
  tertiary: '#ffffff',
  onTertiary: '#303030',

  heroBg: '#18191b',
  heroText: '#ffffff',
  heroSubtext: '#d1d5db',
  heroBtnBg: '#ffffff',
  heroBtnText: '#111827',

  success: '#10b981',
  successText: '#15803d',
  successBg: '#f0fdf4',
  successBorder: '#bbf7d0',
  successDark: '#166534',

  warning: '#f59e0b',
  warningText: '#b45309',
  warningBg: '#fefce8',
  warningBorder: '#fef08a',

  error: '#ef4444',
  errorCritical: '#ff453a',
  errorText: '#b91c1c',
  errorBg: '#fef2f2',
  errorBorder: '#fecaca',
  onErrorContainer: '#fee2e2',

  info: '#3b82f6',
  infoBg: '#eff6ff',
  infoBorder: '#bfdbfe',

  badgeOperational: '#10b981',
  scanLaser: '#00f2fe',
  scanGrid: 'rgba(0, 242, 254, 0.15)',
};

export const darkTheme: AppTheme = {
  isDark: true,
  background: '#121317',
  backgroundLight: '#18191b',
  backgroundDark: '#0d0e12',
  backgroundSecondary: '#0d0e12',
  cardDark: '#1a1b1f',

  surface: '#1e1f23',
  surfaceCard: '#1e1f23',
  surfaceVariant: '#292a2e',
  surfaceDim: '#121317',
  surfaceBright: '#38393d',
  surfaceContainer: '#1e1f23',
  surfaceContainerLowest: '#121317',
  surfaceContainerLow: '#1a1b1f',
  surfaceContainerHigh: '#292a2e',
  surfaceContainerHighest: '#343539',

  textPrimary: '#ffffff',
  textSecondary: '#c4c7c8',
  textMuted: '#8e9192',
  textLight: '#6b7280',
  textWhite: '#ffffff',
  onSurface: '#ffffff',
  onSurfaceVariant: '#94a3b8',
  onBackground: '#ffffff',

  border: '#343539',
  borderLight: '#292a2e',
  borderDark: '#444748',
  outline: '#64748b',
  outlineVariant: '#343539',

  inputBg: '#292a2e',
  inputBorder: '#444748',
  inputText: '#ffffff',

  navBg: '#1e1f23',
  navBorder: '#343539',
  headerBg: '#121317',
  headerBorder: '#292a2e',

  primary: '#ffffff',
  onPrimary: '#121317',
  primaryContainer: '#292a2e',
  onPrimaryContainer: '#ffffff',
  secondary: '#94a3b8',
  onSecondary: '#121317',
  secondaryContainer: '#292a2e',
  onSecondaryContainer: '#ffffff',
  tertiary: '#ffffff',
  onTertiary: '#121317',

  heroBg: '#1a1b1f',
  heroText: '#ffffff',
  heroSubtext: '#c4c7c8',
  heroBtnBg: '#ffffff',
  heroBtnText: '#121317',

  success: '#4cd964',
  successText: '#4cd964',
  successBg: '#183a24',
  successBorder: '#2d5f3f',
  successDark: '#143820',

  warning: '#ffcc00',
  warningText: '#ffcc00',
  warningBg: '#4a3615',
  warningBorder: '#7a5924',

  error: '#ffb4ab',
  errorCritical: '#ff453a',
  errorText: '#ffb4ab',
  errorBg: '#3d1818',
  errorBorder: '#6b2c2c',
  onErrorContainer: '#93000a',

  info: '#60a5fa',
  infoBg: '#1e293b',
  infoBorder: '#3b82f6',

  badgeOperational: '#34C759',
  scanLaser: '#00f2fe',
  scanGrid: 'rgba(0, 242, 254, 0.15)',
};

export const colors = lightTheme;

export const getTheme = (isDark: boolean): AppTheme => (isDark ? darkTheme : lightTheme);

export const typography = {
  fontFamily: {
    regular: 'System',
    mono: 'monospace',
    bold: 'System',
  },
  sizes: {
    labelCaps: 11,
    labelMd: 13,
    bodySm: 13,
    bodyLg: 15,
    headlineMd: 18,
    headlineLgMobile: 22,
    headlineLg: 28,
  },
  lineHeights: {
    labelCaps: 15,
    labelMd: 17,
    bodySm: 18,
    bodyLg: 22,
    headlineMd: 24,
    headlineLgMobile: 28,
    headlineLg: 34,
  },
  letterSpacing: {
    labelCaps: 0.5,
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
  stackMd: 14,
  stackLg: 24,
  gutter: 14,
  marginMobile: 16,
  containerMaxWidth: 1200,
};
