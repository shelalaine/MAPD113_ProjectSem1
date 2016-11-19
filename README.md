# MAPD113_ProjectSem1
Healthcare Project - Patient Data REST API

The HealthMatic application will be used by the health practitioners in the hospital to monitor or track patient’s record. 
There will be four types of users who will be using the app that will have different roles, these are the admin, doctors, 
nurses, and the lab technicians.

All of the patients and health practitioners data used by the HealthMatic application shall be saved in the MongoDB. 
The data shall be stored and retrieved by using the HTTP POST and GET methods that will be sent to the Data Server. The data 
server shall use Node.js and the RESTify framework to process the different requests from the HealthMatic application client. 
It will also interact with the MongoDB through Mongoose framework to access the patients and health practitioners data.

Version 1.0.0
APIs supported are as follows:

1. Create patient
2. Get all patients
3. Get patient by ID
4. Delete patient by ID
5. Add new vital record of a patient by ID
6. Add new prescription record of a patient by ID

Version 1.1.0
APIs supported are as follows:

1. Create patient
2. Get all patients
3. Get patient by ID
4. Delete patient by ID
5. Add new vital record of a patient by ID
6. Add new prescription record of a patient by ID
7. Add new lab test record of a patient by ID
8. Add new nurse assigned to the patient by ID
9. Add new doctor assigned to the patient by ID
10. Add new doctor notes to the patient by ID
11. Delete Patient's test/note/vitals/prescription/nurse/doctor by ID API
12. Update Patient's profile by ID

