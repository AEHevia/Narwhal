import React from 'react';
import NavigationBar from './components/NavBar';
import SignIn from "./components/SignIn";
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
	return (
		<div>
			<NavigationBar />
			<SignIn />
		</div>
	);
};

export default App;
