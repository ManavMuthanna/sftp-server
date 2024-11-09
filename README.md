***myDrive – A SFTP Server and Client Setup***

**Problem Statement:**

Secure and efficient file management is crucial for maintaining data integrity and accessibility. The need arises for a solution that enables users to securely upload, download, and manage files remotely while ensuring ease of access and data security. Traditional file transfer methods may lack user-friendly interfaces or fail to integrate seamlessly with modern APIs, creating challenges for users who need to perform file operations without complex setups. This project also aims to showcase how easy it is to setup a personal drive on the cloud without only relying on big vendors such as Dropbox, iCloud etc.

**Backend (Server):** <https://sftp-backend.duckdns.org/api/sftp>

An Express-based API integrated with an SFTP server to handle file operations. The backend will provide secure endpoints for file upload, download, deletion, and retrieval, making it possible to manage files efficiently. The SFTP integration ensures that file transfers are secure and meet organizational compliance requirements for data protection.

1. **Oracle Cloud VM:** 
- The backend is hosted on an AMD-based Oracle Cloud VM with 1/8 OCPU and 1 GB memory.
- Configure SSH access to the VM and install Docker and Docker Compose.
1. **Dockerize Backend Services:**
- Create Docker images for both the SFTP server and the Express API
- Define a docker-compose.yml file to manage the SFTP and API containers together, ensuring they can communicate seamlessly.

```yaml
version: '3'

services:
  # SFTP server service
  sftp-server:
    image: manavmuthanna/sftp-server
    container_name: sftp-server
    ports:
      - "2222:22"  # Exposes port 22 of the container as port 2222 on the host machine

  # Backend service that connects to the SFTP server
  sftp-backend:
    image: manavmuthanna/sftp-backend
    container_name: sftp-backend
    ports:
      - "5000:5000"  # Exposes port 5000 of the container as port 5000 on the host machine
    environment:
      - SFTP_HOST=sftp-server  # This resolves automatically to the sftp-server container
      - SFTP_PORT=22  # Ensures the backend connects to port 22 on the sftp-server container
    depends_on:
      - sftp-server  # Ensures the sftp-server starts before the backend service
```
1. **Set Up NGINX Reverse Proxy for HTTPS:**
- Install NGINX on the Oracle Cloud VM to act as a reverse proxy for the Express API.
- Obtain SSL/TLS certificates using Let’s Encrypt for HTTPS, ensuring secure API communication.
- Configure NGINX to route requests from HTTPS to the Docker container running the API.
1. **Launch the Backend**:
- Use *docker-compose up -d* to start the SFTP and API containers.
- Ensure NGINX is correctly routing traffic to the API container and test the HTTPS connection.

**Frontend (Client):** <https://mydrive-client.vercel.app/>

A user-friendly interface that connects to the backend API, allowing users to interact with the application seamlessly. Through the client, users can perform file operations intuitively without needing to interact directly with the SFTP server. This interface simplifies the process for non-technical users, providing a clear, accessible platform for managing files.

1. **Deploy Frontend on Vercel:**
- Push your frontend code to a GitHub repository.
- Link the repository to Vercel and configure it for automatic deployments.
- Vercel will automatically detect your framework and set up serverless functions if needed, ensuring that your frontend is distributed globally.
2. **Configure Environment Variables:**
- Set up necessary environment variables (such as API endpoint) in Vercel for seamless connectivity to the backend



**Advantages of Using This Deployment Method**

1. **Scalability:**
   1. **Backend on Docker Containers:** By containerizing the backend services, it’s easy to scale horizontally by adding more containers if the demand grows. Docker Compose simplifies the management of multiple containers, ensuring that all necessary services are available.
   1. **Frontend on Vercel:** Vercel’s serverless infrastructure automatically scales to meet user demand, allowing the frontend to handle high traffic seamlessly.
1. **Security:**
   1. **Oracle Cloud VM with NGINX and HTTPS:** By using NGINX as a reverse proxy with HTTPS, the API connection is secured, which is essential for protecting sensitive file transfers.
   1. **Isolated Docker Containers:** The SFTP and Express API are isolated in their containers, reducing the risk of cross-service vulnerabilities and increasing the overall security of the backend.
1. **Portability and Flexibility:**
   1. **Dockerized Backend:** The use of Docker ensures that the backend can be redeployed on other cloud platforms with minimal configuration changes, making the project highly portable.
   1. **Vercel for Frontend Deployment:** Deploying the frontend on Vercel allows for rapid updates and ease of management, with a CI/CD pipeline that automatically redeploys on code changes.
1. **Cost-Effectiveness:**
   1. **Oracle Cloud Free Tier:** Oracle’s always-free tier offers free VM instances, which is beneficial for reducing costs, especially in development and testing phases.
   1. **Vercel’s Free Plan for Serverless:** Vercel’s serverless deployment is cost-effective, especially for applications with fluctuating traffic, as you only pay for the resources consumed rather than maintaining a dedicated server.
1. **Enhanced Performance:**
   1. **NGINX for Load Balancing:** NGINX helps with load balancing and routing, which optimizes the performance of the backend API.
   1. **Global CDN with Vercel:** The frontend benefits from Vercel’s global CDN, which reduces latency for users around the world by serving the content from locations closest to them.

This deployment setup thus provides a robust, secure, and scalable solution for developing and managing cloud-based applications effectively.
