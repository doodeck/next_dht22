Backend part - serverless (lambda) functions transferred from obsoleted project
https://github.com/doodeck/iot_dht22

* TODO: in next dev environment getting on all /api/be/... endpoints the messages "API resolved without sending a response for /api/be/weather, this may result in stalled requests.". Nevertheless the seem to work, also deployed to vercel. Can it be a solution?
  * sounds probable, although I'm not using callbacks everywhere where the problem appears, e.g. /api/be/db https://github.com/vercel/next.js/issues/10439#issuecomment-583214126
  * https://stackoverflow.com/questions/60684227/api-resolved-without-sending-a-response-in-nextjs
* TODO: cronjobs https://vercel.com/guides/how-to-setup-cron-jobs-on-vercel for:
  * logWeather() approximately every hour
  * rebuild static HTMLs, depending on available vercel processing budget