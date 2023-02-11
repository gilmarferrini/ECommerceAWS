import * as cdk from 'aws-cdk-lib'
import { Construct } from 'constructs'
import * as lambdaNodeJS from 'aws-cdk-lib/aws-lambda-nodejs'
import * as apigateway from 'aws-cdk-lib/aws-apigateway'
import * as cloudWatchLogs from 'aws-cdk-lib/aws-logs'
import { Scope } from 'aws-cdk-lib/aws-ecs'

interface ECommerceApiStackProps extends cdk.StackProps {
  productsFetchHandler: lambdaNodeJS.NodejsFunction
}

export class ECommerceApiStack extends cdk.Stack {

  constructor(scope: Construct, id: string, props: ECommerceApiStackProps) {
    super(scope, id, props)
    const api = new apigateway.RestApi(this, 'ECommerceApi', {
      restApiName: 'ECommerceApi',
    })
    const productsFetchIntegration = new apigateway.LambdaIntegration(props.productsFetchHandler)
    const productsResource = api.root.addResource('products')
    productsResource.addMethod('GET', productsFetchIntegration)
  }
}