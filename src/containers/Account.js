import React, { Component } from "react";
import { Provider } from "mobx-react";
import AccountStore from "../stores/AccountStore";
import AccountForm from "./AccountForm";
import AccountResources from "./AccountResources";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import { withNamespaces } from "react-i18next";

const styles = theme => ({
  heroButtons: {
    marginTop: theme.spacing.unit * 14
  },
  acctWrapper: {
    marginBottom: theme.spacing.unit * 4
  }
});

class Account extends Component {
  render() {
    const { classes, t } = this.props;

    return (
      <div className={classes.acctWrapper}>
        <Typography
          variant="display3"
          align="center"
          color="yellow"
          gutterBottom
        >
          {t("UNDER_CONSTRUCTION")}
        </Typography>
        <Typography
          variant="display3"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          {t("TAKE_CHARGE")}
        </Typography>
        <Typography
          variant="title"
          align="center"
          color="textSecondary"
          paragraph
        >
          {t("ENTER_YOUR_ACCOUNT", {
            currency: this.props.network.toUpperCase()
          })}
        </Typography>
        <div className={classes.heroButtons}>
          <Provider store={AccountStore}>
            <AccountForm network={this.props.network} />
          </Provider>
          <Provider store={AccountStore}>
            <AccountResources network={this.props.network} />
          </Provider>
        </div>
      </div>
    );
  }
}

export default withNamespaces()(withStyles(styles)(Account));
