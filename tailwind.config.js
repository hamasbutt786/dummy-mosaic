/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  // darkMode: false,
  theme: {
    extend: {
      colors: {
        // primary: "#047857"
        emerald: colors.emerald,
        fuchsia: colors.fuchsia,
        "th-background": "var(--background)",
        "th-background-secondary": "var(--background-secondary)",
        "th-foreground": "var(--foreground)",
        "th-primary-dark": "var(--primary-dark)",
        "th-primary-medium": "var(--primary-medium)",
        "th-primary-light": "var(--primary-light)",
        "th-accent-dark": "var(--accent-dark)",
        "th-accent-medium": "var(--accent-medium)",
        "th-accent-light": "var(--accent-light)",

        "main-bg": "var(--mainbg)",
        btnBackground: "var(--btnbg)",
        navborder: "var(--sidebarBorder)",
        "btn-apperance-bg": "var(--btnapperancebg)",
        "text-apperance": "var(--text-apperance)",
        hoverbackground: "var(--hoverbg)",
        "sidebar-bg": "var(--sidebar-bg)",
        "nav-element": "var(--navigation-bg)",
        "sidebar-headings": "var(--sidebar-headings)",
        "sidebar-sub-heads": "var(--sidebar-sub-headings)",
        "hover-sidebar-bg": "var(--hover-bg-sidebar)",
        "summary-cards": "var(--bgcards)",
        "card-heading": "var(--cardHeading)",
        "card-subheading": "var(--card-subheading)",
        'summary-headline':"var(--card-summary-headline)",
        'profile-hover':"var( --profile-setting-hover)",
        'profile-hover-text':"var(--profile-setting-hover-text)",
        'table-header':"var(--table-background)",
        'dropdown-bg':"var(--dropdown-bg)",
        'selecteddropdown':"var(--dropdown-selected-bg)",
        'selected-text':"var( --dropdown-innertext)",
      },
    },
  },
  plugins: [],
};
