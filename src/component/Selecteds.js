import React, { Component } from 'react';

class Selecteds extends Component {

	render() {
		const { select, saveValueOpt, value } = this.props;
		return (
			<select
				value={value}
				onChange={saveValueOpt}
			>
				{
					select.map(item=>(
						<option
							key={item}
							value={item}
						>
							{item}
						</option>
					))
				}
			</select>
		)
	}

}

export default Selecteds;
