import { all, take, put, call, fork, select } from 'redux-saga/effects'
import * as actions from '../actions'
import * as api from '../services/api'
import * as cookie from '../services/cookie'

function* onApiRequest (actionGroup, api) {
  while (true) {
    const { type, ...params } = yield take(actionGroup.requestId)
    try {
      const response = yield call(api, params)
      yield put(actionGroup.success(response))
    } catch (error) {
      yield put(actionGroup.failure(error))
    }
  }
}

const apiActions = (
  'signIn signOut saveCheckAt saveFrequency saveWatching ' +
  'createRepo deleteRepo unwatch'
).split(' ')

const genericApiRequests = apiActions.reduce((r, id) =>
  r.concat(onApiRequest.bind(null, actions[id], api[id]))
, [])

function* onToggleWatching () {
  while (true) {
    yield take(actions.TOGGLE_WATCHING)
    const { watching } = yield select()
    yield put(actions.saveWatching.request(!watching))
  }
}

function* onAddRepo () {
  while (true) {
    const { repo } = yield take(actions.ADD_REPO)
    const { signedIn } = yield select()
    yield put(signedIn ?
      actions.createRepo.request(repo) :
      actions.addRepoToBuffer(repo))
  }
}

function* onRemoveRepo () {
  while (true) {
    const { repo } = yield take(actions.REMOVE_REPO)
    const { signedIn } = yield select()
    yield put(signedIn ?
      actions.deleteRepo.request(repo) :
      actions.removeRepoFromBuffer(repo))
  }
}

function* onSignedInChanges () {
  while (true) {
    yield take('*')
    const { signedIn, savedRepos, bufferRepos, shownRepos } = yield select()
    const newShownRepos = signedIn ? savedRepos : bufferRepos
    if (newShownRepos === shownRepos) { continue }
    yield put(actions.setShownRepos(newShownRepos))
  }
}

function* onStartup () {
  const { serverRendered } = yield select()
  if (serverRendered) { return }
  yield put(actions.fetchProfile.request())
  try {
    const profile = yield call(api.fetchProfile)
    yield put(actions.fetchProfile.success(profile))
  } catch (error) {
    yield put(actions.fetchProfile.failure(error))
  }
  const { signedIn, savedRepos, bufferRepos } = yield select()
  yield put(actions.setShownRepos(signedIn ? savedRepos : bufferRepos))
  if (signedIn || cookie.get('dontShowIntro')) {
    yield put(actions.setShowIntro('n'))
  } else {
    yield put(actions.setShowIntro('y'))
  }
}

export default function* root () {
  yield all([
    ...genericApiRequests.map(h => fork(h)),
    fork(onSignedInChanges),
    fork(onToggleWatching),
    fork(onAddRepo),
    fork(onRemoveRepo),
    fork(onStartup)
  ])
}
