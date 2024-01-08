import {
    useColorScheme,
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

export default ModeSelect

