import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import uuidv4 from 'uuid/v4';
import Rouls from './Rouls';
import { select2 } from './Rouls'

class App extends Component {

	componentWillMount() {
		const localState = JSON.parse(localStorage.getItem('myState'));
		if (localState) {
			this.setState(() => ({
				selectArray: localState
			}))
		}
	}

	state={
		isOpened: false,
		selectArray: [
			{
				groupID: uuidv4(),
				rouls: [
					{
						roulId: uuidv4(),
						value1: '1',
						value2: 'c1'
					}
				]
			},
		]
	};

  render() {
  	const fogClassBlock = this.state.isOpened ? "fog-on-the-page" : null;
    return (
	    <div
		    className='welcome'
	    >
		    <div
			    onClick={this.openPopup}
			    className={fogClassBlock}
		    >
			    <button
				    className="btn-open"
			    >
				    Modalca)))
			    </button>
			    {this.state.isOpened ?
				    <div className='modal-popup'>
					    <header>
						    <p>Allow Viewing When...</p>
						    <button
							    className='closet btn-zero'
						    >
							    <FontAwesomeIcon icon={faTimes}/>
						    </button>
					    </header>
					    <div className="list-items-options">
						    <ul className='allListSelects'>
							    {
								    this.state.selectArray
									    .map(({groupID, rouls}, inx, array) => (
											    <li
												    className='newListSelect'
												    key={groupID}
											    >
												    <Rouls rouls={rouls}
												           groupID={groupID}
												           addedListItem={this.addedListItem}
												           removeListItem={this.removeListItem}
												           saveValueOpt={this.saveValueOpt}
												    />
												    {array.length - 1 === inx ? null
													    : <div className="line-between-list">
														    <span></span>
														    <p>or</p>
														    <span></span>
													    </div>
												    }
											    </li>
										    )
									    )
							    }
						    </ul>
						    <div className="btn-block">
							    <span></span>
							    <button
								    className='btn-add-newList btn-zero'
								    onClick={this.addedObj}
							    >
								    <FontAwesomeIcon icon={faPlus}/>
								    or
							    </button>
							    <span></span>
						    </div>
					    </div>
					    <footer>
						    <div className='btn-footer'>
							    <button
								    className='btn-cancel'
										onClick={this.cancelPopupAndDefultState}
							    >
								    Cancel
							    </button>
							    <button
								    className='btn-save'
								    onClick={this.saveToLocalStore}
							    >
								    Save
							    </button>
						    </div>
					    </footer>
				    </div>
				    : null
			    }
		    </div>
	    </div>
    );
  }

	cancelPopupAndDefultState = () => {
		localStorage.removeItem("myState");
  	this.setState(() => ({
		  selectArray: [
			  {
				  groupID: uuidv4(),
				  rouls: [
					  {
						  roulId: uuidv4(),
						  value1: '1',
						  value2: 'c1'
					  }
				  ]
			  },
		  ]
	  }))
	};

	openPopup = (e) => {
		const target = e.target;
		console.log(target.className);

		switch (target.className) {
			case 'closet' :
			case 'btn-open':
			case 'btn-cancel'	:
				this.setState(({isOpened}) => ({
					isOpened: !isOpened
				}));
				break;
			case 'fog-on-the-page' :
				console.log('welcome');
				this.setState(() => ({
					isOpened: false
				}));
				break;

		}

};

  saveToLocalStore = () => {
  	const strState = JSON.stringify(this.state.selectArray);
  	localStorage.setItem('myState', strState);
  };

	saveValueOpt = (val, roulId, key) => {
  	this.setState(({ selectArray }) => ({
		  selectArray: selectArray.map(({ groupID, rouls }) => ({
			  groupID,
			  rouls: rouls.map(rule => {
				  const obj = { ...rule };
				  if (rule.roulId === roulId) {
				  	obj[key] = val;
				  	if (key === 'value1') obj.value2 = select2[val][0];
				  }
				  return obj
			  })
		  }))
	  }))
	};

	removeListItem = (roulId) => {
  	this.setState(({selectArray})=> ({
		  selectArray: selectArray.map(group => ({
			  ...group,
			  rouls: group.rouls.filter(roul => roul.roulId !== roulId)
		  }))
			  .filter(group => group.rouls.length !== 0)
	  }))
	};

	addedListItem = (id) => {
  	this.setState(({selectArray})=>({
		  selectArray: selectArray.map(group => {
			  const obj = { ...group };
			  if (group.groupID === id) {
				  obj.rouls = [ ...group.rouls, {
					  roulId: uuidv4(),
					  value1: '2',
					  value2: 'a2'
				  }]
			  }
			  return obj;
		  })
	  }))
	};

  addedObj = () => {
		this.setState(({selectArray})=>({
			selectArray: [...selectArray, {
				groupID: uuidv4(),
				rouls: [
					{
						roulId: uuidv4(),
						value1: '2',
						value2: 'c2'
					}
				]
			}]
		}))
  }

}

export default App;
