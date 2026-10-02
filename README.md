# S3 Presigned URL Upload Flow for a Mobile App

## Project Overview

This project demonstrates a secure file upload architecture using AWS S3 Presigned URLs.

The application allows a user to select an image and upload it directly to an Amazon S3 bucket without exposing AWS credentials in the frontend.

## Architecture

User / Mobile UI
        ↓
API Gateway
        ↓
AWS Lambda
        ↓
Generate S3 Presigned URL
        ↓
Frontend receives URL
        ↓
Direct PUT Upload
        ↓
Amazon S3

## AWS Services Used

- Amazon S3
- AWS Lambda
- Amazon API Gateway
- AWS IAM

## Frontend Technologies

- HTML
- CSS
- JavaScript
- XMLHttpRequest for upload progress

## Features

- Image selection
- Image preview
- File name, size and type display
- Secure presigned URL generation
- Direct upload to Amazon S3
- Real-time upload progress
- Upload success/error status
- No AWS credentials stored in the frontend

## Security

The frontend does not contain AWS Access Keys or Secret Access Keys.

AWS Lambda generates a temporary presigned URL that allows the client to upload an object directly to a specific S3 location.

## Upload Flow

1. User selects an image.
2. Frontend sends the file information to API Gateway.
3. API Gateway invokes AWS Lambda.
4. Lambda generates an S3 presigned PUT URL.
5. The URL is returned to the frontend.
6. The frontend uploads the image directly to S3.
7. S3 stores the object inside the `uploads/` folder.

## Project Status

✅ Successfully implemented and tested.

Files uploaded through the frontend were verified in the Amazon S3 bucket.