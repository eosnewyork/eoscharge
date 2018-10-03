import React, {Component} from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import Utils from './Utils'
import Badge from '@material-ui/core/Badge'

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
    const badgeCount = count > 999 ? "999⁺" : count
    const cpu = Utils.formatQuantity(availCpu, 'cpu')

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
          <Typography variant="title">
            {action.title}
          </Typography>
          <Typography gutterBottom variant="subheading">
            {action.subtitle}
          </Typography>
          <Typography component="p" dangerouslySetInnerHTML={Utils.createMarkup(cpu, count, action.description)}>
          </Typography>
        </CardContent>
      </Card>
      </Badge>
    )
  }
}

export default withStyles(styles)(PopularAction)