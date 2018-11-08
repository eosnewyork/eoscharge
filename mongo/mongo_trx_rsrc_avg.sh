#!/bin/bash

limit_num=100000
file_name=trx_rsrc_avg_results_$limit_num

if  [ $# -eq 1 ]; then
   limit_num=$1
   file_name=trx_rsrc_avg_results_$limit_num
elif [ $# -eq 2 ]; then
   limit_num=$1
   file_name=$2
fi

# get script dir
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )"

echo "aggregating data for previous $limit_num blocks"
json_str=`cat ${DIR}/trx_rsrc_avg.json`
mongo EOS --eval '${json_str}'

echo "aggregation done.  exporting to csv and json."
mongoexport -d EOS -c trx_rsrc_avg_results -f _id.acct,_id.name,avg_cpu_us,avg_net_words,count --type=csv > $file_name.csv
mongoexport -d EOS -c trx_rsrc_avg_results -f _id.acct,_id.name,avg_cpu_us,avg_net_words,count --type=json --jsonArray > $file_name.json
