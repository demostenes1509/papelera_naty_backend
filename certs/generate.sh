# https://medium.freecodecamp.org/how-to-get-https-working-on-your-local-development-environment-in-5-minutes-7af615770eec

# Generate root ssl certificate KEY
# rm -f rootCA.key
# openssl genrsa -des3 -out rootCA.key 2048

# Generate root ssl certificate
# rm -f rootCA.pem
# openssl req -x509 -new -nodes -key rootCA.key -sha256 -days 1024 -out rootCA.pem

# Trust root ssl certificate
# Darle doble click al archivo rootCA.pem y seguir las instrucciones del link

# Create domain ssl certificate
# Run it manually in command line !
# openssl req -new -sha256 -nodes -out server.csr -newkey rsa:2048 -keyout server.key -config <( cat server.csr.cnf )

# Sign ssl certificate with root ssl certificate
openssl x509 -req -in server.csr -CA rootCA.pem -CAkey rootCA.key -CAcreateserial -out server.crt -days 500 -sha256 -extfile v3.ext
