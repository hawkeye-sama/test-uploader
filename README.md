# This is NextJS based PDF Uploader & Downloader

TechStack

- Node v18.17.0
- NextJS 14
- NextJS API Functions for Backend in NodeJS ( see /src/api folder )
- MongoDB
- GCP

## Setup

- Download the code first, after that instlal dependendencies ( inside the downloaded folder ):

`yarn`

- Rename `.env-dev.local` to `.env.local`

### Allow everyone to read the bucket

- Setup GCP Bucket
  - Open up gcp console and open up bucket
  - Create a new bucket with default values
  - Open the bucket and go to permissions tab
  - Click on Grant Access, inside new principles write `allUsers` and select it
  - Click on role, select `Storage Object Viewer`, Click on Save afterwards
  
### Allow only a service account to write into bucket

- Setup GCP Service Account
  - Click create new service account button
  - Provide name, select role, `Storage Object Creator` which allows uploading via server, skip next step
  - Save the service account
  - Click on the `...` button on side of service account, and select manage keys
  - Click on Add Key, and select JSON, then save it. It will download JSON of credentials to your pc

### Setting env

From your GCP Service account credentials provide the following inside `.env.local`

`BUCKET_NAME="" # GCP Bucket name`

`CLIENT_EMAIL="" # GCP Service account email address`

`PRIVATE_KEY="" # GCP Service account private key`

`PROJECT_ID="" # GCP project id`

Provide your mongodb url  

`MONGODB_URI="" # MONGO DB URL which includes username and password`

## Developement

After configuring all above, you can run the following command to run the server locally:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
