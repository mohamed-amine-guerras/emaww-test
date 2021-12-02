FROM node:14.18.1-alpine
# Or whatever Node version/image you want
WORKDIR '/var/www/app'

CMD ["npm rebuild bcrypt --build-from-source"]
