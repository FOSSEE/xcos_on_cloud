#!/bin/bash

set -e

cd ${SCILAB_DIR}

libdir=/usr/lib/x86_64-linux-gnu
jnilibdir=/usr/lib/jni

find lib/thirdparty/ usr/lib/ -name \*.so -o -name \*.so.\* | sort | while read f; do
    g=${f##*/}
    test -e $libdir/$g || cp -a $f $libdir/$g
done

mkdir -p $jnilibdir
for lib in gluegen2-rt jogl_desktop jogl_mobile nativewindow_awt nativewindow_x11 newt; do
    g=lib$lib.so
    f=lib/thirdparty/$g
    cp -a -f $f $jnilibdir/$g
done

rm -rf .git* modules thirdparty/docbook
find ! -type d ! -name \*.jar -print0 | xargs -0 rm -f
find -mindepth 1 -type d -empty -print0 | xargs -0 rmdir -p 2> /dev/null || :
