const express = require("express")

const app = express()

const aws = require("aws-sdk")

const queueUrl = "https://sqs.us-east-2.amazonaws.com/260532539243/MyFirstQueue"
const receipt = ""

// Aws credentials

aws.config.loadFromPath(__dirname + "/config.json")

const sqs = new aws.SQS()

// Creating A Queue

app.get("/create", (req, res) => {
  const params = {
    QueueName: "Queue-1",
    info: {
      name: "Rohito",
      message: "How far?"
    }
  }
  sqs.createQueue(params, function(err, data) {
    if (err) {
      res.send(err)
    } else {
      res.send(data)
      // QueueUrl: "https://sqs.us-east-2.amazonaws.com/260532539243/MyFirstQueue"
    }
  })
})

// Listing Available Sqs Messages

app.get("/list_messages", (req, res) => {
  sqs.listQueues(function(err, data) {
    res.send(data.QueueUrls)
  })
})

const port = process.env.PORT || 3000

app.listen(port, function() {
  console.log("We are live on Port", port)
})
