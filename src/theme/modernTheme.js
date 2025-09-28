// Modern Portfolio Theme
export const modernTheme = {
  colors: {
    // Primary colors
    primary: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      200: '#bae6fd',
      300: '#7dd3fc',
      400: '#38bdf8',
      500: '#0ea5e9',
      600: '#0284c7',
      700: '#0369a1',
      800: '#075985',
      900: '#0c4a6e',
    },

    // Neutral colors
    neutral: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#e5e5e5',
      300: '#d4d4d4',
      400: '#a3a3a3',
      500: '#737373',
      600: '#525252',
      700: '#404040',
      800: '#262626',
      900: '#171717',
      950: '#0a0a0a',
    },

    // Accent colors
    accent: {
      purple: '#8b5cf6',
      pink: '#ec4899',
      green: '#10b981',
      orange: '#f59e0b',
    },

    // Semantic colors
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
  },

  // Typography
  typography: {
    fontFamily: {
      primary: '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif',
      mono: '"JetBrains Mono", "Fira Code", monospace',
    },
    fontSize: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      base: '1rem',     // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.5rem',  // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem', // 36px
      '5xl': '3rem',    // 48px
      '6xl': '3.75rem', // 60px
      '7xl': '4.5rem',  // 72px
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },
    lineHeight: {
      tight: 1.25,
      snug: 1.375,
      normal: 1.5,
      relaxed: 1.625,
      loose: 2,
    },
  },

  // Spacing
  spacing: {
    0: '0',
    1: '0.25rem',   // 4px
    2: '0.5rem',    // 8px
    3: '0.75rem',   // 12px
    4: '1rem',      // 16px
    5: '1.25rem',   // 20px
    6: '1.5rem',    // 24px
    8: '2rem',      // 32px
    10: '2.5rem',   // 40px
    12: '3rem',     // 48px
    16: '4rem',     // 64px
    20: '5rem',     // 80px
    24: '6rem',     // 96px
    32: '8rem',     // 128px
    40: '10rem',    // 160px
    48: '12rem',    // 192px
    56: '14rem',    // 224px
    64: '16rem',    // 256px
  },

  // Border radius
  borderRadius: {
    none: '0',
    sm: '0.125rem',   // 2px
    base: '0.25rem',  // 4px
    md: '0.375rem',   // 6px
    lg: '0.5rem',     // 8px
    xl: '0.75rem',    // 12px
    '2xl': '1rem',    // 16px
    '3xl': '1.5rem',  // 24px
    full: '9999px',
  },

  // Shadows
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
    glow: '0 0 20px rgb(14 165 233 / 0.3)',
  },

  // Breakpoints
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  // Z-index
  zIndex: {
    hide: -1,
    auto: 'auto',
    base: 0,
    docked: 10,
    dropdown: 1000,
    sticky: 1100,
    banner: 1200,
    overlay: 1300,
    modal: 1400,
    popover: 1500,
    skipLink: 1600,
    toast: 1700,
    tooltip: 1800,
  },

  // Animation
  animation: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
    },
    easing: {
      linear: 'linear',
      ease: 'ease',
      easeIn: 'ease-in',
      easeOut: 'ease-out',
      easeInOut: 'ease-in-out',
      spring: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    },
  },
};

// CSS Variables for dynamic theming
export const cssVariables = `
  :root {
    --color-primary-50: ${modernTheme.colors.primary[50]};
    --color-primary-100: ${modernTheme.colors.primary[100]};
    --color-primary-200: ${modernTheme.colors.primary[200]};
    --color-primary-300: ${modernTheme.colors.primary[300]};
    --color-primary-400: ${modernTheme.colors.primary[400]};
    --color-primary-500: ${modernTheme.colors.primary[500]};
    --color-primary-600: ${modernTheme.colors.primary[600]};
    --color-primary-700: ${modernTheme.colors.primary[700]};
    --color-primary-800: ${modernTheme.colors.primary[800]};
    --color-primary-900: ${modernTheme.colors.primary[900]};
    
    --color-neutral-50: ${modernTheme.colors.neutral[50]};
    --color-neutral-100: ${modernTheme.colors.neutral[100]};
    --color-neutral-200: ${modernTheme.colors.neutral[200]};
    --color-neutral-300: ${modernTheme.colors.neutral[300]};
    --color-neutral-400: ${modernTheme.colors.neutral[400]};
    --color-neutral-500: ${modernTheme.colors.neutral[500]};
    --color-neutral-600: ${modernTheme.colors.neutral[600]};
    --color-neutral-700: ${modernTheme.colors.neutral[700]};
    --color-neutral-800: ${modernTheme.colors.neutral[800]};
    --color-neutral-900: ${modernTheme.colors.neutral[900]};
    --color-neutral-950: ${modernTheme.colors.neutral[950]};
    
    --color-accent-purple: ${modernTheme.colors.accent.purple};
    --color-accent-pink: ${modernTheme.colors.accent.pink};
    --color-accent-green: ${modernTheme.colors.accent.green};
    --color-accent-orange: ${modernTheme.colors.accent.orange};
    
    --font-family-primary: ${modernTheme.typography.fontFamily.primary};
    --font-family-mono: ${modernTheme.typography.fontFamily.mono};
    
    --shadow-sm: ${modernTheme.shadows.sm};
    --shadow-base: ${modernTheme.shadows.base};
    --shadow-md: ${modernTheme.shadows.md};
    --shadow-lg: ${modernTheme.shadows.lg};
    --shadow-xl: ${modernTheme.shadows.xl};
    --shadow-2xl: ${modernTheme.shadows['2xl']};
    --shadow-glow: ${modernTheme.shadows.glow};
    
    --radius-sm: ${modernTheme.borderRadius.sm};
    --radius-base: ${modernTheme.borderRadius.base};
    --radius-md: ${modernTheme.borderRadius.md};
    --radius-lg: ${modernTheme.borderRadius.lg};
    --radius-xl: ${modernTheme.borderRadius.xl};
    --radius-2xl: ${modernTheme.borderRadius['2xl']};
    --radius-3xl: ${modernTheme.borderRadius['3xl']};
    --radius-full: ${modernTheme.borderRadius.full};
  }
  
  [data-theme="dark"] {
    --color-bg-primary: var(--color-neutral-950);
    --color-bg-secondary: var(--color-neutral-900);
    --color-bg-tertiary: var(--color-neutral-800);
    --color-text-primary: var(--color-neutral-50);
    --color-text-secondary: var(--color-neutral-300);
    --color-text-tertiary: var(--color-neutral-400);
    --color-border: var(--color-neutral-800);
  }
  
  [data-theme="light"] {
    --color-bg-primary: var(--color-neutral-50);
    --color-bg-secondary: var(--color-neutral-100);
    --color-bg-tertiary: var(--color-neutral-200);
    --color-text-primary: var(--color-neutral-900);
    --color-text-secondary: var(--color-neutral-700);
    --color-text-tertiary: var(--color-neutral-600);
    --color-border: var(--color-neutral-200);
  }
`;

export default modernTheme;
