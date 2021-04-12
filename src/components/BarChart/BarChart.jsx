import React, { Component } from 'react';
import * as d3 from 'd3';
import _ from 'lodash';
import { connect } from 'react-redux';

import { requestChartData } from '../../modules/dashboardApi/dashboardApiActions';

import './BarChart.scss';

class BarChart extends Component {
  constructor(props) {
    super(props);
    // create a ref to store the textInput DOM element
    this.canvasRef = '';
    this.setCanvasRef = (element) => {
      this.canvasRef = element;
    };
  }

  componentDidMount = async () => {
    await this.props.requestChartData();
  };

  componentDidUpdate(prevProps) {
    const { isChartDataLoading, chartData } = this.props;
    if (prevProps.isChartDataLoading !== isChartDataLoading) {
      if (!isChartDataLoading && chartData.length > 0) {
        const temp = Array.from(
          d3.rollups(
            _.cloneDeep(chartData),
            (v) => d3.sum(v, (d) => d.count),
            (d) => d.category,
            (d) => d.code
          ),
          ([key, count]) => ({ category: key, count })
        );
        const barChartData = temp.map((item) => {
          let newItem = {
            category: item.category,
            'under 3': 0,
            '3 to 4': 0,
            'over 4': 0
          };
          for (const [key, count] of item.count) {
            newItem[key] = count;
          }
          return newItem;
        });
        this.drawBarChart(barChartData);
      }
    }
  }

  drawBarChart = (data) => {
    const gpa = ['under 3', '3 to 4', 'over 4'];
    const margin = { top: 10, right: 10, bottom: 20, left: 40 };
    const width = 800;
    const height = 400;
    const colorScheme = d3
      .scaleOrdinal()
      .range([
        '#98abc5',
        '#8a89a6',
        '#7b6888',
        '#6b486b',
        '#a05d56',
        '#d0743c',
        '#ff8c00'
      ]);
    let svgCanvas = d3
      .select(this.canvasRef)
      .append('svg')
      .attr('preserveAspectRatio', 'xMinYMin meet')
      .attr('viewBox', [0, 0, width, height])
      .classed('svg-content', true)
      .append('g')
      .attr('transform', `translate(${margin}, ${margin})`);

    let x0 = d3
      .scaleBand()
      .domain(data.map((d) => d.category))
      .rangeRound([margin.left, width - margin.right])
      .paddingInner(0.1);

    let x1 = d3
      .scaleBand()
      .domain(gpa)
      .rangeRound([0, x0.bandwidth()])
      .padding(0.05);

    let y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d3.max(gpa, (key) => d[key]))])
      .nice()
      .rangeRound([height - margin.bottom, margin.top]);

    svgCanvas
      .append('g')
      .selectAll('g')
      .data(data)
      .join('g')
      .attr('transform', (d) => `translate(${x0(d.category)},0)`)
      .selectAll('rect')
      .data((d) =>
        gpa.map((key) => ({
          key: key,
          count: d[key],
          category: d.category
        }))
      )
      .join('rect')
      .attr('x', (d) => x1(d.key))
      .attr('y', (d) => y(d.count))
      .attr('width', x1.bandwidth())
      .attr('height', (d) => y(0) - y(d.count))
      .attr('cursor', 'pointer')
      .attr('fill', (d) => colorScheme(d.key))
      .on('click', (e, d, i) => {
        console.log('onClick', e, d, i);
        this.props.handleClick(d.category, d.key);
      })
      .on('mouseover', function (e, d, i) {
        tooltip
          .html(`<div><p>TotalCount:${d.count}</p></div>`)
          .style('visibility', 'visible');
        d3.select(this).style('fill', d3.rgb(colorScheme(d.rate)).darker(2));
      })
      .on('mouseout', function (e, d, i) {
        tooltip.html(``).style('visibility', 'hidden');
        d3.select(this).style('fill', colorScheme(d.rate));
      })
      .on('mousemove', function (e) {
        tooltip
          .style('top', e.pageY + 10 + 'px')
          .style('left', e.pageX + 10 + 'px');
      });

    let xAxis = (g) => {
      return g
        .attr('transform', `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x0).tickSizeOuter(0));
    };
    let yAxis = (g) => {
      return g
        .attr('transform', `translate(${margin.left},0)`)
        .call(d3.axisLeft(y).ticks(null, 's'))
        .call((g) => {
          return g
            .select('.tick:last-of-type text')
            .clone()
            .attr('x', 3)
            .attr('text-anchor', 'start')
            .attr('font-weight', 'bold')
            .text('Count');
        });
    };
    let legend = (svgCanvas) => {
      let g = svgCanvas
        .attr('transform', `translate(${width},0)`)
        .attr('text-anchor', 'end')
        .attr('font-family', 'sans-serif')
        .attr('font-size', 10)
        .selectAll('g')
        .data(colorScheme.domain().slice().reverse())
        .join('g')
        .attr('transform', (d, i) => `translate(0,${i * 20})`);

      g.append('rect')
        .attr('x', -19)
        .attr('width', 19)
        .attr('height', 19)
        .attr('fill', colorScheme);

      g.append('text')
        .attr('x', -24)
        .attr('y', 9.5)
        .attr('dy', '0.35em')
        .text((d) => d);
    };

    svgCanvas.append('g').call(xAxis);

    svgCanvas.append('g').call(yAxis);

    svgCanvas.append('g').call(legend);

    let tooltip = d3
      .select('body')
      .append('div')
      .style('position', 'absolute')
      .style('z-index', '10')
      .style('visibility', 'hidden')
      .style('padding', '10px')
      .style('background', 'rgba(0,0,0,0.6)')
      .style('border-radius', '4px')
      .style('color', '#fff');
  };

  render() {
    return (
      !this.props.isChartDataLoading &&
      this.props.chartData.length > 0 && (
        <div ref={this.setCanvasRef} className="svg-container"></div>
      )
    );
  }
}
function mapStateToProps(state) {
  return {
    chartData: state.dashboardApiReducer.data,
    isChartDataLoading: state.dashboardApiReducer.isLoading
  };
}
export default connect(mapStateToProps, {
  requestChartData
})(BarChart);
