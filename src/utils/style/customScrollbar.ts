export const customScrollbar = {
  '@supports (-moz-appearance: none)': {
    scrollbarWidth: 'thin',
    scrollbarColor: `#1976d2 #fff`,
  },
  '&::-webkit-scrollbar': {
    width: '3px',
    height: '10px',
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: '#fff',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#1976d255',
    '&:hover': {
      backgroundColor: '#1976d2',
    }
  },
  '&::-webkit-scrollbar-button': {
    display: 'none !important',
  },
};

export const customDarkScrollbar = {
  '@supports (-moz-appearance: none)': {
    scrollbarWidth: 'thin',
    scrollbarColor: `#1976d2 #0F172A`,
  },
  '&::-webkit-scrollbar': {
    width: '5px',
    height: '5px',
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: '#0F172A',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#334155',
    borderRadius: '10px',
    '&:hover': {
      backgroundColor: '#475569',
    }
  },
  '&::-webkit-scrollbar-button': {
    display: 'none !important',
  },
};