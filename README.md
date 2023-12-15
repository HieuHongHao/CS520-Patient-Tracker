# CS520-Patient-Tracker


# Patient Tracker System

## Description
The Patient Tracker System is a digital platform designed to revolutionize patient care by providing a comprehensive solution for tracking patient information and medical history. Aimed at enhancing the quality of patient care, it offers real-time updates and easy access to medical records for both healthcare professionals and patients. By digitizing patient data, the system minimizes manual paperwork errors, streamlines treatment processes, and improves overall patient experiences. Acting as a vital bridge between patients and doctors, the Patient Tracker System ensures efficient communication, timely interventions, and improved healthcare outcomes.

## Technical Stack
- **Frontend**: React
- **Backend**: Node.js, Express

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

### Medical History Routes

#### Add a New Medical History Record

- **Endpoint:** `/medical-history`
- **Method:** `POST`
- **Authentication:** Required
- **Description:** Add a new medical history record.
- **Request Body:**
  - `patientId`: ID of the patient associated with the medical history
  - `condition`: Medical condition description
  - `description`: Additional details about the medical history
  - `visitedDate`: Date of the medical visit (YYYY-MM-DD)

#### Get All Medical Histories

- **Endpoint:** `/medical-history`
- **Method:** `GET`
- **Authentication:** Required
- **Description:** Get a list of all medical history records.
- **Response:**
  - **Status Code:** 200 OK
  - **Body:** Array of medical history records with patient details.

#### Get One Medical History by ID

- **Endpoint:** `/medical-history/:id`
- **Method:** `GET`
- **Authentication:** Required
- **Description:** Get details of a specific medical history record by ID.
- **Parameters:**
  - `id`: Medical history record ID
- **Response:**
  - **Status Code:** 200 OK
  - **Body:** Details of the requested medical history record.

#### Update Medical History Record by ID

- **Endpoint:** `/medical-history/:id`
- **Method:** `PUT`
- **Authentication:** Required
- **Description:** Update details of a specific medical history record by ID.
- **Parameters:**
  - `id`: Medical history record ID
- **Request Body:**
  - `condition`: Updated medical condition description
  - `description`: Updated additional details about the medical history
  - `visitedDate`: Updated date of the medical visit (YYYY-MM-DD)
- **Response:**
  - **Status Code:** 200 OK
  - **Body:** Updated details of the medical history record.

#### Delete Medical History Record by ID (Not implemented in code)

- **Endpoint:** `/medical-history/:id`
- **Method:** `DELETE`
- **Authentication:** Required
- **Description:** Delete a specific medical history record by ID (Not implemented in the provided code).
- **Parameters:**
  - `id`: Medical history record ID
- **Response:**
  - **Status Code:** 200 OK (if successfully implemented)
  - **Body:** Deleted medical history record details (if successfully implemented).

### Controller Methods

#### `addOne`

- **Description:** Add a new medical history record.
- **Endpoint:** `/medical-history`
- **Method:** `POST`
- **Authentication:** Required
- **Request Body:**
  - `patientId`: ID of the patient associated with the medical history
  - `condition`: Medical condition description
  - `description`: Additional details about the medical history
  - `visitedDate`: Date of the medical visit (YYYY-MM-DD)
- **Response:**
  - **Status Code:** 200 OK
  - **Body:** Success message and the added medical history record.

#### `getOne`

- **Description:** Get details of a specific medical history record by ID.
- **Endpoint:** `/medical-history/:id`
- **Method:** `GET`
- **Authentication:** Required
- **Parameters:**
  - `id`: Medical history record ID
- **Response:**
  - **Status Code:** 200 OK
  - **Body:** Details of the requested medical history record.

#### `getAll`

- **Description:** Get a list of all medical history records.
- **Endpoint:** `/medical-history`
- **Method:** `GET`
- **Authentication:** Required
- **Response:**
  - **Status Code:** 200 OK
  - **Body:** Array of medical history records with patient details.

#### `updateOne`

- **Description:** Update details of a specific medical history record by ID.
- **Endpoint:** `/medical-history/:id`
- **Method:** `PUT`
- **Authentication:** Required
- **Parameters:**
  - `id`: Medical history record ID
- **Request Body:**
  - `condition`: Updated medical condition description
  - `description`: Updated additional details about the medical history
  - `visitedDate`: Updated date of the medical visit (YYYY-MM-DD)
- **Response:**
  - **Status Code:** 200 OK
  - **Body:** Updated details of the medical history record.
