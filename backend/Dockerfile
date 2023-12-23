FROM node
WORKDIR /app
RUN apt-get update && apt-get install -y build-essential gcc libpq-dev make 
COPY package.json .
RUN npm install --force
COPY . .
EXPOSE 8000
CMD ["npm", "run", "dev"]