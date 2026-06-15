terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "us-east-1"
}

resource "aws_amplify_app" "Office" {
  name                        = "Office"
  repository                  = var.repository_url
  platform                    = "WEB"

  enable_branch_auto_build    = true
  enable_auto_branch_creation = false

  access_token = var.github_token

  # Angular build spec
  build_spec = file("${path.module}/../buildspec.yml")
}

resource "aws_amplify_branch" "main" {
  app_id      = aws_amplify_app.Office.id
  branch_name = "main"
  stage       = "PRODUCTION"

  # REQUIRED for script-driven deploys
  enable_auto_build = false
}
