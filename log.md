docker run -d -p 8089-8110:8089-8110 -v /root/abtnode:/data/abtnode -v /abt-test:/abt-test --env ABT_NODE_DOMAIN=$s1 arcblock/abtnode
docker  exec -it -u 0 6f58bc2 bash