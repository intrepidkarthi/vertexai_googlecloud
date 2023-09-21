"use strict";

const { writeFile, readFile, readFileSync } = require("fs");

async function main(project, location = "us-central1") {
  const aiplatform = require("@google-cloud/aiplatform");

  const { PredictionServiceClient } = aiplatform.v1;

  const { helpers } = aiplatform;

  const clientOptions = {
    apiEndpoint: "us-central1-aiplatform.googleapis.com",
  };

  const publisher = "google";
  const model = "text-bison@001";

  // Instantiates a client
  const predictionServiceClient = new PredictionServiceClient(clientOptions);

  async function callPredict() {
    const endpoint = `projects/cohesive-point-391410/locations/${location}/publishers/${publisher}/models/${model}`;

    const promptText = readFileSync("./prompt.txt");

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

    // Predict request
    const response = await predictionServiceClient.predict(request);
    console.log("Get text prompt response");

    writeFile(
      "./output.md",
      response[0].predictions[0].structValue.fields.content.stringValue,
      () => {
        console.log("done");
      }
    );
  }

  callPredict();
}

process.on("unhandledRejection", (err) => {
  console.error(err.message);
  process.exitCode = 1;
});

main(...process.argv.slice(2));
