``` sh
#!/usr/bin/env bash
### BEGIN INIT INFO
# Provides:          cameleon
# Required-Start:    $remote_fs $syslog
# Required-Stop:     $remote_fs $syslog
# Default-Start:     2 3 4 5
# Default-Stop:      0 1 6
# Short-Description: Run Cameleon JBoss Server
# Description:       Run Cameleon JBoss Server
### END INIT INFO

# Author: Fred Combes <fcombes@cameleon-software.com>
#

# Do NOT "set -e"

# PATH should only include /usr/* if it runs after the mountnfs.sh script
PATH=/sbin:/usr/sbin:/bin:/usr/bin
DESC="Cameleon Edge"
NAME=cameleon
START_TIMEOUT=120 # Maximum waiting time for JBoss starting (in second)

CAMELEON_DIR=/opt/cameleon-edge
TARGET_ID=cameleon
TARGET_DIR=$CAMELEON_DIR/jboss-4.2.0.GA/server/$TARGET_ID

# Read configuration variable file if it is present
[ -r /etc/default/$NAME ] && . /etc/default/$NAME

# Load the VERBOSE setting and other rcS variables
#. /lib/init/vars.sh

# Define LSB log_* functions.
# Depend on lsb-base (>= 3.2-14) to ensure that this file is present
# and status_of_proc is working.
. /lib/lsb/init-functions

#
# Function that starts the daemon/service
#
do_start()
{
	# Return
	#   0 if daemon has been started
	#   1 if daemon was already running
	#   2 if daemon could not be started

	CLOUD_PID=`ps ax | grep $TARGET_ID | grep java | cut -c1-5`
	if [ "$CLOUD_PID" == "" ]
	then

		# Test for current user
		if [ $(whoami) == "administrateur" ]
		then
			# We are cameleon, interactive call :
			# - No need for su cameleon
			# - Need for nohup
			#[ "$VERBOSE" != no ] && log_daemon_msg "Starting JBoss [$TARGET_DIR]..."

			# Changedir to cloud env bin directory : IMPORTANT this will be the "current directory" for the
			# application... Place where llr and dfa files will be created for example ...
			nohup $CAMELEON_DIR/bin/startCameleon.sh > /dev/null 2>&1 &
		else
			# init.d (service) mode.
			# - Need for su cameleon
			# - No need for nohup
			su administrateur -lc "$CAMELEON_DIR/bin/startCameleon.sh > /dev/null 2>&1 &"

 			# Wait for log completion
			DONE="false"

			for a in `seq 1 $START_TIMEOUT`; do
				CAMELEON_RUNNING=`tail --lines=5 $TARGET_DIR/log/server.log | grep JBoss | grep Started`

				if [ "$CAMELEON_RUNNING" == "" ]
				then
					sleep 1
				else
					DONE="true"
					break
				fi
			done
		fi

		return 0

	else
		#[ "$VERBOSE" != no ] && log_daemon_msg "Cloud env [$TARGET_ID] already running with PID [$CLOUD_PID]..."
		return 1
	fi
}

#
# Function that stops the daemon/service
#
do_stop()
{
	# Return
	#   0 if daemon has been stopped
	#   1 if daemon was already stopped
	#   2 if daemon could not be stopped
	#   other if a failure occurred

	CLOUD_PID=`ps ax | grep $TARGET_ID | grep java | cut -c1-5`

	# Tests if given cloud env is running already

	if [ "$CLOUD_PID" != "" ]
	then

		# Given cloud env not running
		# Test for current user

		if [ $(whoami) == "administrateur" ]
		then

			# Script launched by cameleon user, interactive call :
			# - No need for su cameleon

			#[ "$VERBOSE" != no ] && log_daemon_msg "Stopping JBoss [$TARGET_DIR]..."
			$CAMELEON_DIR/bin/stopCameleon.sh

 			# Wait for log completion
			DONE="false"

			for a in `seq 1 20`; do
				CLOUD_PID_RUNNING=`ps ax | grep $TARGET_ID | grep java | cut -c1-5`

				if [ "$CLOUD_PID_RUNNING" == "" ]
				then
					DONE="true"
					break
				else
					#[ "$VERBOSE" != no ] && log_daemon_msg "."
					sleep 1
				fi
			done

			sleep 1

			if [ "$DONE" == "true" ]
			then
				#[ "$VERBOSE" != no ] && log_daemon_msg "Cloud env [$TARGET_ID] stopped."
				return 0
			else
				#[ "$VERBOSE" != no ] && log_daemon_msg "Could not stop Cloud env [$TARGET_ID]. You should try to kill it !"
				return 2
			fi
		else
			# init.d (service) mode.
			# - Need for su cameleon

			su administrateur -lc "$CAMELEON_DIR/bin/stopCameleon.sh > /dev/null 2>&1"

 			# Wait for log completion
			DONE="false"

			for a in `seq 1 20`; do
				CLOUD_PID_RUNNING=`ps ax | grep $TARGET_ID | grep java | cut -c1-5`

				if [ "$CLOUD_PID_RUNNING" == "" ]
				then
					DONE="true"
					break
				else
					#[ "$VERBOSE" != no ] && log_daemon_msg "."
					sleep 1
				fi
			done

			sleep 1

			if [ "$DONE" == "true" ]
			then
				#[ "$VERBOSE" != no ] && log_daemon_msg "Cloud env [$TARGET_ID] stopped."
				return 0
			else
				#[ "$VERBOSE" != no ] && log_daemon_msg "Could not stop Cloud env [$TARGET_ID]. You should try to kill it !"
				return 2
			fi
		fi
	else
		#[ "$VERBOSE" != no ] && log_daemon_msg "Cloud env [$TARGET_ID] is not running..."
		return 1
	fi
}

#
# Function that sends a SIGHUP to the daemon/service
#
do_reload() {
	#
	# If the daemon can reload its configuration without
	# restarting (for example, when it is sent a SIGHUP),
	# then implement that here.
	#
	start-stop-daemon --stop --signal 1 --quiet --pidfile $PIDFILE --name $NAME
	return 0
}

do_status() {
   CLOUD_PID=`ps ax | grep $TARGET_ID | grep java | cut -c1-5`

   if [ "$CLOUD_PID" == "" ]
   then
      [ "$VERBOSE" != no ] && log_daemon_msg "Cloud env [$TARGET_ID] is not running"
      return 0

   else
      [ "$VERBOSE" != no ] && log_daemon_msg "Cloud env [$TARGET_ID] running with PID [$CLOUD_PID]"
      tail -f $TARGET_DIR/log/server.log
      return 0

   fi
}

case "$1" in
  start)
	[ "$VERBOSE" != no ] && log_daemon_msg "Starting $DESC" "$NAME"
	do_start
	case "$?" in
		0|1) [ "$VERBOSE" != no ] && log_end_msg 0 ;;
		2) [ "$VERBOSE" != no ] && log_end_msg 1 ;;
	esac
	;;
  stop)
	[ "$VERBOSE" != no ] && log_daemon_msg "Stopping $DESC" "$NAME"
	do_stop
	case "$?" in
		0|1) [ "$VERBOSE" != no ] && log_end_msg 0 ;;
		2) [ "$VERBOSE" != no ] && log_end_msg 1 ;;
	esac
	;;
  status)
	do_status && exit 0 || exit $?
	;;
  #reload|force-reload)
	#
	# If do_reload() is not implemented then leave this commented out
	# and leave 'force-reload' as an alias for 'restart'.
	#
	#log_daemon_msg "Reloading $DESC" "$NAME"
	#do_reload
	#log_end_msg $?
	#;;
  restart|force-reload)
	#
	# If the "reload" option is implemented then remove the
	# 'force-reload' alias
	#
	log_daemon_msg "Stoping $DESC" "$NAME"
	do_stop
	case "$?" in
	  0|1)
		log_end_msg 0
		log_daemon_msg "Starting $DESC" "$NAME"
		do_start
		case "$?" in
			0) log_end_msg 0 ;;
			1) log_end_msg 1 ;; # Old process is still running
			*) log_end_msg 1 ;; # Failed to start
		esac
		;;
	  *)
		# Failed to stop
		log_end_msg 1
		;;
	esac
	;;
  *)
	#echo "Usage: $SCRIPTNAME {start|stop|restart|reload|force-reload}" >&2
	echo "Usage: $SCRIPTNAME {start|stop|status|restart}" >&2
	exit 3
	;;
esac

:
```