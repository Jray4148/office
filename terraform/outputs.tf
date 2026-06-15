output "amplify_app_id" {
  description = "AWS Amplify App ID"
  value       = aws_amplify_app.Office.id
}

output "amplify_default_domain" {
  description = "Default Amplify domain"
  value       = aws_amplify_app.Office.default_domain
}

output "amplify_main_branch_url" {
  description = "Production URL for the main branch"
  value       = "https://${aws_amplify_branch.main.branch_name}.${aws_amplify_app.Office.default_domain}"
}
