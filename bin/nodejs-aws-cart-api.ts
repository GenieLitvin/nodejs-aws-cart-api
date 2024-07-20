#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { NodejsAwsCartApiStack } from '../lib/nodejs-aws-cart-api-stack';
import * as dotenv from 'dotenv';


const app = new cdk.App();
dotenv.config();

new NodejsAwsCartApiStack(app, 'NodejsAwsCartApiStack', {
  environmentVariables: {
    DB_HOST:process.env.DB_HOST,
    DB_PORT:process.env.DB_PORT,
    DB_USERNAME:process.env.DB_USERNAME,
    DB_PASSWORD:process.env.DB_PASSWORD,
    DATABASE:process.env.DATABASE
  },
}as any);