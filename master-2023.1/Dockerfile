FROM ubuntu:22.04 AS base

ENV DEBIAN_FRONTEND=noninteractive
ENV UBUNTU_FRONTEND=noninteractive

ENV HOME=/root

ENV JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64
ENV JAVA_TOOL_OPTIONS=-Dfile.encoding=UTF8

# Add sources and Install pre-requisites
RUN sed -i 's/^# *\(deb-src .*\.ubuntu\.com\)/\1/' /etc/apt/sources.list
RUN apt-get update -qq && \
  apt-get upgrade -qq && \
  apt-get install -qq apt-utils && \
  apt-get install -qq build-essential iproute2 libfreehep-util-java libgfortran5 openjdk-8-jre python3 sqlite3 tzdata

# Set timezone info
RUN ln -fs /usr/share/zoneinfo/Asia/Kolkata /etc/localtime
RUN dpkg-reconfigure -f noninteractive tzdata


FROM base AS build-scilab

# packages to be removed later
RUN apt-get update -qq && \
  apt-get install -qq devscripts equivs git openjdk-8-jdk && \
  mk-build-deps scilab && \
  apt-get install -qq ./scilab-build-deps_*.deb && \
  rm -f ./scilab-build-deps_*.deb

# Build scilab
ARG BRANCH=master-2023.1
ARG SCILAB_DIR=${HOME}/scilab_for_xcos_on_cloud
WORKDIR ${HOME}
RUN git clone -q -b ${BRANCH} --depth 1 https://github.com/FOSSEE/scilab_for_xcos_on_cloud
WORKDIR ${SCILAB_DIR}
RUN ./configure --without-tk
RUN make -j4 -s || make
RUN make -s install-strip

# Cleanup
RUN apt-get autoremove -qq --purge bsdmainutils devscripts equivs git openjdk-8-jdk openjdk-11-jre-headless scilab-build-deps

# Copy missing libs
WORKDIR ${SCILAB_DIR}

ARG LIBDIR=/usr/lib/x86_64-linux-gnu
RUN find lib/thirdparty/ usr/lib/ -name \*.so -o -name \*.so.\* | \
  sort | \
  while read f; do \
    g=${f##*/}; \
    test -e ${LIBDIR}/$g || cp -a $f ${LIBDIR}/$g; \
  done

ARG SCILABLIBDIR=/usr/local/lib/scilab
ARG MODULELIBDIR=/usr/local/share/scilab
RUN find modules -name .libs | \
  sort | \
  while read f; do \
    g=${f%/.libs}; \
    test ! -e ${MODULELIBDIR}/$g || ln -snf ${SCILABLIBDIR} ${MODULELIBDIR}/$g/.libs; \
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


FROM base AS build-xcos

# packages to be removed later
RUN apt-get update -qq && \
  apt-get install -qq python3-pip python3-venv

# Build XCos
ARG BRANCH=master-2023.1
ARG XCOS_DIR=${HOME}/xcos_on_cloud
WORKDIR ${XCOS_DIR}
COPY . .

# Configure venv and sqlite3
RUN bash ./install.sh

# Cleanup
RUN apt-get autoremove -qq --purge python3-pip python3-venv
RUN rm -rf ${HOME}/.cache

# Comparison
#RUN dpkg-query -Wf '${Installed-Size}\t${Package}\t${Version}\n' > /tmp/dpkg-xcos
#RUN find / -mount \( -path /tmp -o -path /var/lib/ucf \) -prune -o ! -type d -print | sort > /tmp/filelist-xcos


FROM base AS main

EXPOSE 8001

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
