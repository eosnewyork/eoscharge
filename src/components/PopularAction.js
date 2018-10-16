import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Utils from './Utils'
import Badge from '@material-ui/core/Badge'
import ActionText from './ActionText'
import ActionFooter from './ActionFooter'

const styles = theme => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
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

class PopularAction extends Component {

  render() {
    const {classes, action, availCpu} = this.props
    const count = Utils.computeCount(availCpu, action.avg_cpu_us)
    const badgeCount = Utils.badgeCount(count)
    const avgCpu = Utils.formatQuantity(action.avg_cpu_us, 'cpu')
    const avgNet = Utils.formatQuantity(action.avg_net_words, 'words')

    return (
      <Badge classes={{root: classes.badgeRoot, badge: classes.badge}} badgeContent={badgeCount} color="primary">
        <Card className={classes.card}>
          <CardMedia
            className={classes.cardMedia}
            component="img"
            image={`./images/${action.img}`}
            height="140"
            title="Image title"
          />
          <CardContent className={classes.cardContent}>
            <ActionText 
              title={action.title} 
              subtitle={action.subtitle} 
              topText={Utils.createTopMarkup(avgCpu, avgNet, action.subtitle, action.title)}
              bottomText={Utils.createBottomMarkup(action.subtitle, count)}
            />
          </CardContent>
          <ActionFooter avgCpu={avgCpu} avgNet={avgNet} />
        </Card>
      </Badge>
    )
  }
}

export default withStyles(styles)(PopularAction)