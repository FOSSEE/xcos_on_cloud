FROM ubuntu:18.04 AS build-scilab

ENV DEBIAN_FRONTEND=noninteractive
ENV UBUNTU_FRONTEND=noninteractive

ARG HOME=/root

ENV JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64
ENV JAVA_TOOL_OPTIONS=-Dfile.encoding=UTF8

# Add sources and Install pre-requisites
RUN sed -i 's/^# *\(deb-src .*\.ubuntu\.com\)/\1/' /etc/apt/sources.list
RUN apt-get update -qq
RUN apt-get upgrade -qq
RUN apt-get install -qq apt-utils
RUN apt-get install -qq build-essential iproute2 libgfortran3 libgfortran4 \
  openjdk-8-jre python3 sqlite3 tzdata

# Set timezone info
RUN ln -fs /usr/share/zoneinfo/Asia/Kolkata /etc/localtime
RUN dpkg-reconfigure -f noninteractive tzdata

# packages to be removed later
RUN apt-get install -qq devscripts equivs git openjdk-8-jdk
WORKDIR ${HOME}
RUN mk-build-deps scilab
RUN apt-get install -qq ./scilab-build-deps_*.deb

# Build scilab
ARG BRANCH=master-5.5
ARG SCILAB_DIR=${HOME}/scilab_for_xcos_on_cloud
WORKDIR ${HOME}
RUN git clone -q -b ${BRANCH} --depth 1 https://github.com/FOSSEE/scilab_for_xcos_on_cloud
WORKDIR ${SCILAB_DIR}
RUN ./configure --disable-static-system-lib --without-tk
RUN make -j4 -s || make
RUN make -s install-strip

# Cleanup
WORKDIR ${HOME}
RUN apt-get autoremove -qq --purge bsdmainutils devscripts equivs git \
  openjdk-8-jdk openjdk-11-jre-headless scilab-build-deps
RUN rm -f ./scilab-build-deps_*.deb

# Copy missing libs
WORKDIR ${SCILAB_DIR}

ARG LIBDIR=/usr/lib/x86_64-linux-gnu
RUN find lib/thirdparty/ usr/lib/ -name \*.so -o -name \*.so.\* | \
  sort | \
  while read f; do \
    g=${f##*/}; \
    test -e ${LIBDIR}/$g || cp -a $f ${LIBDIR}/$g; \
  done

ARG JNILIBDIR=/usr/lib/jni
RUN mkdir -p ${JNILIBDIR}
RUN for lib in gluegen2-rt jogl_desktop jogl_mobile nativewindow_awt nativewindow_x11 newt; do \
    g=lib$lib.so; \
    f=lib/thirdparty/$g; \
    cp -a -f $f ${JNILIBDIR}/$g; \
  done

RUN rm -rf .git* modules thirdparty/docbook
RUN find ! -type d ! -name \*.jar -print0 | xargs -0 rm -f
RUN find -mindepth 1 -type d -empty -print0 | xargs -0 rmdir -p 2> /dev/null || :

# Cleanup
RUN find /usr/local -depth -type d -name tests -print0 | xargs -0 rm -rf

# Comparison
#RUN dpkg-query -Wf '${Installed-Size}\t${Package}\t${Version}\n' > /tmp/dpkg-scilab
#RUN find / -mount \( -path /tmp -o -path /var/lib/ucf \) -prune -o ! -type d -print | sort > /tmp/filelist-scilab

FROM ubuntu:18.04 AS build-xcos

ENV DEBIAN_FRONTEND=noninteractive
ENV UBUNTU_FRONTEND=noninteractive

ARG HOME=/root

ENV JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64
ENV JAVA_TOOL_OPTIONS=-Dfile.encoding=UTF8

# Add sources and Install pre-requisites
RUN sed -i 's/^# *\(deb-src .*\.ubuntu\.com\)/\1/' /etc/apt/sources.list
RUN apt-get update -qq
RUN apt-get upgrade -qq
RUN apt-get install -qq apt-utils
RUN apt-get install -qq build-essential iproute2 libgfortran3 libgfortran4 \
  openjdk-8-jre python3 sqlite3 tzdata

# Set timezone info
RUN ln -fs /usr/share/zoneinfo/Asia/Kolkata /etc/localtime
RUN dpkg-reconfigure -f noninteractive tzdata

# packages to be removed later
RUN apt-get install -qq python3-pip python3-venv

# Build XCos
ARG BRANCH=master-5.5
ARG XCOS_DIR=${HOME}/xcos_on_cloud
WORKDIR ${XCOS_DIR}
COPY . .
RUN rm -rf .git*

# Configure venv
RUN bash ./installenv.sh

# Configure sqlite3
RUN bash ./install.sh

# Cleanup
RUN apt-get autoremove -qq --purge python3-pip python3-venv
RUN rm -rf ${HOME}/.cache

# Comparison
#RUN dpkg-query -Wf '${Installed-Size}\t${Package}\t${Version}\n' > /tmp/dpkg-xcos
#RUN find / -mount \( -path /tmp -o -path /var/lib/ucf \) -prune -o ! -type d -print | sort > /tmp/filelist-xcos

FROM ubuntu:18.04 AS main

EXPOSE 8001

ENV DEBIAN_FRONTEND=noninteractive
ENV UBUNTU_FRONTEND=noninteractive

ARG HOME=/root

ENV JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64
ENV JAVA_TOOL_OPTIONS=-Dfile.encoding=UTF8

# Add sources and Install pre-requisites
RUN sed -i 's/^# *\(deb-src .*\.ubuntu\.com\)/\1/' /etc/apt/sources.list
RUN apt-get update -qq
RUN apt-get upgrade -qq
RUN apt-get install -qq apt-utils
RUN apt-get install -qq build-essential iproute2 libgfortran3 libgfortran4 \
  openjdk-8-jre python3 sqlite3 tzdata

# Set timezone info
RUN ln -fs /usr/share/zoneinfo/Asia/Kolkata /etc/localtime
RUN dpkg-reconfigure -f noninteractive tzdata

# Install scilab
ARG SCILAB_DIR=${HOME}/scilab_for_xcos_on_cloud
COPY --from=build-scilab /usr/local /usr/local
COPY --from=build-scilab /usr/lib/jni /usr/lib/jni
COPY --from=build-scilab /usr/lib/x86_64-linux-gnu /usr/lib/x86_64-linux-gnu
COPY --from=build-scilab ${SCILAB_DIR} ${SCILAB_DIR}

# Install XCos
ARG XCOS_DIR=${HOME}/xcos_on_cloud
COPY --from=build-xcos ${XCOS_DIR} ${XCOS_DIR}

# Comparison
#COPY --from=build-scilab /tmp/dpkg-scilab /tmp/dpkg-scilab
#COPY --from=build-xcos /tmp/dpkg-xcos /tmp/dpkg-xcos
#RUN dpkg-query -Wf '${Installed-Size}\t${Package}\t${Version}\n' > /tmp/dpkg-main
#COPY --from=build-scilab /tmp/filelist-scilab /tmp/filelist-scilab
#COPY --from=build-xcos /tmp/filelist-xcos /tmp/filelist-xcos
#RUN find / -mount \( -path /tmp -o -path /var/lib/ucf \) -prune -o ! -type d -print | sort > /tmp/filelist-main

WORKDIR ${XCOS_DIR}

CMD bash ./run.sh
