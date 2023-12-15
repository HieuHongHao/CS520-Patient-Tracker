# CS520-Patient-Tracker


# Patient Tracker System

## Description
The Patient Tracker System is a digital platform designed to revolutionize patient care by providing a comprehensive solution for tracking patient information and medical history. Aimed at enhancing the quality of patient care, it offers real-time updates and easy access to medical records for both healthcare professionals and patients. By digitizing patient data, the system minimizes manual paperwork errors, streamlines treatment processes, and improves overall patient experiences. Acting as a vital bridge between patients and doctors, the Patient Tracker System ensures efficient communication, timely interventions, and improved healthcare outcomes.

## Technical Stack
- **Frontend**: React
- **Backend**: Node.js, Express
- **Database**: MongoDB

## Installation

### Prerequisites
- Node.js
- npm (Node Package Manager)

### Setup
1. **Clone the Repository**
   ```
   git clone https://github.com/HieuHongHao/CS520-Patient-Tracker.git
   cd CS520-Patient-Tracker
   ```

2. **Install Dependencies**
   - For the backend (Node.js & Express):
     ```
     cd backend
     npm install -g nodemon
     npm install
     ```
   - For the frontend (React):
     ```
     cd frontend
     npm install
     ```

3. **Starting the Application**
   - To run the backend:
     ```
     cd backend
     npm start
     ```
   - To run the frontend:
     ```
     cd frontend
     npm run dev
     ```

4. **Note**: the app will be serve on http://localhost:5173/

## API Documentation

### Get All Doctors

- **Endpoint:** `/doctors`
- **Method:** `GET`
- **Authentication:** Required
- **Description:** Get a list of all doctors.

### Get One Doctor

- **Endpoint:** `/doctors/:id`
- **Method:** `GET`
- **Authentication:** Required
- **Description:** Get details of a specific doctor by ID.

### Update Doctor Information

- **Endpoint:** `/doctors/:id`
- **Method:** `PUT`
- **Authentication:** Required
- **Description:** Update information for a specific doctor by ID.

### Get Doctor Appointments

- **Endpoint:** `/doctors/:id/appointments`
- **Method:** `GET`
- **Authentication:** Required
- **Description:** Get appointments for a specific doctor by ID.

### Controller Methods

#### `getAll`

- **Description:** Get a list of all doctors.
- **Endpoint:** `/doctors`
- **Method:** `GET`
- **Authentication:** Required
- **Response:**
  - **Status Code:** 200 OK
  - **Body:** Array of doctor objects with user details.

#### `getOne`

- **Description:** Get details of a specific doctor.
- **Endpoint:** `/doctors/:id`
- **Method:** `GET`
- **Authentication:** Required
- **Parameters:**
  - `id`: Doctor ID
- **Response:**
  - **Status Code:** 200 OK
  - **Body:** Doctor details, including filtered user fields and specialization.

#### `updateOne`

- **Description:** Update information for a specific doctor.
- **Endpoint:** `/doctors/:id`
- **Method:** `PUT`
- **Authentication:** Required
- **Parameters:**
  - `id`: Doctor ID
  - `phone`: New phone number
  - `firstName`: New first name
  - `lastName`: New last name
  - `specialization`: New specialization
- **Response:**
  - **Status Code:** 200 OK
  - **Body:** Updated doctor details, including filtered user fields and specialization.

#### `getDoctorAppointments`

- **Description:** Get appointments for a specific doctor.
- **Endpoint:** `/doctors/:id/appointments`
- **Method:** `GET`
- **Authentication:** Required
- **Parameters:**
  - `id`: Doctor ID
- **Response:**
  - **Status Code:** 200 OK
  - **Body:** Array of appointments for the specified doctor, including patient details.

#### `getMedicalHistoriesByDoctorId`

- **Description:** Get medical histories associated with a specific doctor.
- **Endpoint:** `/doctors/:doctorId/medical-histories`
- **Method:** `GET`
- **Authentication:** Required
- **Parameters:**
  - `doctorId`: Doctor ID
- **Response:**
  - **Status Code:** 200 OK
  - **Body:** Array of medical histories for the specified doctor, including patient details.

### Models

- **Doctor Model:**
  - Fields: userId, specialization
- **User Model:**
  - Fields: userId, phone, firstName, lastName
- **MedicalHistory Model:**
  - Fields: doctorId, patientId, other fields...
- **Appointment Model:**
  - Fields: doctorId, patientId, other fields...

