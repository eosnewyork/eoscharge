import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Utils from './Utils'
import Badge from '@material-ui/core/Badge'
import ActionText from './ActionText'
import ActionFooter from './ActionFooter'

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
  }
})

class Action extends Component {

  render() {
    const {classes, action, availCpu} = this.props
    const count = Utils.computeCount(availCpu, action.avg_cpu_us)
    const badgeCount = Utils.badgeCount(count)
    const avgCpu = Utils.formatQuantity(action.avg_cpu_us, 'cpu', this.props.network)
    const avgNet = Utils.formatQuantity(action.avg_net_words, 'words', this.props.network)
    

    return (
      <Badge classes={{root: classes.badgeRoot, badge: classes.badge}} badgeContent={badgeCount} color="primary">
        <Card className={classes.card}>
          <CardContent className={classes.cardContent}>
            <ActionText 
              acctName={action._id.acct}
              title={action._id.acct} 
              subtitle={action._id.name} 
              topText={Utils.createTopMarkup(avgCpu, avgNet, action._id.name, action._id.acct)}
              bottomText={Utils.createBottomMarkup(action._id.name, count)} 
            />
          </CardContent>
          <ActionFooter avgCpu={avgCpu} avgNet={avgNet} />
        </Card>
      </Badge>
    )
  }
}

export default withStyles(styles)(Action)
