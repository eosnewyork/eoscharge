import React, {Component} from 'react'
import ListItemText from '@material-ui/core/ListItemText';

class ActionCount extends Component {
  shouldComponentUpdate(nextProps) {
    return (nextProps.avgCpu !== this.props.avgCpu || 
            nextProps.availCpu !== this.props.availCpu)
  }

  render() {
    const {avgCpu, availCpu} = this.props
    const numActions = availCpu / avgCpu

    return (
      <React.Fragment>
        <ListItemText primary="How many actions" secondary={numActions} />
      </React.Fragment>
    )
  }
}

export default ActionCount