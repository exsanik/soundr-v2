import { Overrides as CoreOverrides } from '@material-ui/core/styles/overrides'
import {
  PaginationClassKey,
  PaginationItemClassKey,
  AutocompleteClassKey
} from '@material-ui/lab'
import { CSSProperties } from '@material-ui/styles'

import palette from './palette'

interface Overrides extends CoreOverrides {
  MuiPagination?:
    | Partial<Record<PaginationClassKey, CSSProperties | (() => CSSProperties)>>
    | undefined
  MuiPaginationItem?:
    | Partial<
        Record<PaginationItemClassKey, CSSProperties | (() => CSSProperties)>
      >
    | undefined
  MuiAutocomplete?:
    | Partial<
        Record<AutocompleteClassKey, CSSProperties | (() => CSSProperties)>
      >
    | undefined
}

const overrides: Overrides = {
  MuiCssBaseline: {
    '@global': {
      'body, #root': {
        height: '100%',
        WebkitOverflowScrolling: 'auto'
      },
      '.overflowHidden': {
        overflow: 'hidden'
      },
      '@media(min-width: 1441px)': {
        '.bgSellMachine': {
          '& .bgPosition': {
            backgroundSize: 'calc(100% - 15px)'
          }
        }
      },
      body: {
        overflowX: 'hidden',
        marginBottom: 0
      },
      img: {
        width: '100%',
        height: '100%'
      },
      a: {
        textDecoration: 'none'
      },
      ul: {
        margin: '5px 0',
        fontSize: '16px',
        lineHeight: '26px',
        padding: '0 20px'
      },
      ol: {
        margin: '5px 0'
      },
      '.select.select-theme-default': {
        display: 'none !important'
      }
    }
  },

  // Button
  MuiButton: {
    root: {
      fontWeight: 400,
      borderRadius: 4,
      minWidth: 224,
      minHeight: 56,

      '@media(max-width: 500px)': {
        minWidth: 'auto'
      }
    },
    label: {
      fontSize: 14,
      lineHeight: '26px'
    },
    contained: {
      backgroundColor: '#fff',
      boxShadow: 'none'
    },
    sizeSmall: {
      minWidth: 110
    },
    sizeLarge: {
      minHeight: 56,
      padding: '13px 20px'
    }
  },

  // IconButton
  MuiIconButton: {
    root: {
      '& .MuiIconButton-label': {
        position: 'relative'
      }
    },
    colorSecondary: {
      color: palette.text?.disabled,

      '&:hover': {
        backgroundColor: 'rgba(78, 62, 68, 0.04)'
      }
    }
  },

  // ButtonGroup
  MuiButtonGroup: {
    grouped: {
      minWidth: 56,
      minHeight: 56,

      '@media(max-width: 360px)': {
        minWidth: 49,
        minHeight: 49
      }
    }
  },

  // Tab
  MuiTabs: {
    flexContainer: {
      justifyContent: 'space-between'
    }
  },
  MuiTab: {
    root: {
      minHeight: 53,
      fontSize: 18,
      textTransform: 'none',
      minWidth: 'auto!important',
      fontWeight: 400
    },
    textColorPrimary: {
      color: palette.text?.primary,

      '&.Mui-selected': {
        fontWeight: 500
      }
    }
  },

  // Card
  MuiCard: {
    root: {
      boxShadow: 'none',
      borderRadius: '4px'
    }
  },
  MuiCardContent: {
    root: {
      padding: '15px',

      '&:last-child': {
        paddingBottom: 15
      }
    }
  },

  // Expansion Panel | Accordion
  MuiExpansionPanel: {
    root: {
      boxShadow: 'none',
      borderBottom: `1px solid ${palette.custom.border}`,

      '&:before': {
        content: ''
      },

      '&.Mui-expanded': {
        margin: '0'
      }
    }
  },
  MuiExpansionPanelSummary: {
    root: {
      padding: 0,

      '&.Mui-expanded': {
        minHeight: 50
      }
    },
    content: {
      margin: '27px 0',

      '&.Mui-expanded': {
        margin: '27px 0'
      }
    }
  },
  MuiExpansionPanelDetails: {
    root: {
      paddingRight: 0,
      paddingBottom: 60,
      paddingLeft: 0
    }
  },
  MuiAccordion: {
    root: {
      boxShadow: 'none',
      borderBottom: `1px solid ${palette.custom.border}`,

      '&:before': {
        content: ''
      },

      '&.Mui-expanded': {
        margin: '0'
      }
    }
  },
  MuiAccordionSummary: {
    root: {
      padding: 0,

      '&.Mui-expanded': {
        minHeight: 50
      }
    },
    content: {
      margin: '27px 0',

      '&.Mui-expanded': {
        margin: '27px 0'
      }
    }
  },
  MuiAccordionDetails: {
    root: {
      paddingRight: 0,
      paddingBottom: 60,
      paddingLeft: 0
    }
  },

  // Bottom Navigation
  MuiBottomNavigationAction: {
    wrapper: {
      '& > img': {
        maxWidth: '23px',
        marginBottom: 6,
        minHeight: 23
      }
    },
    label: {
      fontSize: 14
    }
  },

  // Drawer
  MuiDrawer: {
    root: { zIndex: 2 },
    paper: {}
  },

  // Pagination
  MuiPagination: {
    ul: {
      justifyContent: 'center',

      '& li:first-child a, li:first-child button, li:last-child a, li:last-child button': {
        border: 0,
        width: 15,
        minWidth: 15
      }
    }
  },
  MuiPaginationItem: {
    root: {
      borderRadius: 'inherit',
      height: 36,
      minWidth: 36,
      fontSize: 16,
      margin: '0 7.5px',
      border: `1px solid ${palette.custom.border}`
    },
    page: {
      '&.Mui-selected': {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        backgroundColor: palette.primary.main,
        color: '#fff',

        '&:hover': {
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          // @ts-ignore
          backgroundColor: `${palette.primary.main} !important`
        }
      }
    },
    ellipsis: {
      border: 0
    },
    icon: {
      fontSize: 25
    }
  },

  // Chip
  MuiChip: {
    root: {
      height: 36,
      fontSize: 16,
      padding: '8.5px 20px',
      maxWidth: 300
    },
    label: {
      paddingLeft: 0,
      paddingRight: 0
    },
    deleteIcon: {
      marginLeft: 10,
      marginRight: '0!important'
    }
  },

  // Dialog
  MuiDialogTitle: {
    root: {
      padding: '30px 15px 10px'
    }
  },
  MuiDialogContent: {
    root: {
      padding: '0 15px 15px',
      overflowX: 'hidden',

      '&::-webkit-scrollbar': {
        '@media(max-width: 600px)': {
          display: 'none'
        }
      }
    }
  },

  // Form
  MuiFormLabel: {
    root: {
      color: palette.text?.primary
    }
  },
  MuiFormHelperText: {
    root: {
      '&.Mui-disabled': {
        color: palette.text?.hint
      },

      '&.Mui-error': {
        color: '#f44336 !important'
      }
    }
  },

  // TextField
  MuiTextField: {
    root: {
      display: 'block'
    }
  },

  // InputBase
  MuiInputBase: {
    root: {
      // background: '#fff',

      '& .Mui-disabled': {
        color: 'rgba(0, 0, 0, .23)',
        width: 'calc(100% - 28px)'
      }
    }
  },

  // OutlinedInput
  MuiOutlinedInput: {
    root: {
      backgroundColor: '#fff'
    }
  },

  // Autocomplete
  MuiAutocomplete: {
    inputRoot: {
      minHeight: 56
    },
    tag: {
      height: 32,
      padding: '8px 10px',
      backgroundColor: '#F8F9FA',
      borderRadius: 4,
      border: '1px solid #CBD0D5'
    },
    popper: {
      zIndex: 1303
    }
  },

  // Switch
  MuiSwitch: {
    root: {
      height: 21,
      padding: '3.5px 12px'
    },
    switchBase: {
      padding: '0 9px',

      '&:hover': {
        backgroundColor: 'inherit'
      }
    }
  },

  // Popover
  MuiPopover: {
    paper: {
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.15)'
    }
  },

  // ListItem
  MuiListItem: {
    root: {
      outline: 'none'
    }
  },

  // Divider
  MuiDivider: {
    root: {
      backgroundColor: '#5893CE'
    }
  },

  // Paper
  MuiPaper: {
    outlined: {
      border: `1px solid ${palette.custom.border}`
    }
  },

  // Menu
  MuiMenu: {
    list: {
      maxHeight: 240
    }
  }
}

export default overrides
