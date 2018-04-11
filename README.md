# dockerize-travel-sharing
To build the images
```
docker-compose build
```
To run:
```
docker-compose up
```

Docker commands: 
```
// Pull an image from Docker Hub
docker pull {image_name}

// Lis all current images
docker images

// Erase an image
docker rmi {image_id/name}

// List all running container
docker ps
docker ps -a #Liệt kê các container đã tắt

// Delete an container
docker rm -f {container_id/name}

// Change an container
docker rename {old_container_name} {new_container_name}

// Run a container 
docker start {new_container_name}
docker exec -it {new_container_name} /bin/bash

// Create a container, with specific port and volumes
docker run --name {container_name} -p {host_port}:{container_port} -v {/host_path}:{/container_path} -it {image_name} /bin/bash

// Watch changes in container
docker diff {container_name}

// Commit changes in container và image
docker commit -m "message" {container_name} {image_name}

// Save image as file .tar
docker save {image_name} > {/host_path/new_image.tar}

// Create new image from file .tar
cat musashi.tar | docker import - {new_image_name}:latest

// History of commit in image
docker history {image_name}

// Recovery images from IMAGE_ID
docker tag {iamge_id} {image_new_name}:{tag}

// Build an image from container
docker build -t {container_name} .
// `.` is define where Dockerfile is.
```
