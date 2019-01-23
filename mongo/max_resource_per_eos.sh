#!/bin/bash

url=https://api.eosnewyork.io
if [ "$1" -ne "" ]; then
    url=$1
fi

account_name='eosnewyorkio'
content=$(cleos -u https://api.eosnewyork.io get account ${account_name} --json)
cpu_max=$(jq -r '.cpu_limit.max' <<< "${content}")
net_max=$(jq -r '.net_limit.max' <<< "${content}")
net_weight=$(jq -r '.net_weight' <<< "${content}")
cpu_weight=$(jq -r '.cpu_weight' <<< "${content}")

cpu_weight_eos=`echo - | awk '{print '"$cpu_weight"' / 10000}'`
net_weight_eos=`echo - | awk '{print '"$net_weight"' / 10000}'`

max_cpu_per_eos=`echo - | awk '{print '"$cpu_max"' / '"$cpu_weight_eos"'}'`
max_net_per_eos=`echo - | awk '{print '"$net_max"' / '"$net_weight_eos"'}'`

mongo EOS --eval 'db.max_resource_per_eos.insert({"date": ISODate(), "max_cpu_per_eos": '"$max_cpu_per_eos"', "max_net_per_eos": '"$max_net_per_eos"'})'