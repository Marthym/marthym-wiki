
Il est possible de commander une session SSH via un socket.

```bash
ssh -M -S my-ctrl-socket -fnNT -L 50000:localhost:3306 jm@sampledomain.com
ssh -S my-ctrl-socket -O check jm@sampledomain.com
Master running (pid=3517)  
ssh -S my-ctrl-socket -O exit jm@sampledomain.com
Exit request sent.  
```