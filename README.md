<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
  <h1>News Portal API</h1>
  <p>This repository contains the News Portal API, a backend application built with Node.js, Express, and Sequelize for managing news articles and categories, complete with JWT-based authentication.</p>

  <h2>Table of Contents</h2>
  <ul>
    <li><a href="#project-overview">Project Overview</a></li>
    <li><a href="#solutions-implemented">Solutions Implemented</a></li>
    <li><a href="#getting-started">Getting Started</a></li>
    <li><a href="#database-setup">Database Setup</a></li>
    <li><a href="#testing">Testing</a></li>
    <li><a href="#deployment">Deployment</a></li>
  </ul>

  <h2 id="project-overview">Project Overview</h2>
  <p>This API provides endpoints for managing news articles, categories, and user authentication. The application uses Sequelize as the ORM to manage MySQL databases.</p>

  <h2 id="solutions-implemented">Solutions Implemented</h2>
  <ul>
    <li><strong>Table Dependencies in Tests</strong>: Resolved dependency issues between <code>Category</code> and <code>News</code> tables by adding cascading deletion (<code>onDelete: 'CASCADE'</code>).</li>
    <li><strong>Test Environment Configuration</strong>: Added a <code>config.js</code> to manage separate configurations for <code>development</code> and <code>test</code> environments.</li>
    <li><strong>Automated Database Reset</strong>: The test suite begins by dropping all tables using <code>sequelize.drop()</code>.</li>
    <li><strong>Error Handling for Authentication</strong>: Updated the authentication controller to return specific error messages for invalid credentials.</li>
  </ul>

  <h2 id="getting-started">Getting Started</h2>
  <h3>Prerequisites</h3>
  <p>Make sure you have the following installed:</p>
  <ul>
    <li>Node.js v18.8.0</li>
    <li>MySQL</li>
    <li>Sequelize CLI</li>
  </ul>

  <h3>Installation</h3>
  <p>Clone the repository and install dependencies:</p>
  <pre><code>git clone &lt;repository-url&gt;
cd &lt;repository-folder&gt;
npm install
</code></pre>

  <h2 id="database-setup">Database Setup</h2>
  <p>Create the MySQL databases for development and testing as specified in <code>config/config.js</code>. Set up your environment variables accordingly.</p>

  <h3>Migrations and Seeding</h3>
  <p>To run migrations and seed data:</p>
  <pre><code>npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
</code></pre>

  <h2 id="testing">Testing</h2>
  <p>The test suite is built with Jest and Supertest.</p>

  <h3>Running Tests</h3>
  <p>To run the tests, ensure the test database is set up in <code>config/config.js</code>, then run:</p>
  <pre><code>npm test</code></pre>

  <h2 id="deployment">Deployment</h2>

  <h3>Environment Variables</h3>
  <p>Create a <code>.env</code> file with the following variables:</p>
  <pre><code>NODE_ENV=production
DB_HOST=&lt;your-database-host&gt;
DB_NAME=&lt;your-database-name&gt;
DB_USER=&lt;your-database-username&gt;
DB_PASS=&lt;your-database-password&gt;
JWT_SECRET=&lt;your-jwt-secret&gt;
PORT=3000
</code></pre>

  <h3>Starting the Server</h3>
  <p>To deploy locally or on a server:</p>
  <pre><code>NODE_ENV=production node app.js</code></pre>

  <h2>License</h2>
  <p>This project is open-source and available under the <a href="LICENSE">MIT License</a>.</p>
</body>
</html>
