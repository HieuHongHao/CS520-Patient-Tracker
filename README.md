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


### Doctor Routes

#### Get All Doctors

- **Endpoint:** `/doctors`
- **Method:** `GET`
- **Authentication:** Required
- **Description:** Get a list of all doctors.

#### Get One Doctor

- **Endpoint:** `/doctors/:id`
- **Method:** `GET`
- **Authentication:** Required
- **Description:** Get details of a specific doctor by ID.

#### Update Doctor Information

- **Endpoint:** `/doctors/:id`
- **Method:** `PUT`
- **Authentication:** Required
- **Description:** Update information for a specific doctor by ID.

#### Get Doctor Appointments

- **Endpoint:** `/doctors/:id/appointments`
- **Method:** `GET`
- **Authentication:** Required
- **Description:** Get appointments for a specific doctor by ID.




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

- **Response:**
  - **Status Code:** 200 OK
  - **Body:** Updated details of the medical history record.

### Authentication Routes

#### User Login

- **Endpoint:** `/auth/login`
- **Method:** `POST`
- **Description:** Handles user login.
- **Request Body:**
  - `username`: User's username
  - `password`: User's password

#### User Registration

- **Endpoint:** `/auth/register`
- **Method:** `POST`
- **Description:** Handles user registration.
- **Request Body:**
  - `username`: User's desired username
  - `password`: User's desired password

#### User Logout

- **Endpoint:** `/auth/logout`
- **Method:** `POST`
- **Authentication:** Required
- **Description:** Handles user logout.

### Appointment Routes

#### Book a New Appointment

- **Endpoint:** `/appointments/:doctorId/book`
- **Method:** `POST`
- **Authentication:** Required
- **Description:** Books a new appointment with a doctor.
- **Parameters:**
  - `doctorId`: ID of the doctor
- **Request Body:**
  - `date`: Date of the appointment (YYYY-MM-DD)
  - `time`: Time of the appointment (HH:mm)
  - `reason`: Reason for the appointment

#### Check Doctor Availability

- **Endpoint:** `/appointments/:doctorId/check-availability`
- **Method:** `POST`
- **Authentication:** Required
- **Description:** Checks the availability of a doctor for a specific date and time.
- **Parameters:**
  - `doctorId`: ID of the doctor
- **Request Body:**
  - `date`: Date of the appointment (YYYY-MM-DD)
  - `time`: Time of the appointment (HH:mm)

#### Get Patient's Appointments

- **Endpoint:** `/appointments/patients/:patientId`
- **Method:** `GET`
- **Authentication:** Required
- **Description:** Gets a list of appointments for a specific patient.
- **Parameters:**
  - `patientId`: ID of the patien