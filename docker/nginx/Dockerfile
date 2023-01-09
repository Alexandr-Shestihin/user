FROM nginx:1.15.10

ARG USER_ID
ARG GROUP_ID


# Install git
RUN apt update && apt install -y git
RUN git --version

# Install nodejs and npm
RUN rm -rf /var/lib/apt/lists/*
RUN apt update && apt-get install -my wget curl gnupg apt-utils build-essential htop
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash -
RUN apt install -y --no-install-recommends nodejs npm

RUN sed -i -e 's/\/var\/run\/nginx\.pid/\/tmp\/nginx\.pid/' /etc/nginx/nginx.conf
RUN chown -R nginx:www-data /var/cache
RUN chmod -R o+w /var/cache && chmod -R g+w /var/cache

RUN usermod -u ${USER_ID} www-data && groupmod -g ${GROUP_ID} www-data
RUN usermod -G nginx www-data
RUN echo "${USER_ID}:${GROUP_ID}"
USER "${USER_ID}:${GROUP_ID}"


# Confirm installation
RUN node -v
RUN npm -v
