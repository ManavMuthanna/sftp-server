# Use a base image
FROM ubuntu:latest

# Set environment variables to prevent interactive prompts
ENV DEBIAN_FRONTEND=noninteractive

# Update and install OpenSSH server
RUN apt-get update && apt-get install -y openssh-server

# Create the directory for SSH daemon
RUN mkdir /var/run/sshd

# Create an SFTP user and set password
# To use a custom user: RUN useradd -m CUSTOM_USER && echo "CUSTOM_USER:CUSTOM_PASSWORD" | chpasswd
RUN useradd -m sftpuser && echo "sftpuser:sftppassword" | chpasswd

# Allow password authentication
RUN sed -i 's/#PasswordAuthentication yes/PasswordAuthentication yes/' /etc/ssh/sshd_config

# Configure SSH daemon for SFTP
RUN echo "Subsystem sftp internal-sftp" >> /etc/ssh/sshd_config
# To use a custom user: RUN echo "Match User CUSTOM_USER" >> /etc/ssh/sshd_config
RUN echo "Match User sftpuser" >> /etc/ssh/sshd_config
# To use a custom user: RUN echo "ChrootDirectory /home/CUSTOM_USER" >> /etc/ssh/sshd_config
RUN echo "ChrootDirectory /home/sftpuser" >> /etc/ssh/sshd_config
RUN echo "ForceCommand internal-sftp" >> /etc/ssh/sshd_config
RUN echo "AllowTcpForwarding no" >> /etc/ssh/sshd_config
RUN echo "PermitTunnel no" >> /etc/ssh/sshd_config

# Set permissions for the user's home directory
# To use a custom user: RUN mkdir -p /home/CUSTOM_USER/upload && chown root:root /home/CUSTOM_USER && chmod 755 /home/CUSTOM_USER && chown CUSTOM_USER:CUSTOM_USER /home/CUSTOM_USER/upload
RUN mkdir -p /home/sftpuser/upload && chown root:root /home/sftpuser && chmod 755 /home/sftpuser && chown sftpuser:sftpuser /home/sftpuser/upload

# Expose the SSH port
EXPOSE 22

# Start SSH service
CMD ["/usr/sbin/sshd", "-D"]
