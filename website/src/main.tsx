import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { MantineProvider } from "@mantine/core"
import "./index.css"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<MantineProvider
			withGlobalStyles
			withNormalizeCSS
			theme={{
				colorScheme: "dark",
				primaryColor: "violet",
				primaryShade: 3,
			}}
		>
			<App />
		</MantineProvider>
	</React.StrictMode>
)
