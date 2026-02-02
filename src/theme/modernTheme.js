// E-ink Portfolio Theme
export const modernTheme = {
  colors: {
    // E-ink colors - Pure black and white
    primary: {
      50: "#FFFFFF",
      100: "#FFFFFF",
      200: "#FFFFFF",
      300: "#CCCCCC",
      400: "#999999",
      500: "#666666",
      600: "#333333",
      700: "#1A1A1A",
      800: "#0D0D0D",
      900: "#000000",
    },

    // Neutral colors - Black to white spectrum
    neutral: {
      50: "#FFFFFF",
      100: "#F5F5F5",
      200: "#E5E5E5",
      300: "#CCCCCC",
      400: "#999999",
      500: "#666666",
      600: "#333333",
      700: "#262626",
      800: "#1A1A1A",
      900: "#0D0D0D",
      950: "#000000",
    },

    // Accent colors - All converted to grayscale
    accent: {
      purple: "#000000",
      pink: "#000000",
      green: "#000000",
      orange: "#000000",
    },

    // Semantic colors - All black/white
    success: "#000000",
    warning: "#000000",
    error: "#000000",
    info: "#000000",
  },

  // Typography
  typography: {
    fontFamily: {
      primary: 'Georgia, Merriweather, "Times New Roman", serif',
      mono: '"Courier New", Courier, monospace',
    },
    fontSize: {
      xs: "0.75rem", // 12px
      sm: "0.875rem", // 14px
      base: "1rem", // 16px
      lg: "1.125rem", // 18px
      xl: "1.25rem", // 20px
      "2xl": "1.5rem", // 24px
      "3xl": "1.875rem", // 30px
      "4xl": "2.25rem", // 36px
      "5xl": "3rem", // 48px
      "6xl": "3.75rem", // 60px
      "7xl": "4.5rem", // 72px
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
    0: "0",
    1: "0.25rem", // 4px
    2: "0.5rem", // 8px
    3: "0.75rem", // 12px
    4: "1rem", // 16px
    5: "1.25rem", // 20px
    6: "1.5rem", // 24px
    8: "2rem", // 32px
    10: "2.5rem", // 40px
    12: "3rem", // 48px
    16: "4rem", // 64px
    20: "5rem", // 80px
    24: "6rem", // 96px
    32: "8rem", // 128px
    40: "10rem", // 160px
    48: "12rem", // 192px
    56: "14rem", // 224px
    64: "16rem", // 256px
  },

  // Border radius - Minimal for e-ink
  borderRadius: {
    none: "0",
    sm: "0",
    base: "0",
    md: "1px",
    lg: "2px",
    xl: "2px",
    "2xl": "2px",
    "3xl": "2px",
    full: "0",
  },

  // Shadows - None for e-ink (flat design)
  shadows: {
    sm: "none",
    base: "none",
    md: "none",
    lg: "none",
    xl: "none",
    "2xl": "none",
    inner: "none",
    glow: "none",
  },

  // Breakpoints
  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  },

  // Z-index
  zIndex: {
    hide: -1,
    auto: "auto",
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
      fast: "150ms",
      normal: "300ms",
      slow: "500ms",
    },
    easing: {
      linear: "linear",
      ease: "ease",
      easeIn: "ease-in",
      easeOut: "ease-out",
      easeInOut: "ease-in-out",
      spring: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
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
    --shadow-2xl: ${modernTheme.shadows["2xl"]};
    --shadow-glow: ${modernTheme.shadows.glow};
    
    --radius-sm: ${modernTheme.borderRadius.sm};
    --radius-base: ${modernTheme.borderRadius.base};
    --radius-md: ${modernTheme.borderRadius.md};
    --radius-lg: ${modernTheme.borderRadius.lg};
    --radius-xl: ${modernTheme.borderRadius.xl};
    --radius-2xl: ${modernTheme.borderRadius["2xl"]};
    --radius-3xl: ${modernTheme.borderRadius["3xl"]};
    --radius-full: ${modernTheme.borderRadius.full};
  }
  
  [data-theme="dark"] {
    --color-bg-primary: #000000;
    --color-bg-secondary: #1A1A1A;
    --color-bg-tertiary: #262626;
    --color-text-primary: #FFFFFF;
    --color-text-secondary: #CCCCCC;
    --color-text-tertiary: #999999;
    --color-border: #FFFFFF;
  }
  
  [data-theme="light"] {
    --color-bg-primary: #FFFFFF;
    --color-bg-secondary: #F5F5F5;
    --color-bg-tertiary: #E5E5E5;
    --color-text-primary: #000000;
    --color-text-secondary: #333333;
    --color-text-tertiary: #666666;
    --color-border: #000000;
  }
`;

export default modernTheme;
