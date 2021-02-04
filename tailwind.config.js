module.exports = {
  future: {
    defaultLineHeights: true,
    purgeLayersByDefault: true,
    removeDeprecatedGapUtilities: true,
    standardFontWeights: true
  },
  purge: {
    content: ["./src/**/*.njk", "./src/**/*.js", "./src/**/*.svg"]
  },
  plugins: [require("tailwindcss-debug-screens")],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "992px",
      xl: "1440px"
    },
    fontFamily: {
      sans: ["Open Sans"]
    },
    fontSize: false,
    colors: {
      thunder: "#323132",
      shipGrey: "#414042",
      abbey: "#58595B",
      nevada: "#6D6E72",
      aluminium: "#A6A8AB",
      silver: "#BBBDBF",
      iron: "#D0D2D3",
      mercury: "#E5E5E5",
      gallery: "#EAEAEA",
      alabaster: "#F9F9F9",
      haze: "#F0F1F1",
      white: "#FFFFFF",
      matisse: "#206095",
      blumine: "#1A4C76",
      salem: "#0F8243",
      lilyWhite: "#edf4f0",
      poppy: "#D32F2F",
      carrot: "#FF9933",
      astral: "#3B7A9E",
      blue: "#3a7db4",
      indigo: "#560072",
      prim: "#E8DFF0",
      pineappleYellow: "#fbc900",
      nightBlue: "#003c57"
    }
  }
}
