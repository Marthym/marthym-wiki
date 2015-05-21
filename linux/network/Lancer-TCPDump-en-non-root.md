```` sh
groupadd tcpdump
addgroup <username> tcpdump
chown root.tcpdump /usr/sbin/tcpdump
chmod 0750 /usr/sbin/tcpdump
setcap "CAP_NET_RAW+eip" /usr/sbin/tcpdump
````
