const express = require("express")

const app = express()

const aws = require("aws-sdk")

const QueueUrl = "https://sqs.us-east-2.amazonaws.com/260532539243/MyFirstQueue"
const receipt = ""

// Aws credentials

aws.config.loadFromPath(__dirname + "/config.json")

const sqs = new aws.SQS()

// Creating A Queue

app.get("/create_queue", (req, res) => {
  const params = {
    QueueName: "Queue-3"
  }
  sqs.createQueue(params, function(err, data) {
    if (err) {
      res.send(err)
    } else {
      res.send(data)
      // QueueUrl: "https://sqs.us-east-2.amazonaws.com/260532539243/{QueueName}"
    }
  })
})

// Listing Available Sqs Messages

app.get("/list_messages", (req, res) => {
  sqs.listQueues(function(err, data) {
    res.send(data.QueueUrls)
  })
})

// Sending a Message

app.get("/send_message", (req, res) => {
  const params = {
    QueueUrl,
    MessageBody: JSON.stringify({
      name: "Rohito",
      message: "How far?"
    })
    // Other Options
  }
  sqs.sendMessage(params, function(err, data) {
    if (err) {
      res.send(err)
    } else {
      res.send(data)
    }
  })
})

// Receive a Message from a Queue

app.get("/get_message", (req, res) => {
  const params = {
    QueueUrl
    // Other Options
  }
  sqs.receiveMessage(params, function(err, data) {
    if (err) {
      res.send(err)
    } else {
      res.send(data)
      const { name } = JSON.parse(data.Messages[0].Body)
      console.log(name)

      // Delete The Message After Processing It

      // var params = {
      //   QueueUrl: queueUrl,
      //   ReceiptHandle: receipt
      // };

      // sqs.deleteMessage(params, function(err, data) {
      //   if(err) {
      //       res.send(err);
      //   }
      //   else {
      //       res.send(data);
      //   }
      // });
    }
  })
})

const port = process.env.PORT || 3000

app.listen(port, function() {
  console.log("We are live on Port", port)
})
