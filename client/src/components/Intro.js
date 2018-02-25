import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import { CircularProgress } from 'material-ui/Progress'
import Tooltip from 'material-ui/Tooltip'

export class Intro extends Component {
  state = {
    // deciseconds passed
    ds: 0
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.showIntro === this.props.showIntro) { return }
    if (nextProps.showIntro === 'y') {
      this.timeoutId = setTimeout(this.scheduleIncDS, 4250)
    } else {
      clearTimeout(this.timeoutId)
      this.setState({ ds: 0 })
    }
  }

  scheduleIncDS = () => {
    this.timeoutId = setTimeout(this.incDS, 100)
  }

  incDS = () => {
    const ds = this.state.ds + 1
    this.setState({ ds })
    ds < 50 ? this.scheduleIncDS() : this.skip()
  }

  skip = e => {
    e && e.preventDefault()
    this.props.onSkip()
  }

  render () {
    const {
      container,
      avatar,
      author,
      commentContainer,
      comment,
      content,
      header,
      thelinkContainer,
      thelink,
      first,
      second,
      third,
      fourth,
      fifth,
      sixth,
      seventh,
      eighth
    } = this.props.classes
    // conditional animation class to make keyframes resettable
    const a = className => this.props.showIntro === 'y' ? className : ''
    return <div className={container}>
      <div className={`${commentContainer} ${a(first)}`}>
        <img className={avatar} alt="first guy's avatar" src="data:image/png;base64,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" />
        <div className={comment}>
          <div className={header}>
            <strong className={author}>some_dude</strong> commented
          </div>
          <div className={content}>
            <div className={a(second)}>I bet a BEER</div>
            <div className={a(third)}>that you can't</div>
            <div className={a(fourth)}>WATCH RELEASES</div>
            <div className={a(fifth)}>on GitHub</div>
          </div>
        </div>
      </div>
      <div className={`${commentContainer} ${a(sixth)}`}>
        <img className={avatar} alt="second guy's avatar" src="data:image/png;base64,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" />
        <div className={comment}>
          <div className={header}>
            <Tooltip title={'Not THAT torvalds though'}>
              <strong className={author}>torvalds</strong>
            </Tooltip>
            <span>&#32;commented</span>
          </div>
          <div className={content}>
            <span className={a(seventh)}>DUDE</span>
            <span className={a(eighth)}>&#32;→&#32;</span>
            <div className={`${a(eighth)} ${thelinkContainer}`}>
              <a href="" onClick={this.skip} className={thelink}>Win A Beer</a>
              <CircularProgress size={20} variant="static" value={this.state.ds * 2} />
            </div>
          </div>
        </div>
      </div>
    </div>
  }
}

export default withStyles(theme => {
  return {
    container: {
      fontSize: '14px',
      paddingTop: theme.spacing.unit,
      [theme.breakpoints.up('sm')]: {
        paddingTop: theme.spacing.unit * 2,
      }
    },
    avatar: {
      borderRadius: '3px',
      height: '44px',
      paddingRight: '16px',
      width: '44px'
    },
    commentContainer: {
      alignItems: 'flex-start',
      display: 'flex',
      margin: '1rem 1.5rem',
      lineHeight: '1.5rem'
    },
    header: {
      height: '44px',
      backgroundColor: '#f6f8fa',
      borderBottom: '1px solid #d1d5da',
      borderTopLeftRadius: '3px',
      borderTopRightRadius: '3px',
      color: '#586069',
      lineHeight: '44px',
      paddingLeft: '15px'
    },
    content: {
      padding: '15px'
    },
    comment: {
      border: '1px solid #d1d5da',
      borderRadius: '3px',
      flex: 1,
      position: 'relative',
      '&:before, &:after': {
        position: 'absolute',
        top: '11px',
        right: '100%',
        left: '-16px',
        display: 'block',
        width: 0,
        height: 0,
        pointerEvents: 'none',
        content: '" "',
        borderColor: 'transparent',
        borderStyle: 'solid solid outset',
      },
      '&:before': {
        borderWidth: '8px',
        borderRightColor: '#d1d5da'
      },
      '&:after': {
        marginTop: '1px',
        marginLeft: '2px',
        borderWidth: '7px',
        borderRightColor: '#f6f8fa'
      }
    },
    thelinkContainer: {
      alignItems: 'center',
      display: 'inline-flex'
    },
    thelink: {
      display: 'inline-block',
      marginRight: '0.5rem'
    },
    ...animated ({
      className: 'first'
    }),
    ...animatedSequence ({
      classNames: ['second', 'third', 'fourth', 'fifth'],
      delay: 750,
      delayAfterEach: 500
    }),
    ...animatedSequence ({
      classNames: ['sixth', 'seventh', 'eighth'],
      delay: 3000,
      delayAfterEach: 500
    })
  }

  function animated ({
    className,
    delay,
    duration = 200,
    from = { opacity: 0 },
    to = { opacity: 1 }
  }) {
    const keyframes = {
      '0%': from,
      '100%': to
    }
    if (delay > 0) {
      const step = (delay / (delay + duration) * 100).toFixed(2) + '%'
      keyframes[step] = from
    }
    return {
      [className]: {
        animation: `${className}kfs ${delay + duration}ms 1 linear`
      },
      [`@keyframes ${className}kfs`]: keyframes
    }
  }
  function animatedSequence ({ classNames, delay = 0, delayAfterEach, ...rest }) {
    return classNames.reduce((r, className, i) => ({
      ...animated({ className, delay: delay + i * delayAfterEach, ...rest }),
      ...r
    }), {})
  }
})(Intro)
