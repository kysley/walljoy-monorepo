import { BrowserRouter, Route, Routes } from "react-router-dom";
import { globalCss, styled } from "@stitches/react";

// import { Feed } from "./pages/Feed";
// import { Collection } from "./pages/Collection";
// import { Wallpaper } from "./pages/Wallpaper";
import { Register } from "./pages/Register";
import { Header } from "./components/Header";
import { useMeQuery } from "./graphql/gen";

interface AppProps {}

const globalStyles = globalCss({
	"*": { margin: 0, padding: 0, boxSizing: "border-box" },
	html: {
		maxWidth: "100vw",
		backgroundColor: "#efefef",
	},
});
globalStyles();

function App({}: AppProps) {
	const [res] = useMeQuery();
	console.log(res);
	return (
		<BrowserRouter>
			<Container className="App">
				<Header />
				<Routes>
					{/* <Route path="/" element={<Feed />} />
					<Route path="c/:collection" element={<Collection />} />
					<Route path="w/:id" element={<Wallpaper />} /> */}
					<Route path="register" element={<Register />} />
				</Routes>
			</Container>
		</BrowserRouter>
	);
}

const Container = styled("div", {
	width: "100vw",
	height: "100vh",
});

export default App;
