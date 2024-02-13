
# Expense Tracker Frontend

Comprehensive Financial Analysis Tool: Keyword-Based Transaction Search and Trend Visualization

![Expense Tracker Interface 1](https://i.ibb.co/XXg9fCY/task-1.png)
![Expense Tracker Interface 2](https://i.ibb.co/Zd78p4X/task-1-3.png)
![Expense Tracker Interface 3](https://i.ibb.co/YP70DnS/task-3.png)

## Problem Statement

1.Overview: Introduce the Comprehensive Financial Analysis Tool, designed to assist businesses in managing and analyzing their financial transactions.
2.Task 1 - Keyword-Based Transaction Search:
Enable users to search for specific transaction keywords across multiple bank statements.
Feature options to select specific bank accounts and define a time range for the search.
3.Task 2 - Trend Visualization and Aggregation:
Allow users to visualize trends and aggregate data for specified financial categories over time.
Implement keyword matching to categorize transactions in line items, such as "salary", "marketing", etc.
4. Task 3 - Automated Category Identification:
Develop an algorithm to automatically identify common spending and earning categories from bank statements.
Provide a breakdown of transactions for each identified category, with functionality similar to Task 2.

## Setting up the Frontend in Local Environment

To set up UnstopFrontend locally, follow these steps:

1. **Clone the repository**:
   ```bash
   https://github.com/sum1275/expence_tracker_frontend.git
2. **Update apiUrl**:
   In `src/environments/environment.ts`, update the `apiUrl` to point to your local server environment:
   ```typescript
   apiUrl = 'http://localhost:8084/';

3. **Start the Server**:
   To initiate the application server, execute the following command in your terminal:
   ```bash
   ng serve
5. **Contributing**:
   Your contributions are essential to the development and improvement of the Expense Tracker project. Here are the steps to contribute:

   1. **Fork the Project**: Begin by creating your own copy of the project on GitHub.
   2. **Create Your Feature Branch**: Start a new feature by using the command:
      ```git
      git checkout -b feature/AmazingFeature
      ```
   3. **Commit Your Changes**: After completing your feature, commit your changes with:
      ```git
      git commit -m 'Add some AmazingFeature'
      ```
   4. **Push to the Branch**: Upload your new feature to GitHub using:
      ```git
      git push origin feature/AmazingFeature
      ```
   5. **Open a Pull Request**: Finally, submit your changes for review to be potentially merged into the main project.



   
