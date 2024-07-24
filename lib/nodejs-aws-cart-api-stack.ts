import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as path from 'path';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
interface NodejsAwsCartApiStackProps extends cdk.StackProps {
  environmentVariables: { [key: string]: string };
}
export class NodejsAwsCartApiStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: NodejsAwsCartApiStackProps) {
    super(scope, id, props);

    const nestLambda = new lambda.Function(this, 'NestLambda', {
      runtime: lambda.Runtime.NODEJS_18_X, 
      handler: 'main.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '../dist-compiled')), 
      environment: props.environmentVariables, 
    });

     new apigateway.LambdaRestApi(this, 'NestJsApi', {
      handler: nestLambda,
      proxy: true,
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
        allowMethods: apigateway.Cors.ALL_METHODS, // ALLOW GET, POST, PUT, DELETE, etc.
        allowHeaders: [
          'Content-Type',
          'X-Amz-Date',
          'Authorization',
          'X-Api-Key',
          'X-Amz-Security-Token',
        ],
      },
    });
  }
}
