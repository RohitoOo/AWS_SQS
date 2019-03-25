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

// Listing Available Sqs Queues

app.get("/queues", (req, res) => {
  sqs.listQueues(function(err, data) {
    res.send(data.QueueUrls)
  })
})

// Sending a Message

app.get("/send_message", (req, res) => {
  const params = {
    QueueUrl,
    MessageBody: JSON.stringify({
      name: "Bhambhani",
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

// Sending a Message

app.get("/send_message_2", (req, res) => {
  const params = {
    QueueUrl,
    MessageBody: JSON.stringify({
      name: "Rohito Bhambhani",
      message: "How far? How your Body?"
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
    QueueUrl,
    // MaxNumberOfMessages: 10,
    VisibilityTimeout: 4
    // Other Options
  }
  sqs.receiveMessage(params, function(err, data) {
    if (err) {
      res.send(err)
    } else {
      res.send(data)
      const { name } = JSON.parse(data.Messages[0].Body)
      const receipt = data.Messages[0].ReceiptHandle

      // console.log("MESSAGES", data)
      // console.log("Name", name)
      // console.log("Receipt", receipt)

      // Delete The Message After Processing It

      var delete_params = {
        QueueUrl,
        ReceiptHandle: receipt
      }

      sqs.deleteMessage(delete_params, function(err, data) {
        if (err) {
          console.log(err)
        } else {
          console.log("Deleted Message", data)
        }
      })
    }
  })
})

// Purging the entire queue.
app.get("/purge", function(req, res) {
  var params = {
    QueueUrl
  }

  sqs.purgeQueue(params, function(err, data) {
    if (err) {
      res.send(err)
    } else {
      res.send(data)
    }
  })
})

const port = process.env.PORT || 3000

app.listen(port, function() {
  console.log("We are live on Port", port)
})
