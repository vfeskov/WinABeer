import { combineReducers } from 'redux'
import repoAdd from './repoAdd'
import watching from './watching'
import email from './email'
import bufferRepos from './bufferRepos'
import savedRepos from './savedRepos'
import signedIn from './signedIn'
import shownRepos from './shownRepos'
import unwatchMessage from './unwatchMessage'
import accessToken from './accessToken'
import frequency from './frequency'
import checkAt from './checkAt'
import serverRendered from './serverRendered'
import starsOpen from './starsOpen'
import alerted from './alerted'
import showIntro from './showIntro'
import suggestions from './suggestions'
import starsWorking from './starsWorking'
import watchingStars from './watchingStars'
import unwatchingNonstars from './unwatchingNonstars'
import selectedRepo from './selectedRepo'

export default combineReducers({
  email,
  repoAdd,
  bufferRepos,
  savedRepos,
  signedIn,
  shownRepos,
  watching,
  unwatchMessage,
  accessToken,
  frequency,
  checkAt,
  serverRendered,
  starsOpen,
  alerted,
  showIntro,
  suggestions,
  starsWorking,
  watchingStars,
  unwatchingNonstars,
  selectedRepo
})
