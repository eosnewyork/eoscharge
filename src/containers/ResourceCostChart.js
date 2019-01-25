import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import { inject, observer } from 'mobx-react'
import { withNamespaces } from 'react-i18next'
import { format } from 'd3-format'
import { Charts, ChartContainer, ChartRow, YAxis, BarChart, Resizable, styler, Baseline } from 'react-timeseries-charts'

const styles = theme => ({
  cardWrapper: {
    width: 800,
    margin: 'auto',
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },
  card: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    '& a': {
      textDecoration: 'none',
      color: theme.palette.primary.main,
    },
    '& svg': {
      '& text': {
        fill: '#323233 !important',
        fontFamily: '"Barlow Semi Condensed",sans-serif',
        fontSize: 13
      },
      '& .baseline text': {
        paintOrder: 'stroke',
        stroke: '#ffffff',
        strokeWidth: 3,
        fontSize: '20px !important',
        strokeLinecap: 'butt',
        strokeLinejoin: 'miter'
      }
    }
  },
  currentValue: {
    fontWeight: 'bold'
  }
})

class ResourceCostChart extends Component {
  state = {
    highlight: null
  };
  
  componentDidMount() {
    this.props.store.loadAccount()
    this.interval = setInterval(this.props.store.loadAccount, 3000)
    this.props.store.loadCostData()
  }

  componentDidUpdate(prevProps) {
    if (this.props.network !== prevProps.network){
      this.props.store.loadAccount();
      this.props.store.loadCostData();
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    const {classes, t, store} = this.props;
    const style = styler([{ key: 'cpu', color: '#1B5A6C', selected: '#2CB1CF' }]);
    store.setNetwork(this.props.network);
    const formatter = format(',.0f');
    const highlight = this.state.highlight;
    let infoValues = [];
    if (highlight) {
        const cpuText = `${formatter(highlight.event.get(highlight.column))}`
        infoValues = [{ label: t('CPU_PER_EOS', {currency: this.props.network.toUpperCase()}), value: cpuText }]
    }

    return (
      <div>
        <div className={classes.cardWrapper}>
          <Card className={classes.card} elevation={8}>
            {store.series && <CardContent>
              <Typography variant="display2" align="center" color="textPrimary" gutterBottom>
                {t('CPU_RESOURCE_COST')}
              </Typography>
              <Resizable>
                <ChartContainer timeRange={store.series.range()} format="%H:%M">
                  <ChartRow height="150">
                    <YAxis
                      id="cpu"
                      label={t('US_CPU_PER_EOS')}
                      min={store.min}
                      max={store.max}
                      format="~s"
                      width="60"
                      type="linear"
                    />
                    <Charts>
                      <BarChart
                        axis="cpu"
                        style={style}
                        highlighted={this.state.highlight}
                        info={infoValues}
                        infoStyle={{stroke: "#323233", fill: "white", fontColor: '#323233', opacity: 0.9, pointerEvents: "none", fontSize: 12 }}
                        infoTimeFormat="%H:%M"
                        onHighlightChange={highlight =>
                            this.setState({ highlight })
                        }
                        spacing={1}
                        columns={['cpu']}
                        series={store.series}
                        minBarHeight={1}
                      />
                      <Baseline
                        axis="cpu"
                        value={store.avgCpu}
                        label={t('AVERAGE')}
                        position="right"
                      />
                    </Charts>
                  </ChartRow>
                </ChartContainer>
              </Resizable>
              
              <Typography variant="subheading" align="left" color="textPrimary">
                {t('CURRENT_CPU_PER_EOS')} <span className={classes.currentValue}>{store.currentCpuPerEOS}</span>
              </Typography>
              <Typography variant="subheading" align="left" color="textPrimary" gutterBottom>
                {t('HISTORIC_AVG', {currentTime: store.currentTime})} <span className={classes.currentValue}>{store.histAvgPresent}</span>
              </Typography>

              <Typography className={classes.explainer} variant="caption" align="left" color="textPrimary" gutterBottom>
                {t('CPU_RESOURCE_COST_EXPL', {currency: this.props.network.toUpperCase()})}
              </Typography>

            </CardContent>}
          </Card>
        </div>
      </div>
    )
  }
}

export default 
inject('store')(
  withNamespaces()(
    withStyles(styles)(
      observer(ResourceCostChart)
    )
  )
)
