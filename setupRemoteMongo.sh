mongoimport --uri "mongodb://ac-n7tgxu3-shard-00-00.jay0gvf.mongodb.net:27017,ac-n7tgxu3-shard-00-01.jay0gvf.mongodb.net:27017,ac-n7tgxu3-shard-00-02.jay0gvf.mongodb.net:27017/xflix?replicaSet=atlas-gvntv6-shard-0" --ssl --authenticationDatabase admin --username kshiteeshmani --password test1234 --ssl --drop --collection users --file data/export_xflix_videos.json