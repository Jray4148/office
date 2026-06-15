#!/bin/bash

# deploy-office.sh
# Usage:
#   ./deploy-office.sh config      # Apply Terraform only
#   ./deploy-office.sh deploy      # Deploy Amplify main branch
#   ./deploy-office.sh both        # Terraform + Deploy

AWS_REGION="us-east-1"
AMPLIFY_APP_ID="dz13b8w7e08x8"  
BRANCH_NAME="main"
TERRAFORM_DIR="terraform"

###############################################
# Terraform Infrastructure Update
###############################################
update_infrastructure() {
    echo "🏗️  Applying Terraform configuration..."

    cd "$TERRAFORM_DIR" || { echo "❌ Failed to enter terraform directory"; exit 1; }

    if [ ! -d ".terraform" ]; then
        echo "🔄 Initializing Terraform..."
        terraform init || { echo "❌ terraform init failed"; exit 1; }
    fi

    echo "🔍 Validating Terraform..."
    terraform validate || { echo "❌ terraform validate failed"; exit 1; }

    echo "📋 Planning changes..."
    terraform plan || { echo "❌ terraform plan failed"; exit 1; }

    echo "🚀 Applying changes..."
    terraform apply -auto-approve || { echo "❌ terraform apply failed"; exit 1; }

    echo "✅ Terraform infrastructure updated!"
    cd - > /dev/null
}

###############################################
# Trigger Amplify Deployment
###############################################
deploy_to_amplify() {
    echo "🚀 Starting Amplify deployment for branch: $BRANCH_NAME"

    aws amplify start-job \
        --app-id "$AMPLIFY_APP_ID" \
        --branch-name "$BRANCH_NAME" \
        --job-type RELEASE \
        --region "$AWS_REGION" > /dev/null

    if [ $? -eq 0 ]; then
        echo "🎉 Deployment started!"
        echo "🔗 View job: https://console.aws.amazon.com/amplify/apps/$AMPLIFY_APP_ID/branches/$BRANCH_NAME"
        echo "🌍 Amplify URL: https://$BRANCH_NAME.$AMPLIFY_APP_ID.amplifyapp.com"
    else
        echo "❌ Failed to start Amplify deployment"
        exit 1
    fi
}

###############################################
# Script Command Routing
###############################################
case "$1" in
    "config")
        update_infrastructure
        ;;
    "deploy")
        deploy_to_amplify
        ;;
    "both")
        update_infrastructure
        deploy_to_amplify
        ;;
    *)
        echo "🚨 Invalid command"
        echo "Usage:"
        echo "  ./deploy-office.sh config   # Terraform only"
        echo "  ./deploy-office.sh deploy   # Deploy Amplify"
        echo "  ./deploy-office.sh both     # Apply + Deploy"
        exit 1
        ;;
esac

exit 0
