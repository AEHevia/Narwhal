import React from 'react';
import SearchParams from './components/SearchParams';
import NavBar from './components/NavBar';
import Navbar from "reactstrap/es/Navbar";

const App = () => {
	return (
		<div>
			<NavBar />
			<SearchParams />
		</div>
	);
};

export default App;
