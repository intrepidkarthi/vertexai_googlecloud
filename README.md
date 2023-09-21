# vertexai_googlecloud
Build a simple vertex ai application, build docker container, deploy in google cloud using cloudrun

## Objective
In this tutorial, we'll walk you through the process of building a Node.js application that leverages Google Cloud Vertex AI for machine learning capabilities. Additionally, we'll containerize the application using Docker and deploy it on Google Cloud Run. This end-to-end guide will help you harness the power of Vertex AI in a scalable and serverless environment.

### Prerequisites
Before we begin, ensure you have the following prerequisites in place:

* Google Cloud Platform (GCP) Account: You need a GCP account to access Google Cloud Vertex AI services. If you don't have one, sign up here.

* Google Cloud SDK: Install the Google Cloud SDK, providing command-line tools for GCP services. Download it here.

* Node.js and npm: Ensure Node.js and npm are installed on your development machine. You can download them from the official Node.js website.

* Docker: Install Docker to create a container for your Node.js application. Get it from Docker's official website.

# Build GenAI application

**Step 1: Create a GCP Project and Enable Vertex AI API**
If you haven't already, create a GCP project and enable the Vertex AI API:

Open the Google Cloud Console.
Click on the project dropdown and select "New Project."
Follow the prompts to set up your project.
In the Google Cloud Console, navigate to "APIs & Services" > "Dashboard."
Click on the "+ ENABLE APIS AND SERVICES" button.
Search for "Vertex AI API" and enable it for your project.

**Step 2: Set Up Authentication**
To authenticate your application, configure the Google Cloud SDK with your credentials. Run the following command and follow the prompts:

gcloud auth application-default login

**Step 3: Create a Machine Learning Model**
Before proceeding, you need a trained machine learning model in your GCP project. You can either create one using Vertex AI's AutoML or Custom Training capabilities or use a pre-trained model.

**Step 4: Build Your Node.js Application**
Create a Node.js application that interacts with Vertex AI




**Build Docker container**



**Deploy container using CloudRun**






