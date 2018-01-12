import React, { Component } from "react";
import PropTypes from "prop-types";
import { DatePicker, Button } from 'antd-mobile';

export default class Counter extends Component {
	constructor(props, context) {
    super(props, context);
    this.state = {
			visible: true,
			dpValue: new Date(Date.now()),
    };
  }
	componentDidMount() {
		let { increase_async } = this.props;
		increase_async();
	}
	render() {
		const {
			value,
			user,
			increase,
			decrease,
			increase_async
		} = this.props;
		console.log(this.props, 8)
		return (
			<div>
				<h2>{value}</h2>
				<button onClick={increase}>Increase</button>
				<span dangerouslySetInnerHTML={{ __html: "<-->" }}></span>
				<button onClick={decrease}>Decrease</button>
				<span dangerouslySetInnerHTML={{ __html: "<-->" }}></span>
				<button onClick={increase_async}>Increase_Async</button>
				<Button>default</Button>
				<DatePicker
          visible={this.state.visible}
          value={this.state.dpValue}
          onOk={date => this.setState({ dpValue: date, visible: false })}
          onDismiss={() => this.setState({ visible: false })}
        />
			</div>
		)
	}
}

Counter.propTypes = {
	value: PropTypes.number.isRequired,
	increase: PropTypes.func.isRequired,
	decrease: PropTypes.func.isRequired,
	increase_async: PropTypes.func.isRequired,
}