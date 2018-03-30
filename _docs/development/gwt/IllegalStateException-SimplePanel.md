<!-- --- title: GWT / IllegalStateException: SimplePanel -->
Encore un truc qui m'a pris la tête !
Après l'écriture d'une page uiBinder, je me retrouve avec cette error :

~~~
IllegalStateException: SimplePanel can only contain one child widget
~~~

Alors que nulle part dans mon code je n'utilise de SimplePanel ! Après recherche, il s'avère que le FormPanel et le 
DecoratorPanel dérivent tout deux du SimplePanel qui n'accepte pas plus d'un seul Widget à l'intérieur. Tout s'illumine, 
j'ai un FormPanel avec plusieurs widget dedans.

Dommage que j'ai pas eu l'erreur à la compil ??

<!-- --- tags: gwt -->