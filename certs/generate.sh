#Pagina: https://medium.freecodecamp.org/how-to-get-https-working-on-your-local-development-environment-in-5-minutes-7af615770eec


#echo 'Generate rootCA.key'
#openssl genrsa -des3 -out rootCA.key 2048

#echo 'Generate rootCA.pem'
#openssl req -x509 -new -nodes -key rootCA.key -sha256 -days 1024 -out rootCA.pem

# Importar rootCA.pem en el browser, en la parte de certificados

# echo 'Generate server.key'
openssl req -new -sha256 -nodes -out server.csr -newkey rsa:2048 -keyout server.key -config <( cat server.csr.cnf )

# echo 'generate server.crt'
openssl x509 -req -in server.csr -CA rootCA.pem -CAkey rootCA.key -CAcreateserial -out server.crt -days 500 -sha256 -extfile v3.ext
