# Building and Deploying a Google Cloud Vertex AI Application with Node.js and Cloud Run


## Objective
In this tutorial, we'll walk you through the process of building a Node.js application that leverages Google Cloud Vertex AI for machine learning capabilities. Additionally, we'll containerize the application using Docker and deploy it on Google Cloud Run. This end-to-end guide will help you harness the power of Vertex AI in a scalable and serverless environment.

## Presentation Link
https://docs.google.com/presentation/d/1W4R21LHziWI8fz-UpO7QEYpwb3MmL8KXHQyHDZQUNdc/edit#slide=id.g281f57695c8_0_3

### Screenshot
![Alt text](/images/screenshot.png?raw=true "Application Screenshot")


### Prerequisites
Before we begin, ensure you have the following prerequisites in place:

* Google Cloud Platform (GCP) Account: You need a GCP account to access Google Cloud Vertex AI services. If you don't have one, sign up here.

* Google Cloud SDK: Install the Google Cloud SDK, providing command-line tools for GCP services. Download it here.

* Node.js and npm: Ensure Node.js and npm are installed on your development machine. You can download them from the official Node.js website.

* Docker: Install Docker to create a container for your Node.js application. Get it from Docker's official website.

# Create VertexAI setup and build GenAI application

**Step 1: Create a GCP Project and Enable Vertex AI API**
If you haven't already, create a GCP project and enable the Vertex AI API:

* Open the Google Cloud Console.
* Click on the project dropdown and select "New Project."
* Follow the prompts to set up your project.
* In the Google Cloud Console, navigate to "APIs & Services" > "Dashboard."
* Click on the "+ ENABLE APIS AND SERVICES" button.
* Search for "Vertex AI API" and enable it for your project.

**Step 2: Create a Service Account:**
Next, create a service account for your project. Here's how:

* In the Cloud Console, go to "IAM & Admin" > "Service accounts."
* Click the "Create Service Account" button.
* Provide a name and description for your service account.
* Choose the role(s) you want to grant to this service account. Typically, you'll need roles like "Vertex AI Administrator" or more specific roles depending on your use case.
* Click "Continue" and then "Done" to create the service account.

**Step3: Generate a Key File:**
After creating the service account, you can generate a key file (JSON or P12) that will be used to authenticate as the service account. Here's how:

* Find the newly created service account in the list on the "Service accounts" page.
* Click on the service account's name.
* Go to the "Keys" tab and click the "Add Key" button.
* Choose whether you want to create a JSON key or a P12 key. JSON keys are more common for modern use cases.
* Click "Create" to generate the key file. The key file will be downloaded to your computer automatically.

**Step 4: Secure the Key File:**
It's essential to securely store and manage your service account key file, as it grants access to your Google Cloud resources. Keep it confidential and don't share it publicly.

**Step 5: Use the Key File:**
You can use the generated key file in your applications or scripts to authenticate as the service account and access Vertex AI resources and APIs. Be sure to handle credentials securely in your code.

Please note that Google Cloud services and their interfaces may evolve over time, so it's a good practice to refer to the official Google Cloud documentation for the most up-to-date instructions on working with service accounts and generating key files for Vertex AI or any other service.

**Step 6: Set Up Authentication**
To authenticate your application, configure the Google Cloud SDK with your credentials. Run the following command and follow the prompts:

gcloud auth application-default login

**Step 7: Run the application**

Run the application. Here are the steps:

Install the required Node.js libraries for working with Vertex AI.

`npm install @google-cloud/vertex-ai express body-parser`

Run the commant `node app.js` from the commandline

Make sure the application is running without any issue on local machine.


# Build Docker container

Now, let's containerize your Node.js application using Docker. Creating a Docker container for a Node.js application involves a few steps. Docker allows you to package your Node.js application and its dependencies into a single container, making it easy to distribute and deploy. Here are the steps to create a Docker container for a Node.js application:

**Step 1: Install Docker:** 
Make sure you have Docker installed on your system. You can download and install Docker from the official Docker website: https://docs.docker.com/get-docker/

**Step 2: Create a Node.js Application:** 
Ensure that your application has a package.json file defining its dependencies. In this example, we have a working vertex ai application already. 

**Step 3: Create a Dockerfile:**
Create a file named Dockerfile in the root directory of your Node.js application. This file will contain instructions for building your Docker image.

`
FROM node:18
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8080
CMD ["node", "app.js" ]
`

**Step 4: Build the Docker Image:**
Open a terminal/command prompt in the same directory as your Dockerfile and run the following command to build the Docker image:

`docker build -t my-nodejs-app .`

since, I am using macbook, I am adding additional parameters to run on google cloud later.

`docker buildx build --platform linux/amd64 -t my-nodejs-app .`

Replace my-nodejs-app with a suitable name for your Docker image. The . at the end specifies the build context (the current directory).

**Step 5: Run the Docker Container:**
After successfully building the Docker image, you can run a container from it using the following command:

`docker run -p 3000:3000 -d my-nodejs-app`

This command maps port 3000 from your host machine to port 3000 inside the container, assuming your Node.js application listens on port 3000.

**Step 6: Access Your Application:**
Once the container is running, you can access your Node.js application by opening a web browser and navigating to http://localhost:3000 if your application is serving content on port 3000.

**Step 7: Manage Your Docker Containers:**
To stop a running container, press Ctrl+C in the terminal where it's running, or use docker stop <container_id>.

To remove a container, use docker rm <container_id>.

To list running containers, use docker ps.

To list all containers (including stopped ones), use docker ps -a.

That's it! You've successfully created a Docker container for your Node.js application. Docker allows you to package and deploy your application consistently across different environments, making it easier to manage and distribute your software.


# Deploy container using CloudRun

Google Cloud Run is a serverless platform for running containerized applications, allowing you to easily deploy and manage containerized workloads in a fully managed environment. To run an existing Docker container on Google Cloud Run, follow these steps:

**Step 1: Prepare Your Docker Container:**

Ensure that you have a Docker container image prepared and pushed to a container registry, such as Google Container Registry (GCR) or Docker Hub. Your container image should contain the application you want to run.

 `docker tag ai2 gcr.io/<google project id>/my-nodejs-app`
 `docker push gcr.io/<google project id>/my-nodejs-app`


**Step 2: Enable Google Cloud Run API:**

Ensure that the Google Cloud Run API is enabled for your selected project. You can do this by going to "APIs & Services" > "Dashboard" and clicking on the "+ ENABLE APIS AND SERVICES" button. Then, search for "Cloud Run" and enable the Cloud Run API.

**Step 3: Navigate to Cloud Run:**

In the Google Cloud Console, navigate to "Cloud Run" by selecting it from the left-hand menu under the "Compute" section.

**Step 4: Create a New Service:**

Click the "Create Service" button to create a new Cloud Run service.

**Step 5: Configure Your Service:**

Service Configuration:

* Deployment Platform: Choose "Fully managed" for the fully managed environment.
* Container Image: Enter the URL of your container image in the format gcr.io/my-project/ my-image:latest or browse for it if it's in your Google Container Registry.
* Service Name: Provide a name for your service.
* Region: Select the region where you want to deploy your service.
Authentication:

Choose whether you want to allow unauthenticated access (public access) or require authentication.
Advanced Settings (Optional):

Configure advanced settings like memory allocation and timeout if needed.

**Step 6: Deploy Your Service:**

Click the "Create" button to deploy your service. Google Cloud Run will automatically set up the necessary infrastructure and deploy your container.

**Step 7: Wait for Deployment:**

The deployment process may take a few minutes. You can monitor the progress on the Cloud Run dashboard.

**Step 8: Access Your Cloud Run Service:**

Once the deployment is complete, you will see a URL listed for your service on the Cloud Run dashboard. You can access your application by opening this URL in a web browser.

`https://ai3-ygw5l5uvpq-uc.a.run.app`

**Step 9: Manage and Monitor Your Service:**

You can manage and monitor your Cloud Run service directly from the Cloud Run dashboard. It provides information about usage, revisions, and logs.

**Step 10: Scaling:**

Google Cloud Run automatically scales your application based on traffic. You can configure the concurrency settings and maximum number of instances from the Cloud Console if needed.

**Step 11: Cleaning Up:**

To stop your Cloud Run service and delete resources associated with it, you can go to the Cloud Run dashboard, select your service, and click "Delete."

That's it! You've successfully created a service from a container image in Google Container Registry and deployed it to Google Cloud Run using the Google Cloud Console's user interface. Cloud Run is a serverless platform that simplifies the deployment of containerized applications.







