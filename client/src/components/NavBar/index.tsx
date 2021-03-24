import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@mdi/react'
import { mdiAccountCircle, mdiMenu } from '@mdi/js'
import { useAuthState } from 'react-firebase-hooks/auth'
import firebase from 'firebase/app'
import { auth } from 'src/firebase'
import { useCallback } from 'react'

const NavBar = () => {
  const [user] = useAuthState(auth)

  const signInWithGoogle = useCallback(() => {
    const provider = new firebase.auth.GoogleAuthProvider()
    auth.signInWithPopup(provider)
  }, [])

  const classes = useStyles()

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <Icon path={mdiMenu} size={1} />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Betteran
          </Typography>
          {!user ? (
            <Button color="inherit" onClick={signInWithGoogle}>
              Login
            </Button>
          ) : (
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
              onClick={() => auth.signOut()}
            >
              <Icon path={mdiAccountCircle} size={1} />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
    </div>
  )
}

const useStyles = makeStyles(({ spacing }: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  })
)

export default NavBar
