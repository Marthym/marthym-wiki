<!-- --- title: Oracle / Lister les locks sur Oracle -->
``` sql
prompt liste des utilisateurs qui lockent des tables 
select distinct username,sql_text from v$sqlarea,v$session,v$lock where 
user#=parsing_user_id
and v$lock.sid=v$session.sid
and username is not null 
and users_executing > 0 ;
``` 

``` sql
prompt liste des executions sql en cours
select distinct username,disk_reads,rows_processed,sql_text from v$sqlarea,v$session where 
user#=parsing_user_id
and username is not null 
and username not in ('SYS','SYSTEM')
and users_executing > 0 ;
``` 

---------------------------------------

Plus un script sql pour lister les locks:
[[include:.doc/lock.sql]]

<!-- --- tags: server, oracle -->