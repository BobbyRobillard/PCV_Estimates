FROM node:20

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Now copy the rest of the frontend code
COPY . .

# Expose port for Vite dev server
EXPOSE 5173

CMD ["npm", "run", "dev"]
