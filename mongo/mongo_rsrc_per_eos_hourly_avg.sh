#!/bin/bash

days=7
file_name=rsrc_per_eos_hourly_avg_results_$days

if  [ $# -eq 1 ]; then
   days=$1
   file_name=rsrc_per_eos_hourly_avg_results_$days
elif [ $# -eq 2 ]; then
   limit_num=$1
   file_name=$2
fi

# get script dir
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )"

echo "aggregating data for previous $days days"
mongo EOS --eval 'db.max_resource_per_eos.aggregate([{$match:{date:{$gte:new Date(new Date().getTime()-1000*60*60*24*'"$days"')}}},{$project:{hour:{$hour:"$date"},cpu_per_eos:"$max_cpu_per_eos",net_per_eos:"$max_net_per_eos",}},{$group:{"_id":{"hour":"$hour"},"avg_cpu_per_eos":{"$avg":"$cpu_per_eos"},"avg_net_per_eos":{"$avg":"$net_per_eos"},"count":{"$sum":1}}},{$sort:{_id:1}},{"$out":"rsrc_per_eos_hourly_avg_results"}])'

echo "aggregation done.  exporting to csv and json."
mongoexport -d EOS -c rsrc_per_eos_hourly_avg_results -f _id.hour,avg_cpu_per_eos,avg_net_per_eos,count --type=csv > $file_name.csv
mongoexport -d EOS -c rsrc_per_eos_hourly_avg_results -f _id.hour,avg_cpu_per_eos,avg_net_per_eos,count --type=json --jsonArray > $file_name.json