export type TemplateStyle = {
  name: string;
  id: string;
  description: string;
  previewImage: string;
  styles: {
    header: {
      backgroundColor: string;
      textColor: string;
      borderColor: string;
      accentColor: string;
    };
    body: {
      backgroundColor: string;
      textColor: string;
      borderColor: string;
    };
    table: {
      headerBackground: string;
      headerTextColor: string;
      rowBackground: string;
      rowTextColor: string;
      borderColor: string;
      accentColor: string;
    };
    summary: {
      backgroundColor: string;
      textColor: string;
      borderColor: string;
      accentColor: string;
    };
  };
};

export const TEMPLATES: TemplateStyle[] = [
  {
    name: "Classic",
    id: "classic",
    description:
      "Elegant design with vintage-inspired colors and traditional layout",
    previewImage: "/templates/classic.png",
    styles: {
      header: {
        backgroundColor: "#f8f4e3",
        textColor: "#2c1810",
        borderColor: "#d4c4a7",
        accentColor: "#8b4513",
      },
      body: {
        backgroundColor: "#fffdf6",
        textColor: "#2c1810",
        borderColor: "#d4c4a7",
      },
      table: {
        headerBackground: "#f8f4e3",
        headerTextColor: "#2c1810",
        rowBackground: "#fffdf6",
        rowTextColor: "#2c1810",
        borderColor: "#d4c4a7",
        accentColor: "#8b4513",
      },
      summary: {
        backgroundColor: "#f8f4e3",
        textColor: "#2c1810",
        borderColor: "#d4c4a7",
        accentColor: "#8b4513",
      },
    },
  },
  {
    name: "Modern",
    id: "modern",
    description: "Sleek design with dark mode aesthetics and bold accents",
    previewImage: "/templates/modern.png",
    styles: {
      header: {
        backgroundColor: "#1a1a1a",
        textColor: "#ffffff",
        borderColor: "#333333",
        accentColor: "#00ff9d",
      },
      body: {
        backgroundColor: "#000000",
        textColor: "#ffffff",
        borderColor: "#333333",
      },
      table: {
        headerBackground: "#1a1a1a",
        headerTextColor: "#ffffff",
        rowBackground: "#000000",
        rowTextColor: "#ffffff",
        borderColor: "#333333",
        accentColor: "#00ff9d",
      },
      summary: {
        backgroundColor: "#1a1a1a",
        textColor: "#ffffff",
        borderColor: "#333333",
        accentColor: "#00ff9d",
      },
    },
  },
  {
    name: "Minimal",
    id: "minimal",
    description:
      "Ultra-clean design with monochromatic palette and ample whitespace",
    previewImage: "/templates/minimal.png",
    styles: {
      header: {
        backgroundColor: "#ffffff",
        textColor: "#333333",
        borderColor: "#e0e0e0",
        accentColor: "#666666",
      },
      body: {
        backgroundColor: "#ffffff",
        textColor: "#333333",
        borderColor: "#e0e0e0",
      },
      table: {
        headerBackground: "#f5f5f5",
        headerTextColor: "#333333",
        rowBackground: "#ffffff",
        rowTextColor: "#333333",
        borderColor: "#e0e0e0",
        accentColor: "#666666",
      },
      summary: {
        backgroundColor: "#f5f5f5",
        textColor: "#333333",
        borderColor: "#e0e0e0",
        accentColor: "#666666",
      },
    },
  },
  {
    name: "Professional",
    id: "professional",
    description:
      "Corporate design with navy blue accents and professional layout",
    previewImage: "/templates/professional.png",
    styles: {
      header: {
        backgroundColor: "#1e3a8a",
        textColor: "#ffffff",
        borderColor: "#1e40af",
        accentColor: "#f0f9ff",
      },
      body: {
        backgroundColor: "#ffffff",
        textColor: "#1e293b",
        borderColor: "#e2e8f0",
      },
      table: {
        headerBackground: "#1e3a8a",
        headerTextColor: "#ffffff",
        rowBackground: "#ffffff",
        rowTextColor: "#1e293b",
        borderColor: "#e2e8f0",
        accentColor: "#1e3a8a",
      },
      summary: {
        backgroundColor: "#1e3a8a",
        textColor: "#ffffff",
        borderColor: "#1e40af",
        accentColor: "#f0f9ff",
      },
    },
  },
  {
    name: "Creative",
    id: "creative",
    description: "Vibrant design with gradient accents and modern typography",
    previewImage: "/templates/creative.png",
    styles: {
      header: {
        backgroundColor: "#4f46e5",
        textColor: "#ffffff",
        borderColor: "#6366f1",
        accentColor: "#fbbf24",
      },
      body: {
        backgroundColor: "#ffffff",
        textColor: "#1e293b",
        borderColor: "#e2e8f0",
      },
      table: {
        headerBackground: "linear-gradient(135deg, #4f46e5, #6366f1)",
        headerTextColor: "#ffffff",
        rowBackground: "#ffffff",
        rowTextColor: "#1e293b",
        borderColor: "#e2e8f0",
        accentColor: "#fbbf24",
      },
      summary: {
        backgroundColor: "#4f46e5",
        textColor: "#ffffff",
        borderColor: "#6366f1",
        accentColor: "#fbbf24",
      },
    },
  },
];
