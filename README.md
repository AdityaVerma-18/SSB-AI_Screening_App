# MHA | SSB — AI Document Screening (React Native Frontend)

Front-end implementation of the **Sashastra Seema Bal (SSB)** AI Document Screening System under the **Ministry of Home Affairs, Government of India**, built with **React Native & Expo** following the *Sovereign Shield Directive* design specifications from Google Stitch.

---

## 🛠 Features

- **Sovereign Shield Design System**: High-contrast, military-grade dark theme (`#121317`), custom typography hierarchy, and status color coding.
- **Official Branding**: Indian National Emblem, Ministry of Home Affairs, and SSB security badges.
- **Authorized Login Screen**: Role-based access (Checkpoint vs Admin), 2FA OTP, password visibility toggle, 256-bit encrypted session indicators.
- **Command Dashboard**: Live operational status, greeting, stats overview (Verified, Mismatched, Pending Review), and recent activity feed.
- **AI Document Scanner Engine**:
  - Animated 4K sensor HUD with laser scan sweep.
  - Multi-stage AI pipeline simulation (OCR Extraction, Hologram Integrity, Biometric Facial Match, Watchlist Cross-Check).
  - Test presets (Valid Aadhaar, Expired Visa Passport, Tampered Hologram ID, High-Risk Watchlist Match).
  - Transition actions (Approve, Mismatch, Secondary Inspection, Detain).
- **Registry & Audit Log**: Search, filter by status, and detailed inspection modal for each verification event.
- **Threat Intelligence & Alerts**: Critical watchlist hits, LOC alerts, and checkpoint broadcast directive.
- **Officer Profile & Security Settings**: Officer badge, shift info, cryptographic session metadata, and biometric settings.

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run in Web Browser
```bash
npm run web
```
or
```bash
npx expo start --web
```

### 3. Run on Mobile (iOS / Android)
```bash
npx expo start
```
Scan the QR code with the **Expo Go** app on your phone.
