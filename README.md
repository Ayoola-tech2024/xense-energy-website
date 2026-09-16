<p align="center">
  <a href="https://ayoola-tech2024.github.io/xense-energy-website/">
    <img src="logo.png" width="110" alt="Xense Energy Systems Logo" style="border-radius: 18px; box-shadow: 0 10px 30px rgba(79, 70, 229, 0.15);" />
  </a>
</p>

<h1 align="center">Xense Energy Systems</h1>

<p align="center">
  <strong>Intelligent Solar Automation, Real-Time Energy Telemetry &amp; Smart Load Control</strong>
</p>

<p align="center">
  <a href="https://ayoola-tech2024.github.io/xense-energy-website/"><img src="https://img.shields.io/badge/Live_Demo-GitHub_Pages-4f46e5?style=for-the-badge&logo=github" alt="Live Demo"></a>
  <img src="https://img.shields.io/badge/Tech-HTML5_%26_TailwindCSS-0284c7?style=for-the-badge&logo=tailwindcss" alt="Tech Stack">
  <img src="https://img.shields.io/badge/Payload-<2MB_Optimized-10b981?style=for-the-badge&logo=speedtest" alt="Optimized Payload">
  <img src="https://img.shields.io/badge/Dependencies-Zero_Build_Step-d97706?style=for-the-badge" alt="Zero Build Step">
</p>

---

## 📖 Overview

**Xense Energy** is a next-generation energy management platform that transforms standard solar inverters and battery systems into intelligent, autonomous power networks. By integrating wireless RS232 smart dongles with cloud telemetry, Xense prevents complete battery blackouts, prioritizes critical home appliances during outages, and maximizes solar self-consumption.

Experience the live interactive application at **[ayoola-tech2024.github.io/xense-energy-website](https://ayoola-tech2024.github.io/xense-energy-website/)**.

---

## ⚡ Core Operating Modes

The system architecture features three intelligent operating postures configured directly from the hardware controller or mobile cloud app:

| Operating Mode | Primary Behavior | Use Case |
| :--- | :--- | :--- |
| **Xense Mode** *(Autonomous)* | Dynamically monitors solar generation &amp; battery state of charge (SOC). Sheds heavy loads (Air Conditioners &amp; Water Heaters) when battery hits the **35% safety floor**, tripling backup runtimes. | Default daily autonomous home energy protection |
| **Bypass Mode** *(Manual Override)* | Disables load shedding decision logic entirely. Delivers continuous, uninterrupted power pass-through to all connected sockets. | Heavy appliance usage, utility bypass, and maintenance |
| **Auto Grid Mode** *(Utility Fallback)* | Instantly detects the return of grid power, bypassing shedding logic to run all loads from utility power while simultaneously recharging battery banks. | Automatic grid recovery &amp; fast re-charging |

---

## 🌟 Key Features

- **Dynamic Hero Carousel**: Responsive 3-slide visual showcase highlighting real-world handheld telemetry, homeowner energy controls, and solar array tracking with custom play/pause toggle controls.
- **Product Ecosystem Bento Grid**: Interactive overview of the Xense Hybrid Inverter, Live Mobile Cloud App, Wireless RS232 Plug-and-Play Dongle, and WiFi Monitoring Features.
- **Interactive Battery & Load Shedding Simulator**: Live interactive slider allowing homeowners to simulate real-time load shedding decisions across heavy appliances (A/C, Deep Freezer, Fans, and Wi-Fi) as SOC drops.
- **Enterprise Priority Waitlist & Early Access**: High-converting lead capture interface with real-time email verification, automated queue ticketing, and direct demo request routing.
- **Interactive Modals & Lead Capture**: Fully functional Sign In, Sign Up, and Consultation Demo Request modals with client-side verification.
- **84%+ Optimized Media Payload**: Progressive JPEG encoding, WebP assets, native `loading="lazy"`, `decoding="async"`, and `fetchpriority="high"` for instant loading on any connection.

---

## 🛠️ Technology Stack

- **Markup & Layout**: Semantic HTML5 with responsive mobile-first architecture
- **Styling**: [Tailwind CSS CDN](https://tailwindcss.com/) with custom color palettes and glassmorphism styling
- **Typography**: [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans), [Inter](https://fonts.google.com/specimen/Inter), and [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono)
- **Icons**: [Lucide Icons](https://lucide.dev/)
- **Visuals & Charts**: Scalable Vector Graphics (SVG) with CSS keyframe stroke animations and HTML5 Canvas particle background
- **No Build Step Required**: 100% vanilla JavaScript ES6+ — runs natively in all modern web browsers with zero installation prerequisites.

---

## 📂 Project Structure

```text
xense-website/
├── index.html                  # Main application & interactive landing page
├── logo.png                    # High-resolution Xense brandmark logo
├── dashboard-mobile.png        # Mobile app showcase device frame mockup
├── xense-person-phone.jpg      # Hero Slide 1 / Mobile telemetry photo
├── xense-man-phone.jpg         # Hero Slide 2 / Homeowner smart energy photo
├── xense-solar-farm-hand.jpg   # Hero Slide 3 / Solar farm handheld photo
├── xense-inverter-kit.jpg      # Product Bento: Smart Inverter Unit
├── xense-solar-app-dual.webp   # Product Bento: Live Mobile Cloud App
├── xense-dongle-plug.jpg       # Product Bento: Wireless RS232 Smart Dongle
├── xense-wifi-plug.jpg         # Product Bento: WiFi Monitoring Features
├── xense-solar-automation.png  # High-definition automation architecture diagram
├── xense-person-analytics.jpg  # Lifestyle Gallery card
├── xense-solar-smartphone.jpg  # Lifestyle Gallery card
├── xense-mobile-tracking.jpg   # Lifestyle Gallery card
├── xense-solar-tracking-1.jpg  # Lifestyle Gallery card
├── xense-usage-stats.jpg       # Lifestyle Gallery card
├── xense-phone-dashboard.jpg   # Media asset
└── README.md                   # Project documentation & overview
```

---

## 🚀 Quick Start / Local Development

Since this project requires zero build tooling or transpilation steps, you can run it locally in seconds:

### Option 1: Direct File Launch
Simply double-click `index.html` or open it in any web browser (Chrome, Edge, Safari, Firefox).

### Option 2: Local HTTP Server

Using Python (Recommended):
```bash
# Clone the repository
git clone https://github.com/Ayoola-tech2024/xense-energy-website.git

# Navigate into the project folder
cd xense-energy-website

# Start a local static server (Python 3)
python -m http.server 8000
```
Then open your browser and visit `http://localhost:8000`.

Using Node.js (`npx serve`):
```bash
npx serve .
```

---

## 🌐 Deployment

The repository is configured for immediate one-click static hosting:

- **GitHub Pages**: Go to **Settings > Pages > Branch: `main` > `/ (root)` > Save**.
- **Vercel / Netlify**: Connect this repository with zero build configuration (`Build Command: none`, `Publish Directory: .`).

---

## 📄 License & Attribution

&copy; 2026 **Xense Energy Systems**. All Rights Reserved.  
Designed and engineered for high-performance solar automation and uninterrupted smart home power.
