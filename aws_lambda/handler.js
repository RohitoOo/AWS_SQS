"use strict"

const AWS = require("aws-sdk")
var sqs = new AWS.SQS({ region: "us-east-2" })

const AWS_ACCOUNT = process.env.ACCOUNT_ID

const QUEUE_URL = `https://sqs.us-east-2.amazonaws.com/${AWS_ACCOUNT}/MyQueue`

module.exports.hello = async (event, context) => {
  const params = {
    MessageBody: "Hola!",
    QueueUrl: QUEUE_URL
  }
  sqs.sendMessage(params, function() {
    if (event) {
      console.log("error", "Fail to send message" + err)

      const response = {
        statusCode: 500,
        body: JSON.stringify({
          message: "Error Occurred"
        })
      }

      return {
        statusCode: 200,
        body: JSON.stringify({
          response
        })
      }
    } else {
      console.log("data", data.MessageId)

      const response = {
        statusCode: 200,
        body: JSON.stringify({
          message: data.MessageId
        })
      }
      return {
        statusCode: 200,
        body: JSON.stringify({
          response
        })
      }
    }
  })
}

module.exports.sqsHello = async (event, context) => {
  console.log("Lambda Function Called")

  console.log(event)

  // context.done(null, '')
}
