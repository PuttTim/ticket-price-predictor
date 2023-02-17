import { useState } from "react"
import Home from "./pages/Home"
import { Box } from "@mantine/core"

function App() {
	const [count, setCount] = useState(0)

	return (
		<>
			<Box maw={"1300px"} m="auto" mb="32px" pt="16px">
				<Home />
			</Box>
		</>
	)
}

export default App
