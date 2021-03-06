import React, { Component } from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Button from '@material-ui/core/Button'

export default class UnwatchMessage extends Component {
  constructor (props) {
    super(props)
    this.state = { open: true }
  }

  render () {
    const { unwatchMessage, watching } = this.props
    if (!unwatchMessage) { return null }
    const { success, sameUser } = unwatchMessage
    const message = success ?
      'No more emails for you!' :
      'Couldn\'t stop them emails, sorry :('
    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={this.state.open}
        ContentProps={{ 'aria-describedby': 'message-id' }}
        message={<span id="message-id">{message}</span>}
        action={[
          !success || !sameUser || watching ? null : (
            <Button key="undo" color="secondary" dense="true" onClick={() => this.undo()}>
              UNDO
            </Button>
          ),
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={() => this.setState({ open: false })}
          >
            <CloseIcon />
          </IconButton>
        ]}
      />
    )
  }

  undo () {
    this.props.toggleWatching()
    this.setState({ open: false })
  }
}
