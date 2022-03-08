import { Box, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel } from "@mui/material";
import { Checkbox } from "../../components/core";

export function CheckboxesPage(): JSX.Element {
  const error = true;

  return (
    <div className="page-content page-content__design-system">
      <Box>
        <FormControl component="fieldset" variant="standard" error={error}>
          <FormLabel component="legend">Checkbox</FormLabel>
          <FormGroup>
            <FormControlLabel control={<Checkbox name="default" />} label="Default " />
            <FormControlLabel control={<Checkbox disabled name="disabled" />} label="Disabled" />
            <FormControlLabel control={<Checkbox defaultChecked name="selected" />} label="Selected" />
            <FormControlLabel control={<Checkbox defaultChecked disabled name="disabled-selected" />} label="Disabled Selected" />
            <Box position="relative">
              <FormControlLabel control={<Checkbox name="default" />} label="Error " />
              {error && <FormHelperText sx={{ position: "relative", bottom: 14 }}>Error message</FormHelperText>}
            </Box>
            <FormControlLabel control={<Checkbox name="focused" className="Mui-focusVisible" />} label="Focused " />
          </FormGroup>
        </FormControl>
      </Box>
    </div>
  );
}
