# Create a flask application that accepts a POST request with a JSON body to predict using model.pkl

from flask import Flask, request, render_template, send_from_directory
import numpy as np
import joblib

app = Flask(
    __name__,
    static_url_path="",
    template_folder="./website/dist",
    static_folder="./website/dist",
)
model = joblib.load("model.pkl")


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/predict", methods=["POST"])
def predict():
    data = request.json

    input_values = {
        "isBasicEconomy": data["isBasicEconomy"],
        "isNonStop": data["isNonStop"],
        "totalTravelDistance": data["totalTravelDistance"],
        "travelTime": data["travelTime"],
        "daysBeforeDeparture": data["daysBeforeDeparture"],
        "startingAirport_ATL": 0,
        "startingAirport_BOS": 0,
        "startingAirport_CLT": 0,
        "startingAirport_DEN": 0,
        "startingAirport_DFW": 0,
        "startingAirport_DTW": 0,
        "startingAirport_EWR": 0,
        "startingAirport_IAD": 0,
        "startingAirport_JFK": 0,
        "startingAirport_LAX": 0,
        "startingAirport_LGA": 0,
        "startingAirport_MIA": 0,
        "startingAirport_OAK": 0,
        "startingAirport_ORD": 0,
        "startingAirport_PHL": 0,
        "startingAirport_SFO": 0,
        "destinationAirport_ATL": 0,
        "destinationAirport_BOS": 0,
        "destinationAirport_CLT": 0,
        "destinationAirport_DEN": 0,
        "destinationAirport_DFW": 0,
        "destinationAirport_DTW": 0,
        "destinationAirport_EWR": 0,
        "destinationAirport_IAD": 0,
        "destinationAirport_JFK": 0,
        "destinationAirport_LAX": 0,
        "destinationAirport_LGA": 0,
        "destinationAirport_MIA": 0,
        "destinationAirport_OAK": 0,
        "destinationAirport_ORD": 0,
        "destinationAirport_PHL": 0,
        "destinationAirport_SFO": 0,
        "airlineName_Alaska Airlines": 0,
        "airlineName_American Airlines": 0,
        "airlineName_Boutique Air": 0,
        "airlineName_Cape Air": 0,
        "airlineName_Delta": 0,
        "airlineName_Frontier Airlines": 0,
        "airlineName_JetBlue Airways": 0,
        "airlineName_Key Lime Air": 0,
        "airlineName_Southern Airways Express": 0,
        "airlineName_Spirit Airlines": 0,
        "airlineName_Sun Country Airlines": 0,
        "airlineName_United": 0,
        "cabinCode_business": 0,
        "cabinCode_coach": 0,
        "cabinCode_first": 0,
        "cabinCode_premium coach": 0,
    }

    input_values[data["cabinCode"]] = 1
    input_values[data["startingAirport"]] = 1
    input_values[data["destinationAirport"]] = 1
    input_values[data["airlineName"]] = 1

    print("Predicting data with input_values", input_values)

    # Convert the input_values to a numpy array which is what the model takes in
    input_values = np.array(list(input_values.values())).reshape(1, -1)

    # Predict using model and return the prediction
    prediction = model.predict(input_values)[0]

    # Return the prediction as a JSON object
    return {"prediction": round(prediction, 2)}


if __name__ == "__main__":
    app.run(debug=False)
