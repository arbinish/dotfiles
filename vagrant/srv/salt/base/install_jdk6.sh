#!/bin/bash

BINARY=/vagrant/jdk-6u45-linux-x64.bin
JAVA_HOME=/usr/lib/jvm/java-6-oracle
NAME=jdk1.6.0_45


function die() {
    echo "$*"
    exit 1
}


if [ ! -f ${BINARY} ]; then
    die "Can't find ${BINARY}"
fi



mkdir -p ${JAVA_HOME} || die "failed creating /usr/lib/jvm"

cd /usr/lib/jvm/java-6-oracle
sh ${BINARY}

[ ! -d ${NAME} ] && die "Cannot find ${NAME}"
mv ${NAME}/* .
rm -fr ${NAME}

update-alternatives --install /usr/bin/java java ${JAVA_HOME}/bin/java 100
update-alternatives --install /usr/bin/javac javac ${JAVA_HOME}/bin/javac 100
update-alternatives --set java ${JAVA_HOME}/bin/java
update-alternatives --set javac ${JAVA_HOME}/bin/javac

[ -f /etc/profile.d/sun-java.sh ] && exit 0
cat >> /etc/profile.d/sun-java.sh <<EOF
JAVA_HOME=$JAVA_HOME
PATH=${JAVA_HOME}/bin:\$PATH
export JAVA_HOME PATH

EOF

echo "OK"
exit 0
