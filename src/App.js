import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Category from "./pages/Category";
import TODOListPage from "./pages/TODOListPage";
import TodoEditForm from "./pages/TODOEdit"
import EmptyPage from "./pages/EmptyPage";

const App = () => {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/home/" element={<Home />} />
			<Route path="/home/:uid/" element={<Home />} />
			<Route path="/EmptyPage/" element={<EmptyPage />} />
			<Route
				path="/TODOListPage/:uid/:range/:search/:order/:desc/:page/"
				element={<TODOListPage />}
			/>
			<Route
				path="/category/:uid/:category/:range/:search/:order/:desc/:page/"
				element={<Category/>}
			/>
			<Route
				path="/TodoEditForm/:uid/:tid/"
				element={<TodoEditForm/>}
			/>
		</Routes>
	);
};

export default App;
