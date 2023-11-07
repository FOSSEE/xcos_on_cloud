FROM ubuntu:22.04

ENV DEBIAN_FRONTEND=noninteractive
ENV UBUNTU_FRONTEND=noninteractive

ARG HOME=/root

ENV JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64
ENV JAVA_TOOL_OPTIONS=-Dfile.encoding=UTF8

EXPOSE 8001

# Add sources and Install pre-requisites
RUN sed -i 's/^# *\(deb-src \)/\1/' /etc/apt/sources.list
RUN apt-get update -qq
RUN apt-get upgrade -qq
RUN apt-get install -qq apt-utils devscripts equivs
RUN apt-get install -qq git iproute2 \
  libgfortran5 \
  libmysqlclient-dev mysql-client mysql-server openjdk-8-jdk \
  python3-pip python3-venv tzdata
RUN mk-build-deps scilab
RUN apt-get install -qq ./scilab-build-deps_*.deb

# Set timezone info
RUN ln -fs /usr/share/zoneinfo/Asia/Kolkata /etc/localtime
RUN dpkg-reconfigure -f noninteractive tzdata

# Additional packages
RUN apt-get install -qq curl vim wget

# Build scilab
ENV BRANCH=master-6.1
ARG SCILAB_DIR=${HOME}/scilab_for_xcos_on_cloud
WORKDIR ${HOME}
RUN git clone --depth=1 https://github.com/FOSSEE/scilab_for_xcos_on_cloud -b ${BRANCH}
WORKDIR ${SCILAB_DIR}
RUN rm -rf .git
RUN ./configure --without-tk
RUN make -j4 -s || make

# Build XCos
ARG XCOS_DIR=${HOME}/xcos_on_cloud
WORKDIR ${HOME}
RUN mkdir ${XCOS_DIR}
WORKDIR ${XCOS_DIR}
COPY . .
RUN rm -rf .git

# Configure venv
RUN bash ./installenv.sh

# Configure mysql
ARG DB_PASS=scilabscilab
RUN bash ./install.sh

CMD bash ./run.sh
