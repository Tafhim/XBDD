## Certs

This folder is where xbdd-backend-dev.crt xbdd-backend-dev.key must be placed after being generated.
There are environment variables that use these to allow xbdd to use https while on localhost.

### Generate the certs and keystore

1. Run `./createBackendCerts.sh`
1. You will be prompted for a password 3 times, each time use `password` as the password.
1. Make sure you update your maven project (including snapshots) after this.
