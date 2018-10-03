import React, {Component} from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import FlashOnIcon from '@material-ui/icons/FlashOn'
import SdStorage from '@material-ui/icons/SdStorage'
import Typography from '@material-ui/core/Typography'
import Utils from './Utils'
import Badge from '@material-ui/core/Badge'
import CardActions from '@material-ui/core/CardActions'

const styles = theme => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.default,
  },
  cardMedia: {
    objectFit: 'scale-down'
  },
  cardContent: {
    flexGrow: 1,
  },
  badgeRoot: {
    height: '100%'
  },
  badge: {
    height: theme.spacing.unit * 5,
    width: theme.spacing.unit * 5,
    marginTop: -10,
    marginRight: -10,
    fontSize: '1rem'
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  stat: {
    display: 'flex'
  }
})

const desc = 'Using your <strong>$AVAIL_CPU</strong> worth of CPU, you are able to perform this action <strong>$COUNT</strong> times in the next 72 hours.'

class Action extends Component {

  render() {
    const {classes, action, availCpu} = this.props
    const count = Utils.computeCount(availCpu, action.avg_cpu_us)
    const badgeCount = count > 999 ? "999⁺" : count
    const cpu = Utils.formatQuantity(availCpu, 'cpu')
    const avgCpu = Utils.formatQuantity(action.avg_cpu_us, 'cpu')
    const avgNet = Utils.formatQuantity(action.avg_net_words, 'words')
    

    return (
      <Badge classes={{root: classes.badgeRoot, badge: classes.badge}} badgeContent={badgeCount} color="primary">
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Typography variant="title">
            {action._id.acct}
          </Typography>
          <Typography gutterBottom variant="subheading">
            {action._id.name}
          </Typography>
          <Typography component="p" dangerouslySetInnerHTML={Utils.createMarkup(cpu, count, desc)}>
          </Typography>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <div className={classes.stat}>
            <FlashOnIcon />
            <Typography component="p">
              {avgCpu}
            </Typography>
          </div>
          <div className={classes.stat}>
            <SdStorage />
            <Typography component="p">
              {avgNet}
            </Typography>
          </div>
        </CardActions>
      </Card>
      </Badge>
    )
  }
}

export default withStyles(styles)(Action)