FROM ubuntu:22.04

EXPOSE 8001

ENV DEBIAN_FRONTEND=noninteractive
ENV UBUNTU_FRONTEND=noninteractive

ARG HOME=/root

ENV JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64
ENV JAVA_TOOL_OPTIONS=-Dfile.encoding=UTF8

# Add sources and Install pre-requisites
RUN sed -i 's/^# *\(deb-src \)/\1/' /etc/apt/sources.list
RUN apt-get update -qq
RUN apt-get upgrade -qq
RUN apt-get install -qq apt-utils
RUN apt-get install -qq iproute2 libgfortran5 openjdk-8-jre \
  python3-pip python3-venv sqlite3 tzdata
# packages to be removed later
RUN apt-get install -qq devscripts equivs git openjdk-8-jdk
WORKDIR ${HOME}
RUN mk-build-deps scilab
RUN apt-get install -qq ./scilab-build-deps_*.deb

# Set timezone info
RUN ln -fs /usr/share/zoneinfo/Asia/Kolkata /etc/localtime
RUN dpkg-reconfigure -f noninteractive tzdata

# Build scilab
ENV BRANCH=master-2023.1
ARG SCILAB_DIR=${HOME}/scilab_for_xcos_on_cloud
WORKDIR ${HOME}
RUN git clone -q -b ${BRANCH} --depth 1 https://github.com/FOSSEE/scilab_for_xcos_on_cloud
WORKDIR ${SCILAB_DIR}
RUN ./configure --without-tk
RUN make -j4 -s || make
RUN make -s install-strip

# Cleanup
WORKDIR ${HOME}
RUN apt-get autoremove -qq --purge bsdmainutils devscripts equivs openjdk-8-jdk \
  openjdk-11-jre-headless scilab-build-deps
RUN rm -f ./scilab-build-deps_*.deb

# Build XCos
ARG XCOS_DIR=${HOME}/xcos_on_cloud
WORKDIR ${XCOS_DIR}
COPY . .
RUN rm -rf .git*

# Copy missing libs
RUN bash ./installlibs.sh

# Configure venv
RUN bash ./installenv.sh

# Configure sqlite3
RUN bash ./install.sh

# Cleanup
RUN apt-get autoremove -qq --purge git manpages-dev make python3-dev
RUN find /usr/local -depth -type d -name tests -print0 | xargs -0 rm -rf
RUN find /var/lib/apt/lists /var/lib/dpkg/info -type f -print0 | xargs -0 rm -f
RUN rm -rf ${HOME}/.cache

CMD bash ./run.sh
