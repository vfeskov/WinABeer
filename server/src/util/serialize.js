export default function serialize (user) {
  return user && {
    email: user.email,
    watching: user.watching,
    repos: user.repos,
    alerted: user.alerted,
    frequency: user.frequency || 'realtime',
    checkAt: user.checkAt || 0,
    accessToken: user.accessToken || ''
  }
}
