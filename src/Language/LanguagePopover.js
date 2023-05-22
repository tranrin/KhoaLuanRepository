import { useState } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, MenuItem, Stack, IconButton, Popover } from '@mui/material';
import { useTranslation } from 'react-i18next';
import imgEngland from '../assets/icons/ic_flag_en.svg'
import imgVietNam from '../assets/icons/vietnam.png'
// ----------------------------------------------------------------------

const LANGS = [
  {
    value: 'en',
    label: 'English',
    icon: imgEngland,
  },
  {
    value: 'vi',
    label: 'Vietnamese',
    icon: imgVietNam,
  },

];

// ----------------------------------------------------------------------

export default function LanguagePopover() {
  const [open, setOpen] = useState(null);
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);
  const [selected, setSeleted] = useState(LANGS[1]);
  const handleLanguageChange = (lang) => { 
    i18n.changeLanguage(lang.value);
    setLanguage(lang.value);
    setSeleted(lang);
    handleClose();
  };
  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          padding: 0,
          width:44,
          height: 44,
          ...(open && {
            bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.focusOpacity),
          }),
        }}
      >
        <img src={selected.icon} alt={selected.label}  style={{width :(selected.value == 'vi' ? '70%' : '')}} />
      </IconButton>
     
      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Stack spacing={0.75}>
          {LANGS.map((option) => (
            <MenuItem key={option.value} selected={option.value == selected.value}  onClick={() => handleLanguageChange(option)}  >
              <Box component="img" alt={option.label} src={option.icon} sx={{ width: 28, mr: 2 }} />

              {option.label}
            </MenuItem>
          ))}
        </Stack>
      </Popover>
    </>
  );
}
