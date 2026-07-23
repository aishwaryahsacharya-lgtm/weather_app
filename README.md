# 🌦️ Weather App

A simple and responsive weather application built with **Flask**, **HTML**, **CSS**, and **JavaScript** that fetches real-time weather information using the **OpenWeatherMap API**.

---

## 📌 Features

- 🔍 Search weather by city name
- 🌡️ Displays temperature in Celsius
- 💧 Shows humidity
- 💨 Displays wind speed
- 🌥️ Weather description and icon
- ⚠️ Handles invalid city names gracefully
- 🔐 Secure API key management using `.env`

---

## 📂 Project Structure

```
weather_app/
│
├── screenshots/
│   ├── cloud.png
│   ├── only cities.png
│   ├── summer.png
│   └── home.png
│
├── static/
│   ├── script.js
│   └── style.css
│
├── templates/
│   └── index.html
│
├── venv/
│
├── .env
├── .env.example
├── .gitignore
├── app.py
├── LICENSE
├── README.md
└── requirements.txt
```

---

## 🛠️ Technologies Used

- Python
- Flask
- HTML5
- CSS3
- JavaScript
- OpenWeatherMap API
- python-dotenv
- Requests

---

## 🚀 Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/weather_app.git

cd weather_app
```

---

### 2. Create a virtual environment

Windows

```bash
python -m venv venv
venv\Scripts\activate
```

Linux/macOS

```bash
python3 -m venv venv
source venv/bin/activate
```

---

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

---

### 4. Create a `.env` file

Create a file named `.env` in the project root.

Example:

```env
WEATHER_API_KEY=your_openweathermap_api_key
```

---

### 5. Get an API Key

1. Visit https://openweathermap.org/api
2. Create a free account.
3. Generate an API key.
4. Copy the key into your `.env` file.

---

### 6. Run the application

```bash
python app.py
```

You should see:

```
✅ Server running at http://127.0.0.1:5000
✅ Make sure .env has WEATHER_API_KEY
```

Open your browser and visit:

```
http://127.0.0.1:5000
```

---

## 📡 API Endpoint

### Get Weather

```
GET /api/weather?city=<city_name>
```

Example

```
/api/weather?city=London
```

Returns JSON data from the OpenWeatherMap API.

---

## ⚙️ Environment Variables

| Variable | Description |
|----------|-------------|
| WEATHER_API_KEY | Your OpenWeatherMap API Key |

---

## 📸 Screenshot

screenshot of your application 

Example:

```
screenshots/home.png
```

or drag and drop an image into GitHub after uploading.

---

## ❌ Error Handling

The application handles:

- Empty city input
- Invalid city names
- Missing API key
- API request failures
- Network errors

---

## 📦 Requirements

Example `requirements.txt`

```
Flask
requests
python-dotenv
```

---

## 📄 License

This project is licensed under the MIT License.

---

## 👩‍💻 Author

**Aishwarya H S**

---

## ⭐ Future Improvements

- 5-day weather forecast
- Current location weather
- Dark/Light mode
- Search history
- Favorite cities
- Air Quality Index (AQI)
- Weather maps
- Sunrise and sunset timings

---

## 🙌 Acknowledgements

- Flask
- OpenWeatherMap API
- Python Community
