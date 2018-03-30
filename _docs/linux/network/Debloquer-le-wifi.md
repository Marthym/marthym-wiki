Après une dés-activation du wifi dans network manager de ~GnomeShell, il est impossible de le ré-activer. Pour pouvoir le ré-activer voilà la manœuvre :

``` sh
$ sudo rfkill list
0: sony-wifi: Wireless LAN
	Soft blocked: yes
	Hard blocked: no
1: sony-bluetooth: Bluetooth
	Soft blocked: no
	Hard blocked: no
3: phy0: Wireless LAN
	Soft blocked: yes
	Hard blocked: yes
5: hci0: Bluetooth
	Soft blocked: no
	Hard blocked: no
```

``` sh
sudo rfkill unblock 0
```

Il est maintenant possible de ré-activer le wifi dans l'interface.