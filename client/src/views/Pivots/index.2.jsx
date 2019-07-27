import React, { Component } from 'react';
import { connect } from 'react-redux';
// Externals
import { Doughnut } from 'react-chartjs-2';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import PivotTableUI from 'react-pivottable/PivotTableUI';
import 'react-pivottable/pivottable.css';
import TableRenderers from 'react-pivottable/TableRenderers';
import createPlotlyComponent from 'react-plotly.js/factory';
import createPlotlyRenderers from 'react-pivottable/PlotlyRenderers';
import Chart, {
  AdaptiveLayout,
  CommonSeriesSettings,
  Size,
  Tooltip,
} from 'devextreme-react/chart';
import PivotGridDataSource from 'devextreme/ui/pivot_grid/data_source';

import PivotGrid, {
  FieldChooser
} from 'devextreme-react/pivot-grid';

import { sales } from './data.js';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import { Typography } from '@material-ui/core';

// Material icons
import {
  ThumbUpRounded as ThumbUpIcon,
  ThumbDownRounded as ThumbDownIcon,
  ThumbsUpDownRounded as ThumbUpDownIcon
} from '@material-ui/icons';

// Shared components
import {
  Portlet,
  PortletHeader,
  PortletLabel,
  PortletContent
} from 'components';

// Palette
import palette from 'theme/palette';

// Chart configuration
import { data, options, WinDrillDown, LossDrillDown } from './data';

// Component styles
import styles from './style';

// create Plotly React component via dependency injection
const Plot = createPlotlyComponent(window.Plotly);

// create Plotly renderers via dependency injection
const PlotlyRenderers = createPlotlyRenderers(Plot);

const dataSource = new PivotGridDataSource({
  fields: [{
    caption: 'Region',
    width: 120,
    dataField: 'region',
    area: 'row',
    sortBySummaryField: 'Total'
  }, {
    caption: 'City',
    dataField: 'city',
    width: 150,
    area: 'row'
  }, {
    dataField: 'date',
    dataType: 'date',
    area: 'column'
  }, {
    groupName: 'date',
    groupInterval: 'month',
    visible: false
  }, {
    caption: 'Total',
    dataField: 'amount',
    dataType: 'number',
    summaryType: 'sum',
    format: 'currency',
    area: 'data'
  }],
  store: sales
});

const currencyFormatter = new Intl.NumberFormat(
  'en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
  }
);

class DataPivots extends Component {
  //function DevicesChart (props) {

    componentDidMount() {
      this._pivotGrid.bindChart(this._chart, {
        dataFieldsDisplayMode: 'splitPanes',
        alternateDataFields: false
      });
      setTimeout(function() {
        dataSource.expandHeaderItem('row', ['North America']);
        dataSource.expandHeaderItem('column', [2013]);
      });
    }



  render() {
    const { classes, className, trades, ...rest } = this.props;
    var style1 = {
      width: '500px',
      float: 'left'
    };

    const rootClassName = classNames(classes.root, className);


    return (
      <React.Fragment>
        <Chart ref={(ref) => this._chart = ref.instance}>
          <Size height={200} />
          <Tooltip enabled={true} customizeTooltip={customizeTooltip} />
          <CommonSeriesSettings type={'bar'} />
          <AdaptiveLayout width={450} />
        </Chart>

        <PivotGrid
          id={'pivotgrid'}
          dataSource={dataSource}
          allowSortingBySummary={true}
          allowFiltering={true}
          showBorders={true}
          showColumnTotals={false}
          showColumnGrandTotals={false}
          showRowTotals={false}
          showRowGrandTotals={false}
          ref={(ref) => this._pivotGrid = ref.instance}
        >
          <FieldChooser enabled={true} height={400} />
        </PivotGrid>
      </React.Fragment>
    );
  }
}

DataPivots.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  trades: state.trades.trades
});

function customizeTooltip(args) {
  const valueText = currencyFormatter.format(args.originalValue);
  return {
    html: `${args.seriesName} | Total<div class="currency">${valueText}</div>`
  };
}

export default connect(mapStateToProps)(withStyles(styles)(DataPivots));
