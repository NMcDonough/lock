ng build --prod --deploy-url=/lock/ --output-hashing=bundles
rm -R /var/www/lock/lock
mkdir /var/www/lock/lock
cp -r dist/public/* /var/www/lock/lock
