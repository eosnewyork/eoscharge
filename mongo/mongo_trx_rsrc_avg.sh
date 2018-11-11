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
mongo EOS --eval 'db.transaction_traces.aggregate([ {$sort: {_id: -1} }, {$limit: '"$limit_num"' }, {$unwind: {path: "$action_traces",preserveNullAndEmptyArrays: false} }, {$project: {cpu_usage_us: "$receipt.cpu_usage_us",net_usage_words: "$receipt.net_usage_words",action_acct: "$action_traces.act.account",action_name: "$action_traces.act.name"} }, { "$group": {"_id": {"acct": "$action_acct","name": "$action_name"},"avg_cpu_us": {"$avg": "$cpu_usage_us"},"avg_net_words": {"$avg": "$net_usage_words"},"count": {"$sum": 1} } }, { "$out": "trx_rsrc_avg_results"} ])'

echo "aggregation done.  exporting to csv and json."
mongoexport -d EOS -c trx_rsrc_avg_results -f _id.acct,_id.name,avg_cpu_us,avg_net_words,count --type=csv > $file_name.csv
mongoexport -d EOS -c trx_rsrc_avg_results -f _id.acct,_id.name,avg_cpu_us,avg_net_words,count --type=json --jsonArray > $file_name.json
