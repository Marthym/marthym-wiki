``` perl
#!/usr/bin/perl
use strict;
use warnings;
$|=1;

my %url;

# read config file
open CONF, $ARGV[0] or die "Error opening $ARGV[0]: $!";
while (<CONF>) {
	chomp;
	next if /^\s*#?$/;
	my @l = split("\t");
	$url{qr/$l[0]/} = $l[$#l];
}
close CONF;

# read urls from squid and do the replacement
URL: while (<STDIN>) {
	chomp;
	last if /^(exit|quit|x|q)$/;

	foreach my $re (keys %url) {
		if (my @match = /$re/) {
			$_ = $url{$re};

			for (my $i=1; $i<=scalar(@match); $i++) {
				s/\$$i/$match[$i-1]/g;
			}
			print "OK store-id=$_\n";
			next URL;
		}
	}
	print "ERR\n";
}
```