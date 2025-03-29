FROM node
WORKDIR /app
COPY . .
COPY .env .
RUN npm install

EXPOSE 3000

CMD ["npm", "run", "start"]