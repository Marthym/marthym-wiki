<!-- --- title: Java / Transformer une URL java en chemin complet -->
``` java
// w_fileURL est l'URL d'un fichier sur le serveur
String w_realPath = request.getSession().getServletContext().getRealPath("/");
		
String w_filePath = w_fileURL.replaceFirst(getSettings(request).getCodeBase(), "");
w_filePath = w_realPath+w_filePath.replaceAll("[/\\\\]+", "\\" + File.separator);
``` 

Bien-sur ça marche si l'URL est l'URL d'un fichier sur le serveur ou la servlet s'exécute. Dans le cas présent, c'est 
le fichier d'un OMM.

<!-- --- tags: java, jboss -->