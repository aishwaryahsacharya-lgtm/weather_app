from flask import Flask, render_template, request, jsonify
import os
import requests
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
WEATHER_API_KEY = os.getenv("WEATHER_API_KEY")

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/api/weather")
def get_weather():
    city = request.args.get("city")
    
    if not city:
        return jsonify({"cod": 400, "message": "City is required"}), 400

    if not WEATHER_API_KEY:
        return jsonify({"cod": 500, "message": "API key not found in .env"}), 500

    url = f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={WEATHER_API_KEY}&units=metric"

    try:
        response = requests.get(url)
        data = response.json()
        
        # Forward the exact response from OpenWeather (includes cod, message)
        return jsonify(data), response.status_code

    except requests.exceptions.RequestException as e:
        # FIXED: No return data inside try that breaks logic
        return jsonify({"cod": 500, "message": f"Request failed: {str(e)}"}), 500

if __name__ == "__main__":
    print("✅ Server running at http://127.0.0.1:5000")
    print("✅ Make sure .env has WEATHER_API_KEY")
    app.run(debug=True)