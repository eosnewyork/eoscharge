#!/bin/bash

echo "aggregating data for previous 100000 blocks"
mongo EOS --eval 'db.blocks.aggregate([{"$sort":{"block_num":-1}},{"$limit":100000},{"$unwind":{"path":"$block.transactions","preserveNullAndEmptyArrays":false}},{"$unwind":{"path":"$block.transactions.trx.transaction.actions","preserveNullAndEmptyArrays":false}},{"$project":{"cpu_usage_us":"$block.transactions.cpu_usage_us","net_usage_words":"$block.transactions.net_usage_words","action_acct":"$block.transactions.trx.transaction.actions.account","action_name":"$block.transactions.trx.transaction.actions.name"}},{"$group":{"_id":{"acct":"$action_acct","name":"$action_name"},"avg_cpu_us":{"$avg":"$cpu_usage_us"},"avg_net_words":{"$avg":"$net_usage_words"},"count":{"$sum":1}}},{"$out":"action_agg_results_100000"}])'

echo "aggregation done.  exporting to csv and json."
mongoexport -d EOS -c action_agg_results_100000 -f _id.acct,_id.name,avg_cpu_us,avg_net_words,count --type=csv > action_agg_results_100000.csv
mongoexport -d EOS -c action_agg_results_100000 -f _id.acct,_id.name,avg_cpu_us,avg_net_words,count --type=json > action_agg_results_100000.json
