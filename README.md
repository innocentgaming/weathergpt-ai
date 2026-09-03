# 🌦️ WeatherGPT — AI Weather Intelligence & Disaster Preparedness Platform

<div align="center">

[![FastAPI](https://img.shields.io/badge/FastAPI-0.110+-009688.svg?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![Next.js](https://img.shields.io/badge/Next.js-16.3-black.svg?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB.svg?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6.svg?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Python](https://img.shields.io/badge/Python-3.11%20%7C%203.12-3776AB.svg?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-06B6D4.svg?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Leaflet](https://img.shields.io/badge/Leaflet-GIS-199900.svg?style=for-the-badge&logo=leaflet&logoColor=white)](https://leafletjs.com/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED.svg?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

**"Understand the Weather. Predict the Risk. Take the Right Action."**

A next-generation, multilingual, offline-resilient weather intelligence and disaster-management platform designed for high-impact decision support across India and vulnerable global microclimates.

[Live Demo](#-quick-start--local-setup) • [Key Features](#-core-capabilities--modules) • [Architecture](#-architecture--system-design) • [API Documentation](#-complete-api-reference) • [Docker Deployment](#-docker-deployment) • [Hackathon Demo Flow](#-presentation--demo-flow)

</div>

---

## 📌 Table of Contents
1. [Overview & Problem Statement](#-overview--problem-statement)
2. [Core Capabilities & Modules](#-core-capabilities--modules)
3. [Architecture & System Design](#-architecture--system-design)
4. [Deterministic Weather Risk Engine](#-deterministic-weather-risk-engine)
5. [AI Intelligence & Fallback Strategy](#-ai-intelligence--fallback-strategy)
6. [Tech Stack & Dependencies](#-tech-stack--dependencies)
7. [Directory Structure](#-directory-structure)
8. [Complete API Reference](#-complete-api-reference)
9. [Real-time WebSockets Protocol](#-real-time-websockets-protocol)
10. [Environment Variables & Configuration](#-environment-variables--configuration)
11. [Quick Start & Local Setup](#-quick-start--local-setup)
12. [Docker Deployment](#-docker-deployment)
13. [Production Deployment (Render & Vercel)](#-production-deployment-render--vercel)
14. [Automated Testing & Quality Assurance](#-automated-testing--quality-assurance)
15. [Presentation & Demo Flow](#-presentation--demo-flow)
16. [Security & Responsible AI](#-security--responsible-ai)
17. [License & Acknowledgments](#-license--acknowledgments)

---

## 🌍 Overview & Problem Statement

### The Problem in India and Developing Regions
Weather reporting across India has historically suffered from three critical bottlenecks:
1. **Raw Data Overload Without Human Context**: Official bulletins often output technical statistics (e.g., *"72mm cumulative precipitation, 45 km/h gusts, 982 hPa"*). For a farmer, a truck driver, or an urban commuter, these numbers fail to answer: *Will my field waterlog? Can I take the Pune-Mumbai Expressway safely? Will schools close?*
2. **Language and Accessibility Barriers**: Vulnerable populations—especially rural agricultural workers and elderly citizens—need guidance in regional languages (**Hindi**, **Marathi**, etc.) via both text and voice, not complex English PDF bulletins.
3. **Disjointed Emergency Response**: Commuters, schools, emergency responders, and farmers each require fundamentally different situational guidance during the same weather event.

### The WeatherGPT Solution
WeatherGPT is built as a **Decision Support Copilot** that answers three fundamental questions for any location:
* 🔍 **WHAT IS HAPPENING?** — Hyperlocal real-time weather metrics, hourly timelines, AQI, and radar-like GIS visualization.
* ⚠️ **WHAT DOES IT MEAN?** — Transparent, explainable meteorological risk scoring (0–100), terrain vulnerability analysis, and waypoint-by-waypoint travel hazard corridor checks.
* 🛡️ **WHAT SHOULD I DO?** — Tailored, role-specific actionable advisories delivered across 5 personas in English, Hindi, and Marathi with full speech synthesis and voice recognition.

---

## ⚡ Core Capabilities & Modules

| Module | Description | Key Technologies |
| :--- | :--- | :--- |
| **Hyperlocal Live Dashboard** | Real-time weather cards (Temperature, Feels Like, Humidity, Wind, Pressure, UV Index, Rain Probability, Dew Point, AQI) with data freshness indicators. | Open-Meteo API, WMO Codes, Dynamic Caching |
| **Multilingual AI Weather Copilot** | Conversational weather assistant with multi-turn session persistence, supporting **English**, **Hindi (हिंदी)**, and **Marathi (मराठी)** with voice input/output. | Google Gemini, OpenRouter, Web Speech API |
| **5 Role-Specific Personas** | Context-specific advice tailored for: **General Public**, **Commuter / Traveler**, **Farmer / Kisan Advisory**, **Disaster Authority**, and **School Administration**. | Persona Prompts, Domain-Tuned System Directives |
| **Route Weather Intelligence** | Waypoint-by-waypoint highway risk analysis (e.g., Pune $\to$ Lonavala $\to$ Khopoli $\to$ Panvel $\to$ Mumbai) with departure window recommendations. | OSRM / Haversine Waypoints, Risk Matrix |
| **Interactive GIS Weather Map** | Interactive Leaflet GIS map with dynamic layer switching (**Temperature Heatmap**, **Rainfall Radar**, **Wind Vectors**, and **Severe Warning Corridors**). | Leaflet, React-Leaflet, GeoJSON Overlays |
| **Disaster Command Center** | Operational dashboard tracking active weather warnings, flood inundation risks, critical zone telemetry, and automated situation summaries. | NDMA/IMD Severity Schema, SQLAlchemy ORM |
| **Emergency Safe Haven Finder** | Geo-located nearby safe shelters, emergency hospitals, and relief centers with 1-tap contact and directions, plus disaster checklists. | Geospatial Radial Queries, Hazard Checklists |
| **"What-If" Simulation Engine** | Disaster stress-testing scenarios (Cyclone, Cloudburst, Heatwave, Flash Flood) and parameter sliders (+% Rain, +°C Temp, +km/h Wind) with simulated score deltas. | Meteorological Simulation Models, Risk Engine |
| **Climate Trends & Insights** | 30-year historical climatological baseline analytics, monthly temperature/precipitation averages, and seasonal anomaly detection. | Historical Reanalysis Data, Chart.js Visuals |
| **Intelligence Report Generator** | Generates executive weather and risk briefing reports exportable instantaneously in **JSON**, **CSV**, or formatted **TXT**. | Client/Server Exporters, File System Streaming |
| **Real-time WebSockets** | Bi-directional streaming for instantaneous push of severe weather alerts and periodic live city weather updates without client polling. | FastAPI WebSockets, Connection Manager |
| **User Authentication & Profiles** | Secure JWT-based registration and login (bcrypt hashed) with guest access, role persistence, and localized preferences. | Passlib, Bcrypt, Python-Jose HS256 JWT |
| **Analytics & Telemetry** | Product metrics tracking popular search hubs, active user sessions, query volumes, and 24-hour alert frequencies. | SQLAlchemy Aggregate Telemetry, SlowAPI |

---

## 🏛️ Architecture & System Design

```mermaid
graph TB
    subgraph ClientLayer ["Client Layer (Next.js 16 + React 19)"]
        UI[Glassmorphic Responsive UI]
        Voice[Web Speech API: TTS / STT]
        Map[Leaflet GIS Multi-Layer Map]
        WSClient[WebSocket Real-time Client]
        CacheClient[Local Storage / IndexedDB Cache]
    end

    subgraph APIGateway ["API Gateway & Middleware (FastAPI)"]
        CORS[CORS Handler]
        Limiter[SlowAPI Rate Limiter]
        GZip[GZip Compression Engine]
        JWTAuth[JWT & Role Verification]
        Router[API Route Controllers]
    end

    subgraph CoreServices ["Backend Micro-Services & Engines"]
        RiskEngine[Transparent Weather Risk Engine 0-100]
        RouteService[Highway Corridor Waypoint Analyzer]
        SimEngine[Disaster & What-If Simulation Engine]
        ReportEngine[Multi-Format Intelligence Report Generator]
        WSManager[WebSocket Connection & Push Manager]
    end

    subgraph IntelligenceLayer ["Dual AI & Weather Ingestion"]
        Gemini[Google Gemini 1.5/3.6 Flash]
        OpenRouter[OpenRouter Multi-Model Fallback]
        RuleNLP[Offline Rule-Based NLP Engine]
        OpenMeteo[Open-Meteo Live Keyless API]
        OWM[OpenWeatherMap Secondary API]
    end

    subgraph PersistenceLayer ["Data & Persistence Layer"]
        DB[(PostgreSQL / SQLite Database)]
        Redis[(Redis Shared Cache / In-Memory)]
    end

    UI <--> Router
    Voice <--> UI
    Map <--> Router
    WSClient <--> WSManager
    CacheClient <--> UI

    Router --> Limiter --> CORS --> JWTAuth
    JWTAuth --> CoreServices

    CoreServices <--> IntelligenceLayer
    CoreServices <--> PersistenceLayer
    CoreServices --> RiskEngine
```

---

## 🧮 Deterministic Weather Risk Engine

Unlike black-box AI scores that hallucinate unpredictably, WeatherGPT uses a **deterministic, transparent meteorological algorithm** that computes an objective risk score between **0 and 100**.

### Formula:
$$\text{Total Risk Score} = \min\left(100, \, R_{\text{rain}} + W_{\text{wind}} + T_{\text{temp}} + H_{\text{humidity}} + V_{\text{terrain}}\right)$$

Where each component is weighted against established meteorological danger thresholds:

1. **Precipitation Impact ($R_{\text{rain}}$ — max 35 pts)**:
   - Evaluates rain volume (mm/h) and precipitation probability ($P_{\text{rain}}$).
   - $\ge 50\text{ mm/h}$ (Torrential/Cloudburst) $\to 35\text{ pts}$
   - $20 - 50\text{ mm/h}$ (Heavy Downpour) $\to 25\text{ pts}$
   - $7.5 - 20\text{ mm/h}$ (Moderate Rain) $\to 15\text{ pts}$
   - Rain probability multiplier: $\times (0.5 + 0.5 \cdot \frac{P_{\text{rain}}}{100})$

2. **Wind Surge Hazard ($W_{\text{wind}}$ — max 30 pts)**:
   - Evaluates sustained wind and gusts.
   - $> 90\text{ km/h}$ (Gale/Storm Force) $\to 30\text{ pts}$
   - $60 - 90\text{ km/h}$ (Squall/High Wind) $\to 20\text{ pts}$
   - $40 - 60\text{ km/h}$ (Moderate Gusts) $\to 10\text{ pts}$

3. **Thermal Stress ($T_{\text{temp}}$ — max 15 pts)**:
   - Heatwave: $> 42^\circ\text{C} \to 15\text{ pts}$; $38 - 42^\circ\text{C} \to 10\text{ pts}$
   - Extreme Cold: $< 4^\circ\text{C} \to 15\text{ pts}$; $4 - 8^\circ\text{C} \to 8\text{ pts}$

4. **Atmospheric & Lightning Potential ($H_{\text{humidity}}$ — max 10 pts)**:
   - High humidity combined with elevated temperatures indicates dangerous heat index and convective thunderstorm instability.

5. **Terrain & Elevation Vulnerability ($V_{\text{terrain}}$ — max 10 pts)**:
   - Mountainous pass (Western Ghats, Himalayan foothills) or low-lying coastal flood zone adjustments.

### Risk Category Matrix:
| Score Band | Alert Level | UI Pill | Impact | Recommended Action |
| :---: | :---: | :---: | :---: | :---: |
| **0 – 29** | `LOW` | 🟢 Emerald | Normal seasonal conditions | Safe for all outdoor activities, travel, and farming. |
| **30 – 59** | `MODERATE` | 🟡 Amber | Heightened weather caution | Check weather before travel; cover harvested crops; carry rain gear. |
| **60 – 79** | `HIGH` | 🟠 Orange | Severe weather threat | Postpone highway travel; secure livestock; prepare drainage; monitor alerts. |
| **80 – 100** | `SEVERE` | 🔴 Red | Extreme disaster risk | Stay indoors; follow NDMA/SDRF orders; evacuate low-lying flash flood zones. |

---

## 🤖 AI Intelligence & Fallback Strategy

WeatherGPT guarantees **100% uptime and resilience** through a 3-tier cascaded AI architecture:

```
[Tier 1: Google Gemini 1.5/3.6 Flash]
      │ (If quota exceeded, timeout, or key missing)
      ▼
[Tier 2: OpenRouter Multi-Model Fallback]
      │ (If network failure or offline environment)
      ▼
[Tier 3: Local Deterministic Rule-Based NLP Engine]
```

- **Tier 1 (Google Gemini)**: Analyzes meteorological vectors with system prompts tuned for disaster management, farming, travel, and public safety.
- **Tier 2 (OpenRouter)**: Auto-switches to high-availability open-access models (`openrouter/auto`) when Gemini rate limits occur.
- **Tier 3 (Local NLP)**: Operates completely offline without internet or API keys. Extracts entities (cities, queries, intents) using regex and meteorological lookups to return grounded, multilingual advisories.

---

## 💻 Tech Stack & Dependencies

### Frontend Architecture
- **Framework**: [Next.js 16.3](https://nextjs.org/) (App Router, Server & Client Components)
- **UI Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with custom glassmorphic tokens
- **GIS Mapping**: [Leaflet 1.9](https://leafletjs.com/) & [React-Leaflet 5.0](https://react-leaflet.js.org/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Charts & Graphs**: [Chart.js 4.5](https://www.chartjs.org/) & [React-ChartJS-2](https://react-chartjs-2.js.org/)
- **Speech Synthesis & Recognition**: Native Web Speech API (`webkitSpeechRecognition` & `speechSynthesis`)

### Backend Architecture
- **Web Framework**: [FastAPI 0.110+](https://fastapi.tiangolo.com/) (Asynchronous ASGI)
- **Server Engine**: [Uvicorn 0.29+](https://www.uvicorn.org/) with multi-worker support
- **Language**: [Python 3.11 / 3.12](https://www.python.org/)
- **Database & ORM**: [SQLAlchemy 2.0](https://www.sqlalchemy.org/) (SQLite for zero-config dev, PostgreSQL 16 for production)
- **Security & Crypto**: [Bcrypt](https://pypi.org/project/bcrypt/), [Passlib](https://passlib.readthedocs.io/), [Python-Jose](https://python-jose.readthedocs.io/) (HS256 JWT)
- **Rate Limiting**: [SlowAPI](https://github.com/laurentS/slowapi) (120 req/min general, custom per-route thresholds)
- **Live Sockets**: Native FastAPI WebSockets with broadcast connection pooling
- **HTTP Clients**: [HTTPX](https://www.python-httpx.org/) & [Requests](https://requests.readthedocs.io/)

### Infrastructure & DevOps
- **Containerization**: Multi-stage `Dockerfile` (frontend & backend) and `docker-compose.yml`
- **Cloud Orchestration**: Render Infrastructure Blueprint (`render.yaml`), Vercel-ready frontend
- **Database Support**: SQLite 3, PostgreSQL 16 Alpine
- **Caching**: Redis 7 Alpine / Local in-memory LRU cache

---

## 📂 Directory Structure

```
weathergpt-ai/
├── README.md                      # Comprehensive project documentation
├── docker-compose.yml             # Full-stack Docker compose (FastAPI, Next.js, Postgres, Redis)
├── render.yaml                    # Automated cloud deployment blueprint for Render
├── run_demo.bat                   # 1-click Windows launcher for both backend & frontend
├── weathergpt.db                  # Local SQLite database pre-populated with demo telemetry
│
├── backend/                       # FastAPI Backend Application
│   ├── Dockerfile                 # Backend container definition
│   ├── requirements.txt           # Production Python dependencies
│   ├── .env.example               # Template environment configuration
│   ├── weathergpt.db              # SQLite development database
│   │
│   ├── app/
│   │   ├── main.py                # FastAPI app initialization, middleware, lifecycle & routing
│   │   ├── database.py            # SQLAlchemy database engine, sessionmaker & Base
│   │   │
│   │   ├── config/
│   │   │   └── settings.py        # Pydantic Settings parsing env variables
│   │   │
│   │   ├── models/
│   │   │   └── models.py          # SQLAlchemy ORM models (User, WeatherCache, OfficialAlert, etc.)
│   │   │
│   │   ├── routes/
│   │   │   ├── auth.py            # User registration, JWT login, guest tokens, user preferences
│   │   │   ├── weather.py         # Current weather & 7-day forecast endpoints
│   │   │   ├── chat.py            # AI conversational copilot with role personas & history
│   │   │   ├── route.py           # Highway corridor travel weather analysis
│   │   │   ├── alerts.py          # Official IMD/NDMA weather alerts retrieval
│   │   │   ├── disaster.py        # Disaster command center metrics & critical zones
│   │   │   ├── emergency.py       # Nearby shelters, emergency hospitals, hazard checklists
│   │   │   ├── simulation.py      # Disaster scenario & what-if delta parameter simulation
│   │   │   ├── climate.py         # 30-year climatological baseline & monthly trends
│   │   │   ├── location.py        # Natural language location geocoding & reverse search
│   │   │   ├── report.py          # Intelligence report generator (JSON, CSV, TXT)
│   │   │   ├── analytics.py       # Usage metrics, popular cities, active sessions
│   │   │   └── ws.py              # Real-time WebSockets (/ws/alerts, /ws/weather/{city})
│   │   │
│   │   └── services/
│   │       ├── weather_service.py # Live Open-Meteo & OpenWeatherMap fetchers with caching
│   │       ├── risk_service.py    # Deterministic meteorological risk calculation engine
│   │       ├── ai_service.py      # Gemini & OpenRouter multi-turn LLM reasoning engine
│   │       └── route_service.py   # Multi-waypoint travel corridor route interpolator
│   │
│   └── tests/
│       └── test_backend.py        # Comprehensive test suite covering 18 integration tests
│
└── frontend/                      # Next.js 16 App Router Frontend Application
    ├── package.json               # Frontend dependencies and npm scripts
    ├── tsconfig.json              # TypeScript configuration
    ├── Dockerfile                 # Frontend multi-stage container build
    │
    └── src/
        └── app/
            ├── layout.tsx         # Root layout with metadata and styling
            ├── page.tsx           # Main application dashboard (Hero, Map, Forecast, Copilot)
            ├── globals.css        # Tailwind v4 directives & glassmorphic custom styling
            ├── i18n.ts            # Multilingual translations (English, Hindi, Marathi)
            │
            └── components/
                ├── WeatherMap.tsx              # Interactive Leaflet GIS map with toggleable layers
                ├── LocationSearchBar.tsx       # Geocoding search bar with recent & popular cities
                ├── AuthModal.tsx               # Login, registration, role selection & guest mode modal
                ├── EmergencyCenterModal.tsx    # Emergency safe haven finder & disaster checklists
                ├── DisasterSimulationModal.tsx # Disaster stress-testing & what-if delta sliders
                ├── ClimateInsightsModal.tsx    # Historical climate charts and trends visualizer
                ├── ReportGeneratorModal.tsx    # Multi-format report builder & instant exporter
                └── ServiceWorkerRegistrar.tsx  # PWA & offline asset caching manager
```

---

## 📡 Complete API Reference

Base URL (Local Development): `http://localhost:8000/api`  
Interactive Swagger UI: `http://localhost:8000/api/docs`  
ReDoc Documentation: `http://localhost:8000/api/redoc`

### 1. Authentication & User Management (`/auth`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `POST` | `/api/auth/register` | Register a new account with email, password, name, and role. | No |
| `POST` | `/api/auth/login` | Authenticate with email/password; returns JWT access & refresh tokens. | No |
| `POST` | `/api/auth/refresh` | Exchange a valid refresh token for a new access token. | No |
| `POST` | `/api/auth/guest` | Instant guest login with selected persona and language preferences. | No |
| `GET` | `/api/auth/me` | Fetch current logged-in user profile and preferences. | Bearer JWT |
| `PUT` | `/api/auth/preferences` | Update preferred language, role persona, and home city. | Bearer JWT |

#### Sample Request: Register User
```json
POST /api/auth/register
{
  "email": "kisan.patil@weathergpt.local",
  "password": "StrongPassword123!",
  "name": "Kisan Patil",
  "role": "farmer",
  "preferred_language": "mr",
  "home_city": "Pune"
}
```

---

### 2. Live Weather & Forecasts (`/weather`)
| Method | Endpoint | Description | Query Parameters |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/weather/current` | Returns live meteorological parameters, AQI, and computed risk score. | `location` (string) or `lat`, `lon` (floats) |
| `GET` | `/api/weather/forecast` | Returns 7-day daily forecast with rain probabilities and high/low temps. | `location` (string), `days` (int, default: 7) |

#### Sample Response: `GET /api/weather/current?location=Pune`
```json
{
  "weather": {
    "location": "Pune, Maharashtra, India",
    "temperature": 28.4,
    "feels_like": 30.1,
    "humidity": 68,
    "condition": "Partly Cloudy",
    "wind_speed": 14.2,
    "rain_probability": 25,
    "pressure": 1012,
    "uv_index": 6.2,
    "aqi": 72,
    "source": "Open-Meteo"
  },
  "risk": {
    "score": 28,
    "level": "LOW",
    "summary": "Weather conditions are favorable. Safe for outdoor tasks and transit.",
    "breakdown": {
      "rainfall_impact": 8,
      "wind_surge": 7,
      "thermal_stress": 5,
      "lightning_index": 4,
      "terrain_vulnerability": 4
    }
  }
}
```

---

### 3. AI Weather Copilot (`/chat`)
| Method | Endpoint | Description | Payload Parameters |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/chat` | Multilingual conversational weather queries with persona steering. | `query`, `role`, `lang`, `session_id`, `location` |
| `GET` | `/api/chat/history` | Retrieve conversation history for a given session ID. | `session_id` |

#### Roles Supported:
- `general` — Clear, everyday advice for citizens and families.
- `traveller` — Highway transit viability, delays, and fog/rain cautions.
- `farmer` — Crop impact, soil moisture, irrigation timing, and pesticide spraying advice.
- `disaster` — Tactical status, flood risk, shelter logistics, and safety protocols.
- `school` — Student safety, bus transit advisories, and outdoor assembly guidance.

---

### 4. Route Weather Corridor Intelligence (`/route`)
| Method | Endpoint | Description | Payload Parameters |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/route/analyze` | Evaluates travel safety waypoint-by-waypoint along a route. | `from_location`, `to_location`, `departure_time`, `vehicle_type` |

#### Key Route Handled:
- **Pune $\to$ Mumbai Corridor**: Evaluates waypoints at **Pune $\to$ Lonavala (Ghat section) $\to$ Khopoli $\to$ Panvel $\to$ Mumbai**. Analyzes landslide vulnerability in Khandala Ghats and waterlogging risks on the Eastern Freeway.

---

### 5. Disaster Command Center & Alerts (`/alerts`, `/disaster`, `/emergency`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/alerts` | Fetches active official meteorological alerts categorized by severity (`RED`, `ORANGE`, `YELLOW`). |
| `GET` | `/api/disaster/dashboard` | Aggregated emergency metrics, regional critical zones, and AI situation summary. |
| `GET` | `/api/emergency/locations` | Returns nearest designated emergency shelters, hospitals, and disaster relief stations. |
| `GET` | `/api/emergency/checklist` | Interactive preparation and safety checklist for specific hazards (`flood`, `cyclone`, `heatwave`). |
| `POST` | `/api/emergency/sos` | Dispatches an emergency SOS broadcast with current geo-coordinates. |

---

### 6. Disaster Simulation & "What-If" Engine (`/simulation`)
| Method | Endpoint | Description | Payload Parameters |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/simulation/disaster` | Simulates macroeconomic and civic impact of predefined disaster scenarios. | `scenario` (`HEAVY_RAIN`, `CYCLONE`, `HEATWAVE`, `FLASH_FLOOD`), `intensity` (0.5 to 2.0) |
| `POST` | `/api/simulation/whatif` | Evaluates localized risk score deltas given synthetic parameter shifts. | `location`, `rainfall_delta_percent`, `temperature_delta_c`, `wind_delta_kmh` |

---

### 7. Climate Trends & Long-Term Insights (`/climate`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/climate/insights?location=...` | Returns 30-year monthly climatological normal (temperatures, rainfall averages, peak monsoon periods). |
| `GET` | `/api/climate/trends?location=...` | Returns multi-year anomalies and warming trends for environmental intelligence. |

---

### 8. Weather Intelligence Report Generator (`/report`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/report/generate` | Generates a structured multi-page weather intelligence briefing in `json`, `csv`, or formatted `txt`. |

---

### 9. Product & Usage Analytics (`/analytics`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/analytics/summary` | Global counts of registered users, cached weather records, and active alerts. |
| `GET` | `/api/analytics/popular-cities` | Top searched cities sorted by frequency over the last 7 days. |
| `GET` | `/api/analytics/active-users` | Active user sessions breakdown (Registered vs Guest). |
| `GET` | `/api/analytics/alert-history` | Historical timeline of issued weather warnings. |

---

## ⚡ Real-time WebSockets Protocol

WeatherGPT provides two real-time WebSocket endpoints for push-based updates:

### 1. Global Alert Broadcast (`/api/ws/alerts`)
- **Connection URL**: `ws://localhost:8000/api/ws/alerts`
- **Behavior**: Immediately receives all critical disaster warnings and official alert broadcasts issued across any region.
- **Client Messages**:
  - `{"type": "ping"}` $\to$ responds with `{"type": "pong"}`
- **Server Messages**:
  ```json
  {
    "type": "alert_broadcast",
    "alert": {
      "id": "ALT-2026-0901",
      "severity": "ORANGE",
      "region": "Konkan & Western Ghats",
      "hazard": "HEAVY_RAINFALL",
      "message": "Intense rain spell expected over Ghat roads in next 4 hours. Caution advised.",
      "timestamp": "2026-09-03T14:30:00Z"
    }
  }
  ```

### 2. Live City Weather Push (`/api/ws/weather/{city}`)
- **Connection URL**: `ws://localhost:8000/api/ws/weather/pune`
- **Behavior**: Pushes current weather updates to connected clients automatically every 5 minutes (`PUSH_INTERVAL_SECONDS = 300`) or on-demand when client sends `{"type": "refresh"}`.

---

## ⚙️ Environment Variables & Configuration

Create a `.env` file in the `backend/` directory based on `backend/.env.example`:

```bash
cp backend/.env.example backend/.env
```

| Variable Name | Required | Default Value | Description |
| :--- | :---: | :--- | :--- |
| `PORT` | No | `8000` | Port for the FastAPI Uvicorn ASGI server. |
| `DEMO_MODE` | No | `True` | In demo mode, fallback sample data is enabled if network calls fail. |
| `DATABASE_URL` | No | `sqlite:///./weathergpt.db` | Database connection string. Use `postgresql://user:pass@host:5432/db` for production. |
| `ALLOWED_ORIGINS` | No | `http://localhost:3000` | Comma-separated list of allowed frontend origins for CORS. |
| `JWT_SECRET_KEY` | **Yes** (Prod) | `your_super_secret_jwt_key` | Secret key for signing HS256 JWT tokens. |
| `JWT_EXPIRE_MINUTES` | No | `60` | Access token lifetime in minutes. |
| `JWT_REFRESH_EXPIRE_DAYS` | No | `7` | Refresh token lifetime in days. |
| `GEMINI_API_KEY` | Optional | *Empty* | Google Gemini API key for high-fidelity LLM reasoning. |
| `GEMINI_MODEL` | No | `gemini-3.6-flash` | Gemini model variant. |
| `OPENROUTER_API_KEY` | Optional | *Empty* | Primary OpenRouter key for multi-model fallback. |
| `OPENROUTER_BACKUP_API_KEY` | Optional | *Empty* | Secondary OpenRouter key for high-availability redundancy. |
| `OPENROUTER_MODEL` | No | `openrouter/auto` | Model identifier on OpenRouter. |
| `OPENWEATHER_API_KEY` | Optional | *Empty* | Secondary weather provider key (Open-Meteo is keyless primary). |
| `REDIS_URL` | Optional | *Empty* | Redis URL (e.g. `redis://localhost:6379/0`) for distributed caching. |
| `WEATHER_CACHE_TTL_SECONDS` | No | `600` | Cache retention for live weather lookups (10 minutes). |
| `AI_CACHE_TTL_SECONDS` | No | `1800` | Cache retention for repetitive AI inquiries (30 minutes). |

---

## 🚀 Quick Start & Local Setup

### Prerequisites
- **Node.js**: `v18.17.0` or later (Node 20+ recommended)
- **Python**: `3.11` or `3.12`
- **Git**: Installed and configured

---

### Option A: One-Click Windows Runner (Fastest)
In the repository root directory, double-click:
```cmd
run_demo.bat
```
*This command automatically spawns both the FastAPI backend on port 8000 and the Next.js development server on port 3000 in dedicated command windows.*

---

### Option B: Manual Local Setup

#### Step 1: Set Up Backend (FastAPI)
```bash
# 1. Navigate to backend
cd backend

# 2. Create and activate Python virtual environment
python -m venv .venv

# On Windows:
.venv\Scripts\activate
# On Linux / macOS:
# source .venv/bin/activate

# 3. Upgrade pip and install dependencies
pip install --upgrade pip
pip install -r requirements.txt

# 4. Run automated integration test suite to verify installation
python tests/test_backend.py

# 5. Start the FastAPI server
python app/main.py
```
*Backend runs on `http://localhost:8000` (API Docs: `http://localhost:8000/api/docs`)*

#### Step 2: Set Up Frontend (Next.js)
Open a new terminal window:
```bash
# 1. Navigate to frontend
cd frontend

# 2. Install Node packages
npm install

# 3. Start the Next.js dev server
npm run dev
```
*Frontend runs on `http://localhost:3000`*

---

## 🐳 Docker Deployment

The repository includes a production-ready `docker-compose.yml` that provisions:
1. **PostgreSQL 16 Alpine** database container with health checks.
2. **Redis 7 Alpine** cache container with LRU eviction policy.
3. **FastAPI Backend** service with auto-restart and GZip compression.
4. **Next.js Frontend** production web container.

### Launch Full Stack with Docker Compose:
```bash
# Build and launch all services in background
docker-compose up --build -d

# View live streaming logs across all containers
docker-compose logs -f

# Check container health status
docker-compose ps

# Stop all containers
docker-compose down
```

### Accessing Docker Services:
- **Frontend**: `http://localhost:3000`
- **Backend API**: `http://localhost:8000`
- **Swagger Docs**: `http://localhost:8000/api/docs`
- **PostgreSQL**: `localhost:5432` (`user: weathergpt`, `db: weathergpt`)
- **Redis**: `localhost:6379`

---

## ☁️ Production Deployment (Render & Vercel)

### Deploying via Render Blueprint (`render.yaml`)
WeatherGPT includes a pre-configured `render.yaml` infrastructure-as-code file:
1. Fork or push this repository to GitHub.
2. Go to your [Render Dashboard](https://dashboard.render.com).
3. Click **New +** $\to$ **Blueprint**.
4. Connect your GitHub repository.
5. Render will automatically detect `render.yaml` and provision:
   - A managed **PostgreSQL Database** (`weathergpt-db`).
   - A **FastAPI Web Service** (`weathergpt-backend`).
   - A **Next.js Web Service** (`weathergpt-frontend`).
6. Set your optional secret keys (`GEMINI_API_KEY`, etc.) in the Render Environment settings.

### Split Deployment (Vercel Frontend + Render Backend)
- **Frontend (Vercel)**:
  - Import the `frontend/` directory into Vercel.
  - Set Environment Variables:
    - `NEXT_PUBLIC_API_URL` = `https://your-backend.onrender.com`
    - `NEXT_PUBLIC_WS_URL` = `wss://your-backend.onrender.com`
- **Backend (Render / Railway / Fly.io)**:
  - Deploy `backend/` with start command:
    ```bash
    uvicorn app.main:app --host 0.0.0.0 --port $PORT
    ```

---

## 🧪 Automated Testing & Quality Assurance

WeatherGPT features an end-to-end integration test suite located in [`backend/tests/test_backend.py`](backend/tests/test_backend.py).

### Running the Test Suite:
```bash
cd backend
.venv\Scripts\python tests/test_backend.py
```

### Verified Test Cases (18 of 18 Passing):
- [x] **Root & Healthcheck**: Verifies root API handshake and `/healthz` load-balancer readiness.
- [x] **Authentication Engine**: Tests User Registration, Bcrypt password hashing, JWT login, Bearer token verification (`/auth/me`), and Guest profile creation.
- [x] **Live Weather Fetcher**: Tests live Open-Meteo querying, metric parsing, and caching.
- [x] **Transparent Risk Engine**: Verifies deterministic mathematical score computation (0–100) and weighted factor breakdowns.
- [x] **7-Day Forecast Engine**: Verifies daily high/low temps, precipitation chances, and WMO codes.
- [x] **AI Chat & Personas**: Validates general citizen queries in English and Farmer Mode agricultural queries in Marathi.
- [x] **Route Weather Intelligence**: Tests highway waypoint hazard breakdown (Pune $\to$ Lonavala $\to$ Khopoli $\to$ Panvel $\to$ Mumbai).
- [x] **Official Alerts Ingestion**: Verifies parsing of active weather warnings.
- [x] **Disaster Command Center**: Verifies real-time critical zone risk indices and emergency summaries.
- [x] **Emergency Safe Havens**: Tests nearby relief shelter queries and hazard preparation checklists.
- [x] **Disaster & What-If Simulation**: Tests synthetic disaster scenarios and rainfall/temperature delta sliders.
- [x] **Climate Insights**: Verifies 30-year climatological normal retrieval.
- [x] **Geocoding & Location Search**: Tests natural language search for Indian hubs.
- [x] **Report Generation**: Tests automated briefing generation across JSON, CSV, and TXT formats.
- [x] **Product Analytics**: Verifies popular search aggregation, active sessions, and alert history.
- [x] **WebSockets Real-time Push**: Tests bi-directional connection, ping-pong heartbeat, and live alert/weather broadcasts.

---

## 🎭 Presentation & Demo Flow

WeatherGPT includes a **9-Step Hackathon & Presentation Story Bar** integrated directly into the UI header. Presenters and judges can click through each step to demonstrate the platform's depth:

1. **Step 1: The India Climate Problem** — Demonstrate how raw IMD numbers leave commuters and farmers confused.
2. **Step 2: Live Hyperlocal Dashboard** — Showcase live temperature, feels-like, UV index, rain chance, and data freshness.
3. **Step 3: Transparent 0-100 Risk Engine** — Explain how deterministic meteorological vectors replace unpredictable black-box AI scores.
4. **Step 4: Multilingual AI Copilot** — Switch between English, Hindi, and Marathi; demonstrate Web Speech voice synthesis and voice input.
5. **Step 5: 5 Specialized Personas** — Demonstrate how a Farmer receives crop advice while a Commuter receives highway flood warnings for the same storm.
6. **Step 6: Route Weather Intelligence** — Inspect travel risks along the Pune-Mumbai Expressway across Ghat sections.
7. **Step 7: Interactive GIS Map Layers** — Toggle between Temperature heatmaps, Rain radar, and Wind vector layers.
8. **Step 8: Disaster & What-If Simulation** — Slide precipitation by $+50\%$ to simulate flash-flood risk deltas.
9. **Step 9: Safe Havens & Report Export** — Locate emergency shelters and export a complete Weather Intelligence Report in 1 click.

---

## 🛡️ Security & Responsible AI

- **Zero API Key Leakage**: No API keys are exposed to the client-side bundle. All external requests are proxied and sanitized server-side.
- **Strict Parameterized Queries**: All database operations use SQLAlchemy ORM parameter binding, preventing SQL injection vulnerabilities.
- **Rate-Limiting Protection**: SlowAPI middleware enforces rate limits (120 req/min general, stricter limits on LLM endpoints) to guard against denial-of-service and quota exhaustion.
- **Official Warning Demarcation**: Official government warnings (🔴 NDMA / IMD) are visually and semantically demarcated from AI-generated recommendations.
- **Responsible AI Disclaimers**: All AI persona outputs include explicit guidance reminding users to comply with local civil defense and disaster authority orders in emergency situations.

---

## 📄 License & Acknowledgments

### License
This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

### Acknowledgments
- **Meteorological Data**: [Open-Meteo](https://open-meteo.com/) (Open-access Keyless Weather API) & [OpenWeatherMap](https://openweathermap.org/).
- **AI Models**: [Google Gemini](https://ai.google.dev/) & [OpenRouter](https://openrouter.ai/).
- **GIS Cartography**: [Leaflet](https://leafletjs.com/) and [OpenStreetMap](https://www.openstreetmap.org/) contributors.
- **Iconography**: [Lucide Icons](https://lucide.dev/).

---

<div align="center">

**WeatherGPT** — *Built for climate resilience, citizen safety, and actionable weather intelligence.*

⭐ If you found this project helpful, consider starring the repository!

</div>
