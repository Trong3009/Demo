import {
  Button,
  Typography,
  useColorScheme,
  useMediaQuery,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Box,
} from "@mui/material";
import {
  LightMode,
  DarkModeOutlined,
  SettingsBrightness,
} from "@mui/icons-material";

function ModeSelect() {
  const { mode, setMode } = useColorScheme();

  const handleChange = (event) => {
    const selectedMode = event.target.value;
    setMode(selectedMode);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="label-select-dark-light-mode">Mode</InputLabel>
      <Select
        labelId="label-select-dark-light-mode"
        id="select-dark-light-mode"
        value={mode}
        label="Mode"
        onChange={handleChange}
      >
        <MenuItem value="light">
          <Box sx={{ display: "flex", alignItems: "center", columnGap: "8px" }}>
            <LightMode fontSize="small" /> Light
          </Box>
        </MenuItem>
        <MenuItem value="dark">
          <Box sx={{ display: "flex", alignItems: "center", columnGap: "8px" }}>
            <DarkModeOutlined fontSize="small" /> Dark
          </Box>
        </MenuItem>
        <MenuItem value="system">
          <Box sx={{ display: "flex", alignItems: "center", columnGap: "8px" }}>
            <SettingsBrightness fontSize="small" /> System
          </Box>
        </MenuItem>
      </Select>
    </FormControl>
  );
}
function ModeToggle() {
  const { mode, setMode } = useColorScheme();
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const prefersLightMode = useMediaQuery("(prefers-color-scheme: light)");
  console.log("prefersDarkMode", prefersDarkMode);
  console.log("prefersLightMode", prefersLightMode);
  return (
    <Button
      onClick={() => {
        setMode(mode === "light" ? "dark" : "light");
      }}
    >
      {mode === "light" ? "Turn dark" : "Turn light"}
    </Button>
  );
}

function App() {
  return (
    <>
      <ModeSelect></ModeSelect>
      <hr />
      <ModeToggle></ModeToggle>
      <hr />
      <div>trongnguyenquy</div>
      <Typography variant="body2" color="text.secondary">
        sdasdasd
      </Typography>
      <Button variant="text">Text</Button>
      <Button variant="contained">Contained</Button>
      <Button variant="outlined">Outlined</Button>
    </>
  );
}

export default App;
