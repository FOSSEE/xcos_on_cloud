FROM ubuntu:22.04

ENV DEBIAN_FRONTEND=noninteractive
ENV UBUNTU_FRONTEND=noninteractive

ARG HOME=/root

ENV JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64
ENV JAVA_TOOL_OPTIONS=-Dfile.encoding=UTF8

EXPOSE 8001

# Add sources and Install pre-requisites
RUN sed -i 's/^# *\(deb-src \)/\1/' /etc/apt/sources.list
RUN apt-get update -y -q
RUN apt-get install -y -q apt-utils
RUN apt-get upgrade -y -q
RUN apt-get install -y -q git libgfortran5 libmysqlclient-dev mysql-client \
    mysql-server openjdk-8-jdk python3-pip python3-venv \
    tzdata
RUN apt-get build-dep -y -q scilab

# Set timezone info
RUN ln -fs /usr/share/zoneinfo/Asia/Kolkata /etc/localtime
RUN dpkg-reconfigure -f noninteractive tzdata

# Additional packages
RUN apt-get install -y -q curl vim wget

# Build scilab
ENV BRANCH=master-2023.1
ARG SCILAB_DIR=${HOME}/scilab_for_xcos_on_cloud
WORKDIR ${HOME}
RUN git clone --depth=1 https://github.com/FOSSEE/scilab_for_xcos_on_cloud -b ${BRANCH}
WORKDIR ${SCILAB_DIR}
RUN ./configure --without-tk
RUN make -j 4 || make

# Build XCos
ARG XCOS_DIR=${HOME}/xcos_on_cloud
WORKDIR ${HOME}
RUN mkdir ${XCOS_DIR}
WORKDIR ${XCOS_DIR}
COPY . .

# Configure mysql
ARG DB_PASS=scilabscilab
RUN bash ./install.sh

CMD bash ./run.sh
