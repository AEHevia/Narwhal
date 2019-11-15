import React, { Component } from 'react';
import axios from 'axios';
import Animal from "./Animal";
import WarningMessage from "./WarningMessage";

class SearchParams extends Component {
	// First item is the string, second item is the updater function
	constructor(props) {
		super(props);
		let animalName = "";
		this.state = {
			success: false,
			name: "",
			summary: "",
			image: "",
			lifespan: "",
			scientificName: "",
			weight: "",
			facts: "",
			warningMessage: ""
		};
	}


	handleSubmit = (event) => {
		event.preventDefault();

		// get the data
		axios.get('http://localhost:4000/api/animals/' +  this.animalName).then(res => {
			if (res.data.success) {
				this.setState({
					name: res.data.animal[0].name,
					summary: res.data.animal[0].summary,
					image: res.data.animal[0].image,
					lifespan: res.data.animal[0].lifespan,
					scientificName: res.data.animal[0].scientificName,
					weight: res.data.animal[0].weight,
					facts: res.data.animal[0].facts,
					success: true
				})
			} else {
				this.setState({
					warningMessage: "This animal is not supported yet.",
					success: false
				})
			}
		});
	}

	handleChange = (event) => {
		this.animalName = event.target.value;
	}

	render() {

		return (
			<div>
				<div className="searchBox">
					<div className='search-params myButtonBox'>
						<h6>What Animal do you want to learn about?</h6>
						<form className='input-group'>
							<input onChange={this.handleChange} value={this.state.value} className='form-control width100' placeholder='Narwhal'/>
							<span className="input-group-btn">
								<button onClick={this.handleSubmit} className="btn btn-info">Submit</button>
							</span>
						</form>
					</div>
				</div>
				{this.state.success ? <Animal name={this.state.name}
																			summary={this.state.summary}
																			image={this.state.image}
																			lifespan={this.state.lifespan}
																			scientificName={this.state.scientificName}
																			weight={this.state.weight}
																			facts={this.state.facts}
				/> : <WarningMessage message={this.state.warningMessage}/>}
			</div>
		);
	}
}

export default SearchParams;
