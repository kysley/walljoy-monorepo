import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider as UrqlProvider } from "urql";
import "./index.css";
import { urqlClient } from "./utils";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<UrqlProvider value={urqlClient}>
			<App />
		</UrqlProvider>
	</React.StrictMode>,
);
