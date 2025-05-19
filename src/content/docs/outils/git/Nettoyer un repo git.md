---
title: "Nettoyer un repo GIT"
category: Outils
subcategory: Git
tags: [outils, git, cleanup]
---

Quand on a commité un fichier un peu trop volumineux dans un repo git il est compliqué de s'en débarraser. Et même si on ne l’a plus dans le HEAD on se traine l’intégralité du fichier à chaque clone.

Voilà comment nettoyer ce genre de problème.

<!-- more -->

Déjà on analyse le repos, les gros fichiers se planquent là :

```shell
ll .git/objects/pack
total 16M
-r--r--r-- 1 user user 80K mai   29 11:51 pack-6734f13d63bf482fff9f2f071ecef145d0a4b5db.idx
-r--r--r-- 1 user user 16M mai   29 11:51 pack-6734f13d63bf482fff9f2f071ecef145d0a4b5db.pack
```

On peut ensuite lister les objets qui font mal

```shell
git verify-pack -v objects/pack/pack-6734f13d63bf482fff9f2f071ecef145d0a4b5db.idx \
| sort -k 3 -n \
| tail -10

94e3d0e539cf819c6c78d1861c78c3dd4be441d2 blob   366464 309223 6076139
e589c73e97e6a2cba23da15b27a1487123485c91 blob   370183 362492 6552271
29df593faa93abf24c54ad50daa826e88253540f blob   398588 396216 5233507
855c845e538b65548118279537a04eab2ec6ef0d blob   444379 136051 11254183
787c97549d4c71657c7f87d9d4345e9dda41590a blob   476557 182286 13655774
5c3d9b4d5e67d4d26dfbdd55c8346f57601c4691 blob   627810 200257 12076111
0d68beec0493db9b3215cc22d47e7a7d0b3d8b52 blob   1008524 808510 396107281
f4d33aad8f239b7c3b88537633099f420f8806dd blob   1348219 1307337 7453994
a7b68847a22299bb02c10f89ce851f9a794d6fb9 blob   2012371 1857109 2104901
a1076b976a14f0c1d130d319510332302075e6b5 blob   381569898 381025991 14035875
```

Ensuite on cherche le nom de ces objets, le fichier auquel ils correspondent en some:

```shell
git rev-list --objects --all | grep a1076b976a14f0c1d13
```

Pour finir, on les supprime du repo :

```shell
git filter-branch --index-filter 'git rm --cached --ignore-unmatch *gros_fichier.tgz' -- --all
```

Pour finir on consolide le ménage: 

```shell
rm -Rf .git/refs/original
rm -Rf .git/logs/
git gc --aggressive --prune=now
```

## Liens

* <https://github.com/18F/C2/issues/439>