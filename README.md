# Serverless Cron Jobs Library

A simple library to schedule cron jobs and fetch data from APIs using Node.js. This library allows you to define cron jobs with custom schedules and handle errors gracefully.

## Installation

To use this library in your project, install it via npm or yarn:

```bash
npm install serverless-cron-jobs
```
OR
```bash
yarn add serverless-cron-jobs
```

## Importing the Library
```bash
import { scheduleJob, fetchDataFromApi } from 'serverless-cron-jobs';
```

## Scheduling a Cron Job
Use the scheduleJob function to schedule a cron job. The function takes the following parameters:
cronExpression (string): The cron expression that defines the schedule.
job (JobFunction): A function that will be executed at the scheduled times. This function takes an optional URL parameter.
url (string, optional): A URL to be passed to the job function.

## Example
```bash
import { scheduleJob, fetchDataFromApi } from 'serverless-cron-jobs';

// URL of the API to fetch data from
const apiUrl = 'https://api.example.com/data'; // Replace with your API URL

// Schedule a cron job to fetch data from the API every day at midnight
scheduleJob('0 0 * * *', fetchDataFromApi, apiUrl);
```

## `fetchDataFromApi`

Fetches data from a specified URL and logs the data or errors.

### Parameters

- `url` (string): The URL from which to fetch data.
- `timeout` (number, optional): The timeout for the request in milliseconds (default is 5000).

### Returns

- A promise that resolves when the data is successfully retrieved and parsed, or rejects if an error occurs.

### Example

```typescript
import { fetchDataFromApi } from 'serverless-cron-jobs';

const apiUrl = 'https://api.example.com/data';

fetchDataFromApi(apiUrl)
  .then(() => {
    console.log('Data fetched and processed successfully');
  })
  .catch((error) => {
    console.error('Error fetching data:', error);
  });
```

### Key Sections Explained:

1. **Installation**: Instructions on how to add the library to a project.
2. **Usage**: Shows how to use the `scheduleJob` and `fetchDataFromApi` functions with code examples.
3. **API Documentation**: Detailed information about the functions available in the library.
4. **Error Handling**: Information on how the library handles errors.
5. **Testing**: Instructions for running tests using Jest.
6. **License**: Details about the licensing of the library.

Feel free to adjust the content to better fit your library's specific details or your personal preferences!
