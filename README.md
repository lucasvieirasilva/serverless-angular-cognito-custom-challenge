# Serverless Framework + Angular + Cognito Custom Challenge

## Overview

![architecture](images/lambda-challenges.png)

## Prerequirement

Install serverless cli.

```shellscript
npm i -g serverless
```

## Deploy Backend

### Install dependencies

Navigate to Folder

```shellscript
cd backend
```

Install dependencies

```shellscript
npm i
```

### Deploy

Deploy backend environment

```shellscript
serverless deploy
```

## Deploy Front-end

### Install dependencies

Navigate to Folder

```shellscript
cd client
```

Install dependencies

```shellscript
npm i
```

Deploy to S3 + CloudFront

```shellscript
npm run build-deploy
```
