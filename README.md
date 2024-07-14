# HMSuite
![540shots_so](https://github.com/user-attachments/assets/eb178d08-6533-4307-a756-e52e2feb84e2)

## Overview
This project focuses on developing a web application to manage reservations in accommodation facilities. The application aims to streamline the booking process, enhance user experience, and provide a comprehensive dashboard for administrators.

## Preview
Check out the live preview of HMSuite [here](https://hms.kbdev.pl/).

## Admin Credentials
Use the following credentials to log in as an admin:
- **Username**: admin
- **Password**: password
- 
## Technologies Used
- **Frontend**: Nuxt 3, Bootstrap 5
- **Backend**: Prisma ORM, PostgreSQL

## Features

### 🖥️ Dashboard
The dashboard provides daily statistics, including the number of current stays, arrivals, departures, and new reservations. It features a line chart showing daily reservation counts for the upcoming week, lists of arrivals, stays, and departures with guest names and room numbers, a pie chart displaying room statuses (clean, dirty, in service, stay, arrival), and a table of upcoming reservations with guest details, room numbers, arrival and departure dates, prices, and reservation statuses.

### 📅 Reservation Schedule
The reservation schedule displays a graphical timeline from today's date to the end of the oldest reservation, with rows representing room numbers and columns representing dates. Each cell contains reservation numbers and status icons.

### 🛎️ Check-ins
The check-in list includes columns for check-in numbers, guest names, rooms, arrival and departure dates, and extras (parking, meals, pool, gym). Actions include check-out buttons and search functionality by reservation number or guest details (name, phone, email).


### 📑 Reservations
The reservation list includes columns for reservation numbers, guest names, rooms, arrival and departure dates, statuses (guaranteed, confirmed, canceled, pending), sources (direct, email, online service, phone, other), amounts, and extras. Actions include check-in and cancel buttons, and search functionality by reservation number or guest details.

### 📝 Step-by-Step Form for Reservations and Check-ins
- **Step 1**: Specify Stay Period (arrival and departure dates).
- **Step 2**: Select Room (available rooms list and details).
- **Step 3**: Specify Guest (name, phone, email, address, etc.).
- **Step 4**: Add Extras (parking, breakfast, dinner, pool, gym).
- **Step 5**: Summary with total price and action button to add the check-in or reservation.

### 📖 Guest Book
The guest book features a paginated list with search functionality by name, phone, and email. Actions include editing and deleting guest details, sorting the list, and adding new guests with comprehensive details (name, phone, email, address, etc.).


### 🏨 Room Management System
The room management system allows users to view available rooms, add new rooms, search rooms by number, and edit room amenities (TV, WiFi, bathroom, kitchen, refrigerator, balcony, air conditioning, wardrobe, hairdryer, coffee/tea set, toiletries, towels). Users can specify bathroom types, maximum occupancy, prices per night, and room types (economic, standard, luxury, suite).

### 🧹 Housekeeping Management System
The housekeeping management system provides a list of rooms that need cleaning, allows changing room statuses from "dirty" to "clean," and displays detailed room information (type, max occupancy, amenities).

---
Application created for needed thesis defense
