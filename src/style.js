import { createMuiTheme } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import './style.css'

const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#3B6064',
        faded: '#566C6E'
      },
      secondary: {
          main: '#CFB9AC',
          darker: '#A59287'
      }
    },
    typography: {
      fontFamily: 'Quicksand',
      fontWeightLight: 400,
      fontWeightRegular: 500,
      fontWeightMedium: 600,
      fontWeightBold: 700,
    }
})

const useStyles = makeStyles((theme) => {
    return {
        btn: {
            backgroundColor: 'secondary.main',
            '&:hover': {
                backgroundColor: 'var(--secondary-darker)'
            }
        },
        searchBar: {
            color: 'white'
        }
    }
})

export { useStyles, theme }