import React, { Component } from 'react';
import axios from 'axios';
import Animal from "./Animal";

class SearchParams extends Component {
	// First item is the string, second item is the updater function
	constructor(props) {
		super(props);
		this.state = {
			hasSearched: false,
			name: "Test",
			summary: "",
			image: "",
			lifespan: "",
			scientificName: "",
			weight: "",
			facts: ""
		};
	}

	handleSubmit = (event) => {
		event.preventDefault();

		// get the data
		axios.get('http://localhost:4000/api/animals/' +  this.state.name).then(res => this.setState({
			name: res.data[0].name,
			summary: res.data[0].summary,
			image: res.data[0].image,
			lifespan: res.data[0].lifespan,
			scientificName: res.data[0].scientificName,
			weight: res.data[0].weight,
			facts: res.data[0].facts,
			hasSearched: true}));
	}

	handleChange = (event) => {
		this.setState({ name: event.target.value });
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
				{this.state.hasSearched ?
					(<Animal name={this.state.name}
									 summary={this.state.summary}
									 image={this.state.image}
									 lifespan={this.state.lifespan}
									 scientificName={this.state.scientificName}
									 weight={this.state.weight}
									 facts={this.state.facts}
					/> )
					:""}
			</div>
		);
	}
}

export default SearchParams;
