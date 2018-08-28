#!/bin/bash

limit_num=100000
file_name=trx_rsrc_avg_results_$limit_num

if  [ $# -eq 1 ]; then
   limit_num=$1
elif [ $# -eq 2 ]; then
   limit_num=$1
   file_name=$2
fi

# get script dir
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )"

echo "aggregating data for previous $limit_num blocks"
mongo EOS --eval 'db.blocks.aggregate([{"$sort":{"block_num":-1}},{"$limit":'"$limit_num"'},{"$unwind":{"path":"$block.transactions","preserveNullAndEmptyArrays":false}},{"$unwind":{"path":"$block.transactions.trx.transaction.actions","preserveNullAndEmptyArrays":false}},{"$project":{"cpu_usage_us":"$block.transactions.cpu_usage_us","net_usage_words":"$block.transactions.net_usage_words","action_acct":"$block.transactions.trx.transaction.actions.account","action_name":"$block.transactions.trx.transaction.actions.name"}},{"$group":{"_id":{"acct":"$action_acct","name":"$action_name"},"avg_cpu_us":{"$avg":"$cpu_usage_us"},"avg_net_words":{"$avg":"$net_usage_words"},"count":{"$sum":1}}},{"$out":"trx_rsrc_avg_results_100000"}])'

echo "aggregation done.  exporting to csv and json."
mongoexport -d EOS -c trx_rsrc_avg_results_$limit_num -f _id.acct,_id.name,avg_cpu_us,avg_net_words,count --type=csv > $file_name.csv
mongoexport -d EOS -c trx_rsrc_avg_results_$limit_num -f _id.acct,_id.name,avg_cpu_us,avg_net_words,count --type=json > $file_name.json
