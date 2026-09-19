# AirGuardian AI

## Cloud-Native Intelligent Air Monitoring & Industrial Safety Platform

AirGuardian AI is an IoT and AI-powered industrial safety platform designed to monitor environmental conditions and provide intelligent safety recommendations.

The system uses **ESP32, MQ135, and DHT22 sensors** to collect air quality, temperature, and humidity data. The collected data is sent through Wi-Fi to a **FastAPI backend**, where it is processed and stored in **PostgreSQL**.

For intelligent analysis, the system uses **Sentence Transformers, ChromaDB, RAG, and Google Gemini**. Relevant safety information is retrieved from the knowledge base and combined with the current environmental conditions to generate context-based safety recommendations.

The platform is designed to use **AWS Cloud** for backend hosting, database management, monitoring, and notifications. A **Next.js dashboard** provides real-time monitoring, risk levels, AI recommendations, historical data, and alerts.

## Key Features

* Real-time air quality monitoring
* Temperature and humidity monitoring
* ESP32-based IoT data collection
* Cloud-based backend processing
* PostgreSQL data storage
* AI-based risk assessment
* Embeddings and semantic search
* RAG-based safety information retrieval
* Google Gemini safety recommendations
* Real-time monitoring dashboard
* Historical data and analytics
* Safety alerts and notifications

## System Architecture

```text
MQ135 + DHT22
      |
    ESP32
      |
    Wi-Fi
      |
 FastAPI Backend
      |
 PostgreSQL
      |
 Risk Assessment
      |
 Embeddings + ChromaDB
      |
     RAG
      |
 Google Gemini
      |
 AI Safety Recommendation
      |
 Next.js Dashboard
      |
 Alerts & Analytics
```

## Technology Stack

**Frontend**

* Next.js
* TypeScript
* Tailwind CSS

**Backend**

* Python
* FastAPI
* PostgreSQL

**AI**

* Sentence Transformers
* ChromaDB
* RAG
* Google Gemini

**IoT**

* ESP32
* MQ135
* DHT22
* OLED Display
* Buzzer
* Arduino IDE

**Cloud**

* AWS EC2
* Amazon RDS
* AWS CloudWatch
* Amazon SNS

## Objective

The main objective of AirGuardian AI is to move beyond basic environmental monitoring by combining **IoT, cloud computing, and AI** to provide understandable, context-based safety recommendations for industrial environments.
