FROM cypress/included:13.6.4 

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npx", "cypress", "run", "--component", "--headless", "--browser", "chrome"]



