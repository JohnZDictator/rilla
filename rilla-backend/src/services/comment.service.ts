import { GetItemCommand, PutItemCommand, DeleteItemCommand, ScanCommand, UpdateItemCommand, GetItemCommandInput, PutItemCommandInput, UpdateItemCommandInput, DeleteItemCommandInput } from "@aws-sdk/client-dynamodb"
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb"
import { APIGatewayProxyEvent, APIGatewayProxyResult }  from 'aws-lambda'

import { dynamoDB } from "../utils/aws-config"
import { Comment } from "../models/comment.model"

export const getComment = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult>  =>{
  const response:APIGatewayProxyResult  = { statusCode: 200, body: '' }

  try {
    const params: GetItemCommandInput = {
      TableName: 'comments',
      Key: marshall({ commentId: event.pathParameters?.commentId })
    }
    const { Item } = await dynamoDB.send(new GetItemCommand(params))
    
    response.body = JSON.stringify({
      message: 'Successfully retrieved comments',
      data: (Item) ? unmarshall(Item) : {},
      rawData: Item,
    })
  } catch (e: any) {
    response.statusCode = 500
    response.body = JSON.stringify({ 
      message: 'Failed to get comment',
      errorMessage: e.message,
      errorStack: e.stack,
    })
  }
  
  return response
}

export const createComment = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult>  =>{
  const response:APIGatewayProxyResult  = { statusCode: 200, body: '' }

  try {
    const body = JSON.parse(event.body || '')
    const params: PutItemCommandInput = {
      TableName: 'comments',
      Item: marshall(body)
    }
    const createResult = await dynamoDB.send(new PutItemCommand(params))
    
    response.body = JSON.stringify({
      message: 'Successfully created comment',
      createResult,
    })
  } catch (e: any) {
    response.statusCode = 500
    response.body = JSON.stringify({ 
      message: 'Failed to create comment',
      errorMessage: e.message,
      errorStack: e.stack,
    })
  }

  return response
}

export const updateComment = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult>  =>{
  const response:APIGatewayProxyResult  = { statusCode: 200, body: '' }

  try {
    const body = JSON.parse(event.body || '')
    const objKeys = Object.keys(body);
    const params: UpdateItemCommandInput = {
      TableName: 'comments',
      Key: marshall({ commentId: event.pathParameters?.commentId }),
      UpdateExpression: `SET ${objKeys.map((_, index) => `#key${index} = :value${index}`).join(", ")}`,
      ExpressionAttributeNames: objKeys.reduce((acc, key, index) => ({
          ...acc,
          [`#key${index}`]: key,
      }), {}),
      ExpressionAttributeValues: marshall(objKeys.reduce((acc, key, index) => ({
          ...acc,
          [`:value${index}`]: body[key],
      }), {})),
    }
    const updateResult = await dynamoDB.send(new UpdateItemCommand(params))
    
    response.body = JSON.stringify({
      message: 'Successfully updated comment',
      updateResult,
    })
  } catch (e: any) {
    response.statusCode = 500
    response.body = JSON.stringify({ 
      message: 'Failed to update comment',
      errorMessage: e.message,
      errorStack: e.stack,
    })
  }

  return response
}

export const deleteComment = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult>  =>{
  const response:APIGatewayProxyResult  = { statusCode: 200, body: '' }

  try {
    const params: DeleteItemCommandInput = {
      TableName: 'comments',
      Key: marshall({ commentId: event.pathParameters?.commentId })
    }
    const deleteResult = await dynamoDB.send(new DeleteItemCommand(params))
    
    response.body = JSON.stringify({
      message: 'Successfully deleted comment',
      deleteResult
    })
  } catch (e: any) {
    response.statusCode = 500
    response.body = JSON.stringify({ 
      message: 'Failed to delete comment',
      errorMessage: e.message,
      errorStack: e.stack,
    })
  }
  
  return response
}

export const getAllComments = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const response:APIGatewayProxyResult  = { statusCode: 200, body: '' }

  try {
    const { Items } = await dynamoDB.send(new ScanCommand({TableName: 'comments'}))
    
    response.body = JSON.stringify({
      message: 'Successfully retrieved all comments',
      data: (Items || []).map((item): any => unmarshall(item)),
      Items,
    })
  } catch (e: any) {
    response.statusCode = 500
    response.body = JSON.stringify({ 
      message: 'Failed to get comment',
      errorMessage: e.message,
      errorStack: e.stack,
    })
  }
  
  return response
}