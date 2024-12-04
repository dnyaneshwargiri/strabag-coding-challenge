FROM node:21-alpine AS production
RUN yarn global add pm2 http-server
WORKDIR /app
COPY ./dist /app/employee-app/dist

EXPOSE 4000

RUN echo 'module.exports = {' \
            'apps: [' \
                '{' \
                    'name: "employee-app",' \
                    'script: "http-server",' \
                    'args: ["employee-app/dist/browser", "-p", "4000"]' \
                '}' \
            ']' \
        '}' > ecosystem.config.js

CMD ["pm2-runtime", "ecosystem.config.js"]
