# Getting Started

This project mirrors a Spring Initializr style Spring Boot application and implements the LivePoll backend used in the experiment.

## Features
- JWT login and registration
- Google OAuth 2.0 login
- Role-based access control with USER and ADMIN
- Poll create, list, vote, and results APIs
- React frontend integration with CORS enabled
- H2 database for easy local setup

## Next steps
1. Add your Google OAuth credentials in `src/main/resources/application.yml`
2. Run the backend using Maven Wrapper or your local Maven install
3. Start the React frontend from the `frontend` folder
