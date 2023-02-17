import {
	Box,
	Button,
	Flex,
	Grid,
	NumberInput,
	Paper,
	Radio,
	SegmentedControl,
	Select,
	Switch,
	Text,
	TextInput,
	Title,
} from "@mantine/core"
import { useForm } from "@mantine/form"
import { useEffect, useState } from "react"

const cabinCodeData = [
	{ value: "cabinCode_basic", label: "Basic Economy" },
	{ value: "cabinCode_coach", label: "Normal Economy" },
	{ value: "cabinCode_premium coach", label: "Premium Economy" },
	{ value: "cabinCode_business", label: "Business Class" },
	{ value: "cabinCode_first", label: "First Class" },
]

const airlineNameData = [
	{
		value: "airlineName_Alaska Airlines",
		label: "Alaska Airlines",
	},
	{
		value: "airlineName_American Airlines",
		label: "American Airlines",
	},
	{
		value: "airlineName_Boutique Air",
		label: "Boutique Air",
	},
	{
		value: "airlineName_Cape Air",
		label: "Cape Air",
	},
	{
		value: "airlineName_Delta",
		label: "Delta",
	},
	{
		value: "airlineName_Frontier Airlines",
		label: "Frontier Airlines",
	},
	{
		value: "airlineName_JetBlue Airways",
		label: "JetBlue Airways",
	},
	{
		value: "airlineName_Key Lime Air",
		label: "Key Lime Air",
	},
	{
		value: "airlineName_Southern Airways Express",
		label: "Southern Airways Express",
	},
	{
		value: "airlineName_Spirit Airlines",
		label: "Spirit Airlines",
	},
	{
		value: "airlineName_Sun Country Airlines",
		label: "Sun Country Airlines",
	},
	{
		value: "airlineName_United",
		label: "United",
	},
]

const startingAirportData = [
	{
		value: "startingAirport_ATL",
		label: "Atlanta, GA (ATL)",
	},
	{
		value: "startingAirport_BOS",
		label: "Boston, MA (BOS)",
	},
	{
		value: "startingAirport_CLT",
		label: "Charlotte, NC (CLT)",
	},
	{
		value: "startingAirport_DEN",
		label: "Denver, CO (DEN)",
	},
	{
		value: "startingAirport_DFW",
		label: "Dallas, TX (DFW)",
	},
	{
		value: "startingAirport_DTW",
		label: "Detroit, MI (DTW)",
	},
	{
		value: "startingAirport_EWR",
		label: "Newark, NJ (EWR)",
	},
	{
		value: "startingAirport_IAD",
		label: "Washington, DC (IAD)",
	},
	{
		value: "startingAirport_JFK",
		label: "New York, NY (JFK)",
	},
	{
		value: "startingAirport_LAX",
		label: "Los Angeles, CA (LAX)",
	},
	{
		value: "startingAirport_LGA",
		label: "New York, NY (LGA)",
	},
	{
		value: "startingAirport_MIA",
		label: "Miami, FL (MIA)",
	},
	{
		value: "startingAirport_OAK",
		label: "Oakland, CA (OAK)",
	},
	{
		value: "startingAirport_ORD",
		label: "Chicago, IL (ORD)",
	},
	{
		value: "startingAirport_PHL",
		label: "Philadelphia, PA (PHL)",
	},
	{
		value: "startingAirport_SFO",
		label: "San Francisco, CA (SFO)",
	},
]

const destinationAirportData = [
	{
		value: "destinationAirport_ATL",
		label: "Atlanta, GA (ATL)",
	},
	{
		value: "destinationAirport_BOS",
		label: "Boston, MA (BOS)",
	},
	{
		value: "destinationAirport_CLT",
		label: "Charlotte, NC (CLT)",
	},
	{
		value: "destinationAirport_DEN",
		label: "Denver, CO (DEN)",
	},
	{
		value: "destinationAirport_DFW",
		label: "Dallas, TX (DFW)",
	},
	{
		value: "destinationAirport_DTW",
		label: "Detroit, MI (DTW)",
	},
	{
		value: "destinationAirport_EWR",
		label: "Newark, NJ (EWR)",
	},
	{
		value: "destinationAirport_IAD",
		label: "Washington, DC (IAD)",
	},
	{
		value: "destinationAirport_JFK",
		label: "New York, NY (JFK)",
	},
	{
		value: "destinationAirport_LAX",
		label: "Los Angeles, CA (LAX)",
	},
	{
		value: "destinationAirport_LGA",
		label: "New York, NY (LGA)",
	},
	{
		value: "destinationAirport_MIA",
		label: "Miami, FL (MIA)",
	},
	{
		value: "destinationAirport_OAK",
		label: "Oakland, CA (OAK)",
	},
	{
		value: "destinationAirport_ORD",
		label: "Chicago, IL (ORD)",
	},
	{
		value: "destinationAirport_PHL",
		label: "Philadelphia, PA (PHL)",
	},
	{
		value: "destinationAirport_SFO",
		label: "San Francisco, CA (SFO)",
	},
]

const Home = () => {
	const form = useForm({
		initialValues: {
			daysBeforeDeparture: 0,
			totalTravelDistance: 0,
			travelTime: 0,
		},
	})

	const [predictedPrice, setPredictedPrice] = useState(0)

	const submitValues = () => {
		console.log(form.values)

		fetch("http://localhost:5000/predict", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(form.values),
		}).then((res) => {
			res.json().then((data) => {
				setPredictedPrice(data.prediction)
			})
		})
	}

	useEffect(() => {
		// get the keys of the form values
		const keys = Object.keys(form.values)
		console.log(keys)

		console.log(form.values)
	}, [form.values])

	return (
		<>
			<Flex align="center" direction="column" h="100%" w="100%" gap="20px">
				<Title>Flight Ticket 💸Price💸 Predictor (🇺🇸 US🦅 Based)</Title>
				<Title size="lg" order={3} fw={500}>
					Predict your Future flight's ticket price based on variables and machine learning!
				</Title>
				<Grid justify="center" w="100%">
					<Grid.Col span={4}>
						<Paper shadow="xs" withBorder h="100%" px="16px" py="8px" mb="16px">
							<NumberInput
								onChange={(e) => {
									form.setFieldValue("daysBeforeDeparture", e as number)
								}}
								placeholder="0"
								withAsterisk
								label="Days Before Flight"
								description="The amount of days you are booking before the flight"
							/>
							<NumberInput
								onChange={(e) => {
									form.setFieldValue("totalTravelDistance", e as number)
								}}
								placeholder="0"
								mt="md"
								withAsterisk
								label="Flight Distance (Miles)"
								description="The estimated distance of the flight in miles"
							/>
							<NumberInput
								onChange={(e) => {
									form.setFieldValue("travelTime", e as number)
								}}
								placeholder="0"
								mt="md"
								withAsterisk
								label="Flight Time (Hours)"
								description="The estimated time of the flight in hours"
							/>

							<Radio.Group
								onChange={(e) => {
									e === "true"
										? form.setFieldValue("isNonStop", true)
										: form.setFieldValue("isNonStop", false)
								}}
								mt="md"
								withAsterisk
								label="Non stop flight"
								description="Whether or not the flight is a non stop flight"
							>
								<Radio value="true" mt="md" label="Yes" />
								<Radio value="false" mt="md" label="No" />
							</Radio.Group>
						</Paper>
					</Grid.Col>
					<Grid.Col span={4}>
						<Paper shadow="xs" withBorder h="100%" px="16px" py="8px">
							<Select
								onChange={(e) => {
									if (e === "cabinCode_basic") {
										form.setFieldValue("cabinCode", "cabinCoach_coach")
										form.setFieldValue("isBasicEconomy", true)
									} else {
										form.setFieldValue("cabinCode", e)
										form.setFieldValue("isBasicEconomy", false)
									}
								}}
								placeholder="Select a cabin code"
								withAsterisk
								label="Flight Type"
								description="The type of flight you are taking"
								data={cabinCodeData}
							/>
							<Select
								onChange={(e) => {
									form.setFieldValue("airlineName", e)
								}}
								placeholder="Select the airline"
								mt="md"
								withAsterisk
								label="Airline"
								description="The airline you are taking"
								data={airlineNameData}
							/>
							<Select
								onChange={(e) => {
									form.setFieldValue("startingAirport", e)
								}}
								placeholder="Select the starting airport"
								mt="md"
								withAsterisk
								label="Starting Airport"
								description="The airport you are starting from"
								data={startingAirportData}
							/>
							<Select
								onChange={(e) => {
									form.setFieldValue("destinationAirport", e)
								}}
								placeholder="Select the destination airport"
								mt="md"
								withAsterisk
								label="Destination Airport"
								description="The airport you are going to"
								data={destinationAirportData}
							/>
						</Paper>
					</Grid.Col>
				</Grid>
				<Grid w="100%" justify="center">
					<Grid.Col span={8}>
						<Button
							onClick={() => {
								submitValues()
							}}
							w="100%"
							disabled={Object.keys(form.values).length !== 9 ? true : false}
						>
							Predict Your Flight Ticket Price
						</Button>
					</Grid.Col>
				</Grid>
				<Grid w="100%" justify="center">
					<Grid.Col span={8}>
						<Paper shadow="xs" withBorder w="100%" px="16px" py="8px" mb="16px">
							<Title order={2}>Predicted Values</Title>
							<Text mt="md">Predicted Ticket Price: ${predictedPrice}</Text>
						</Paper>
					</Grid.Col>
				</Grid>
			</Flex>
		</>
	)
}

export default Home
