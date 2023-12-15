# CS520-Patient-Tracker

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

## How to Run

1. Install dependencies: `npm install`
2. Start the server: `npm start`

