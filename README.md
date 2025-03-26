# 📋 Reiseanfrageformular (Travel Request Form)

A pixel-perfect responsive travel request form built with **Angular**, using **Reactive Forms**, **Flatpickr**, and **local Google Fonts**. The design strictly follows the provided specifications including error messages, validation states, and dynamic form logic.

---

## ✅ Features

- 🎯 Exact match to provided design
- 📱 Fully responsive (Desktop + Mobile)
- 🧠 Reactive Forms with dynamic validation
- 📆 Reisezeitraum with Flatpickr date range picker (2 months, German locale)
- ⚠️ HTML5 native validation fallback
- ➕/➖ Add/Remove dynamic child fields
- 📎 Custom styled tooltips for invalid inputs
- 🖍️ Custom styles and locally embedded fonts (no CDN)
- ❌ Form validation with visual feedback

---

## 🧱 Tech Stack

- **Angular 17**
- **TypeScript**
- **Flatpickr with German localization**
- **CSS3 / HTML5**
- **Local Fonts (Sansita Swashed, Overlock)**

---

## 🗂 Project Structure

```text
travel-form/
├── src/
│   ├── app/
│   │   ├── request-form/
│   │   │   ├── request-form.component.ts
│   │   │   ├── request-form.component.html
│   │   │   └── request-form.component.css
│   ├── styles.css
│   └── assets/
│       └── fonts/
└── README.md
```

---

## 🚀 Setup & Run

1 . **Install dependencies**  
`bash
npm install
`

2 . **Start development server**  
`bash
ng serve
`

3 . **View in browser**  
 Navigate to `http://localhost:4200`

---

## 📌 Implementation Details

- **Form Validation**

  - Required field validation with visual feedback
  - Dynamic error messages and tooltips
  - Custom validation for number inputs

- **Responsive Design**

  - Adapts to mobile and desktop views
  - Responsive date picker (1 month mobile, 2 months desktop)
  - Dynamic layout adjustments

- **Dynamic Children**
  - Add/remove child entries
  - Individual validation per child
  - Birth date selection with day/month/year

---

## ⚡ Technical Highlights

- Custom flatpickr implementation with German localization
- Reactive form with nested form groups and arrays
- CSS-only tooltips and validation states
- No external UI frameworks used

---

## 📄 Project Requirements

This project was implemented according to the following specifications:

- Angular implementation with Reactive Forms
- Exact visual match to provided design
- Form validation with error highlighting
- Dynamic child fields functionality
- Local font implementation
- Responsive layout for mobile and desktop

---

## ⏱ Development Time

The implementation of this project took approximately **10 hours**.  
This includes:

- Planning and requirements analysis
- Layout matching and pixel-perfect styling
- Custom validation logic implementation
- Responsive design and testing
- Cross-browser compatibility checks
- Mobile device testing
- Documentation

Time breakdown:

- Setup & Structure: 1h
- Form Layout: 2h
- Validation Logic: 2h
- Styling & Responsive Design: 3h
- Testing & Refinements: 2h

---

## 👤 Author & Contact

- GitHub: [github.com/M-Wrath](https://github.com/M-Wrath)

For project inquiries:
<aldin@neuberger-consulting.com>
