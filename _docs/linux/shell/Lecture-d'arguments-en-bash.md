Pour parser les arguments d'une commande bash voici un exemple de traitement.

```sh
	TEMP=`getopt -o e:m:v:r:s: --long env:,module:,version:repository:,script: \
		 -n 'deploy.sh' -- "$@"`

	if [ $? != 0 ] ; then echo "Terminating..." >&2 ; exit 1 ; fi

	eval set -- "$TEMP"

	while true ; do
	    case "$1" in
		-e|--env)
		    ENVIRONMENT=$2 ; shift 2 ;;
		-m|--module)
		    MODULE=$2 ; shift 2 ;;
		-v|--version)
		    VERSION=$2 ; shift 2 ;;
		-r|--repository)
		    REPOSITORY=$2 ; shift 2 ;;
		-s|--script)
		    SCRIPT=$2 ; shift 2 ;;
		--) shift ; break ;;
		*) echo "Error with[$1:$2]" ; exit 1 ;;
	    esac
	done

	if [ -z "$ENVIRONMENT" ]; then echo "ENVIRONMENT variable is not set";fi
	if [ -z "$MODULE" ]; then echo "MODULE variable is not set";fi
	if [ -z "$VERSION" ]; then echo "VERSION variable is not set";fi

	if [ -z "$REPOSITORY" ]; then REPOSITORY="releases";fi
	if [ -z "$SCRIPT" ]; then SCRIPT="deploy.yml";fi
```

<!-- --- tags:linus, bash -->