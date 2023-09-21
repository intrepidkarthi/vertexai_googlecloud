"use strict";
require('dotenv').config();

async function generateBlog(promptText, location = "us-central1") {
  const aiplatform = require("@google-cloud/aiplatform");

  const { PredictionServiceClient } = aiplatform.v1;

  const { helpers } = aiplatform;

  const clientOptions = {
    apiEndpoint: "us-central1-aiplatform.googleapis.com",
  };

  const publisher = "google";
  const model = "text-bison@001";
  const projectId = "vertexai-399501";


  // Instantiates a client
  const predictionServiceClient = new PredictionServiceClient(clientOptions);

  async function callPredict() {
    const endpoint = `projects/${projectId}/locations/${location}/publishers/${publisher}/models/${model}`;

    const prompt = {
      prompt: promptText.toString(),
    };

    const instanceValue = helpers.toValue(prompt);

    const instances = [instanceValue];

    const parameter = {
      candidateCount: 1,
      temperature: 0.1,
      maxOutputTokens: 1024,
      topP: 0.9,
      topK: 40,
    };
    const parameters = helpers.toValue(parameter);

    const request = {
      endpoint,
      instances,
      parameters,
    };

    const response = await predictionServiceClient.predict(request);

    return response[0].predictions[0].structValue.fields.content.stringValue;
  }

  return callPredict();
}

module.exports = { generateBlog };
