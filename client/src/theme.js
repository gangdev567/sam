import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: [
      "Sam3KRFont",
      "DOSSaemmul",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
  components: {
    MuiTypography: {
      defaultProps: {
        fontFamily: "DOSSaemmul",
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: "DOSSaemmul",
        },
      },
    },
    // 다른 컴포넌트들에 대해서도 동일한 방식으로 설정
  },
});

export default theme;
