#!/bin/bash

# Build the Angular app
ng build > build.log 2>&1

# Echo the build output
cat build.log

# Login to Firebase and capture the output
firebase login > firebase_login.log 2>&1

# Echo the firebase login output
cat firebase_login.log

# Deploy to Firebase and capture the output
firebase deploy > firebase_deploy.log 2>&1

# Echo the firebase deploy output
cat firebase_deploy.log

echo "Build and deployment complete!"