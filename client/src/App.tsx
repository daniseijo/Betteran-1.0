import { Typography } from '@material-ui/core'
import { useAuthState } from 'react-firebase-hooks/auth'
import NavBar from './components/NavBar'
import { auth } from './firebase'

const App = () => {
  const [user] = useAuthState(auth)

  const name = user?.displayName

  return (
    <>
      <NavBar />
      {name && <Typography variant="h2">Bienvenido, {name}</Typography>}
    </>
  )
}

export default App
