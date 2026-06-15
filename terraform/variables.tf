variable "github_token" {
  description = "GitHub access token used by AWS Amplify to access the repository"
  type        = string
  sensitive   = true
}

variable "repository_url" {
  description = "GitHub repository URL for the Amplify application"
  type        = string
  default     = "https://github.com/rsi77/office"
}
