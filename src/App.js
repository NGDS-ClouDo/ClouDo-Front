import React from 'react';
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CategoryPage from "./pages/CategoryPage";
import TODOListPage from "./pages/TODOListPage";
import EmptyPage from "./pages/EmptyPage";

const App = () => {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/home/" element={<Home />} />
			{/* <Route path="/home/:userID/" element={<Home />} /> */}
			<Route path="/EmptyPage/" element={<EmptyPage />} />
			<Route
				path="/TODOListPage/:userID/:doneOrNot/:search/:orderBy/:desc/:page/"
				element={<TODOListPage />}
			/>
			<Route
				path="/category/:userID/:categoryName/:doneOrNot/:search/:orderBy/:desc/:page/"
				element={<CategoryPage/>}
			/>
		</Routes>
	);
};

export default App;
