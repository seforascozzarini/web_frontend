#!/bin/bash

ssh_connection="ubuntu@16.171.174.105"
pem_key="deploy.pem"

docker exec zampo-front yarn generate

cp -R zampo/.output/public deploy
zip -r deploy.zip deploy
rm -rf deploy

scp -i deploy.pem deploy.zip "$ssh_connection":/var/www

rm -rf deploy.zip

ssh -i "$pem_key" "$ssh_connection" 'rm -rf /var/www/web-frontend'

ssh -i "$pem_key" "$ssh_connection" 'unzip /var/www/deploy.zip -d /var/www/ && mv /var/www/deploy /var/www/web-frontend'
ssh -i "$pem_key" "$ssh_connection" 'rm -rf /var/www/deploy.zip'

ssh -i "$pem_key" "$ssh_connection" 'chmod -R 775 /var/www/web-frontend'

ssh -i "$pem_key" "$ssh_connection" 'sudo service nginx restart'
