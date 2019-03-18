import React, { Component } from 'react';
import Selecteds from './component/Selecteds';
import {faPlus, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const select1 = ['1', '2', '3', '4', '5'];
export const select2 = {
	1: ['a1', 'b1', 'c1', 'd1', 'e1'],
	2: ['a2', 'b2', 'c2', 'd2'],
	3: ['a3', 'b3'],
	4: ['a4', 'b4', 'c4', 'd4', 'e4'],
	5: ['a5', 'b5', 'c5', 'd5'],
};

class Rouls extends Component {

	render() {
		const { rouls,
			groupID,
			addedListItem,
			removeListItem,
			saveValueOpt } = this.props;
		return (
			<div>
					<ul className='listSelect'>
						{
							rouls.map(({roulId, value1, value2}, inx) => (
								<li key={roulId}>
									<Selecteds
										saveValueOpt={(e) => saveValueOpt(e.target.value, roulId, 'value1')}
										select={select1}
										value={value1}
									/>
									<Selecteds
										saveValueOpt={(e) => saveValueOpt(e.target.value, roulId, 'value2')}
										select={select2[value1]}
										value={value2}
									/>
									{(rouls.length - 1 === inx)
										? <button
												className='btn-add btn-zero'
												onClick={()=>addedListItem(groupID)}
											>
												<FontAwesomeIcon icon={faPlus}/>
												and
											</button>
										: 'and'
									}
									<button
										className='btn-remove btn-zero'
										onClick={() => removeListItem(roulId, groupID)}
									>
										<FontAwesomeIcon icon={faTrashAlt}/>
									</button>
								</li>
							))
						}
					</ul>
			</div>
		)
	}
}

export default Rouls;