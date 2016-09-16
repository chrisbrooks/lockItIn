#!/bin/bash -e

DIRNAME=$(dirname $0)

RED='\033[0;31m'
NC='\033[0m' # No Color

. "$DIRNAME/lib"

echo "DNS dev: started"

DevHostAu=(talent.pay.seek.com.au.dev talent.pay.seek.co.nz.dev)
DevIpAu=127.0.0.1

HostFilePath=""
if [[ -n $windir || -n $WINDIR ]]; then
  echo ">> Windows OS detected"
  HostFilePath=/c/Windows/System32/drivers/etc/hosts
else
  echo ">> Linux OS detected"
  HostFilePath=/etc/hosts
fi

for ((i=0; i < ${#DevHostAu[@]}; i++))
do

echo ">> Checking $HostFilePath for '"${DevHostAu[$i]}"' record"
if grep --quiet ${DevHostAu[$i]} $HostFilePath; then
  echo ">> Record already exists"
else
  echo ">> Adding record"
  printf "%s\n$DevIpAu	${DevHostAu[$i]}" >> $HostFilePath
fi

if ! grep --quiet ${DevHostAu[$i]} $HostFilePath; then
  echo -e "$RED >> Failed adding record, please add the following manually to $HostFilePath:"
  echo -e "$DevIp ${DevHostAu[$i]}$NC"
  exit 1
fi

done

echo "DNS dev: finished"
