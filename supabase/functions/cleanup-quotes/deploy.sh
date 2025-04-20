#!/bin/bash

# Deploy the Edge Function
supabase functions deploy cleanup-quotes

# Set up a cron job to trigger the function every hour
curl -X POST "https://api.cron-job.org/jobs" \
  -H "Authorization: Bearer $CRON_JOB_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "job": {
      "url": "'"$SUPABASE_PROJECT_URL"'/functions/v1/cleanup-quotes",
      "enabled": true,
      "saveResponses": true,
      "schedule": {
        "timezone": "UTC",
        "hours": [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
        "mdays": [-1],
        "minutes": [0],
        "months": [-1],
        "wdays": [-1]
      }
    }
  }' 