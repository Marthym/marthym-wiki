J'ai eu le cas pour rassembler plusieurs modules dans un même projet et les mettre en tant que sous-modules :

``` sh
git remote add other /path/to/XXX
git fetch other
git checkout -b ZZZ other/master
mkdir ZZZ
git mv stuff ZZZ/stuff             # as necessary
git commit -m "Moved stuff to ZZZ"
git checkout master                
git merge ZZZ                      # should add ZZZ/ to master
git commit
git remote rm other
git branch -d ZZZ                  # to get rid of the extra branch before pushing
git push                           # if you have a remote, that is
``` 

<!-- --- tags: git -->