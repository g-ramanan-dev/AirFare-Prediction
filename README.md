# ✈️ Airfare Price Prediction  

[![Springer Publication](https://img.shields.io/badge/Published-Springer-blue)](https://link.springer.com/chapter/10.1007/978-981-19-6634-7_65)

## 📌 Project Overview  
This project aims to help users gain meaningful insights about flight prices so they can book affordable and comfortable flights. Using **machine learning models (Random Forest Regressor with Hyper-Parameter Tuning and Adaptive Boosting)**, the system predicts optimal airfare prices dynamically.  

Additionally, the system includes user-friendly features such as booking, profile management, travelogue, and support modules, making it an end-to-end airfare prediction and booking support platform.  

---

## 🎯 Objectives  
- Provide users with airfare price predictions to book affordable tickets.  
- Assist travelers in making better purchase decisions.  
- Simplify the booking process with an easy-to-use interface.  
- Offer support modules for user assistance.  

---

## 🚀 Motivation  
Airline corporations use complex and dynamic strategies for pricing tickets, making it challenging for customers to secure the lowest fares. With this system, users can predict and optimize their purchase decisions using machine learning.  

---

## 📝 Abstract  
- Airfare prices change dynamically due to factors like **time, season, duration, special events, and climate change**.  
- This project leverages **Random Forest Regression** along with **Hyper-Parameter Tuning** and **Adaptive Boosting**, improving efficiency from **79% to 85%**.  
- Deployment is handled via **Flask Framework** (Python).  
- Extra features include booking flights, travelogues, and customer support.  

---

## 🔍 Drawbacks of Existing Systems  
- Lack of easy-to-use price prediction calculators.  
- Existing models (e.g., linear regression) deliver low accuracy.  

---

## ✅ Proposed Work  
- Predict flight prices between popular metro cities in India.  
- Collect minimal user inputs (source, destination, travel dates).  
- Display predicted optimal fares.  
- Simplified booking process and integrated support system for users.  

---

## 🏗️ System Architecture  
![Architecture Diagram](./images/slide_13_img_2.jpg)  

---

## 💻 Tech Stack & Requirements  

### Software  
- **Python** (Anaconda, Jupyter Notebook)  
- **Flask**  
- **Node.js**  
- **APIs**: Skyscanner API (via RapidAPI)  

### Hardware  
- RAM: 512 MB or above  
- Browser: Chrome / Safari / IE (latest version)  
- OS: Platform Independent  

---

## 🔑 Modules  

1. **Authentication**  
   ![Authentication](./images/slide_17_img_2.png)  
   - User registration, login, and session management with JWT tokens.  

2. **Price Prediction**  
   ![Price Prediction](./images/slide_20_img_2.png)  
   - Trained ML model (Random Forest Regressor + Adaptive Boosting).  
   - Hyperparameter tuning for higher accuracy (79% → 85%).  

3. **Booking Flights**  
   ![Booking Flights](./images/slide_22_img_2.png)  
   - User selects source/destination and travel dates.  
   - System displays available flights (via APIs).  
   - Booking confirmation via payment gateway.  

4. **Travelogue**  
   ![Travelogue](./images/slide_24_img_2.png)  
   - Fetches and displays flights and categories from Skyscanner API.  

5. **Profile Creation**  
   ![Profile Creation](./images/slide_26_img_2.png)  
   - Users can manage and update profiles.  

6. **Support System**  
   ![Support System](./images/slide_28_img_2.png)  
   - Email support + FAQ for common queries.  

---

## 📊 Results & Conclusion  
- Created an **optimal airfare purchase decision support system**.  
- Successfully combined Random Forest + Boosting for accurate predictions.  
- Helped customers save significantly despite limited information availability.  

---

## 🔮 Future Enhancements  
- Extend the model to predict other travel-related costs (cars, hotels, packages).  
- Introduce **chatbots** and intelligent customer management systems.  
- Expand dataset for higher accuracy across more airlines and cities.  
- Create a one-stop travel service ecosystem.  

---

## 📚 References  
- Key papers from EUSIPCO, BigData, IRI, and others.  
- [Springer Publication](https://link.springer.com/chapter/10.1007/978-981-19-6634-7_65)  

---

## 🙌 Contributors  
- **G. Ramanan**   
- **R. Prakash** 
- **Dr. L. Sherly Pushpa Annabel**  
- **S. Sreenidhi**  
