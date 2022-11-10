import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Category from "./pages/Category";
import TODOListPage from "./pages/TODOListPage";

const App = () => {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/home" element={<Home />} />
			<Route
				path="/TODOListPage/:range/:search/:order/:desc/:page"
				element={<TODOListPage />}
			/>
			<Route
				path="/category/:category/:range/:search/:order/:desc/:page"
				element={<Category/>}
			/>
		</Routes>
	);
};

export default App;
