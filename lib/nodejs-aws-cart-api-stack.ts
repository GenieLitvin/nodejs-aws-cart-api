import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as path from 'path';

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
  }
}
