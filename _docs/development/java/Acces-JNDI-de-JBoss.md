<!-- --- title: Java / Accès JNDI de JBoss -->
Pour accéder au composants EJB déployé sous JBoss, voici un exemple de code. Il récupère le ~CorbasManager mais ça 
marche avec tout les EJB déployé.

``` java
// Get initial context of JNDI tree
Hashtable<String, String> w_param = new Hashtable<String, String>();
w_param.put(javax.naming.Context.INITIAL_CONTEXT_FACTORY,"org.jnp.interfaces.NamingContextFactory");
w_param.put(javax.naming.Context.PROVIDER_URL, "jnp://192.168.168.128:1099/"); 

javax.naming.Context ctx = new javax.naming.InitialContext(w_param);
			
// Get advanced pricing EJB home
Object obj = ctx.lookup("cic.CICCorbaManagerEJBHome");
cic.CICCorbaManagerEJBHome w_corbasHome =
	(cic.CICCorbaManagerEJBHome)javax.rmi.PortableRemoteObject.narrow(obj,cic.CICCorbaManagerEJBHome.class);
			
// Create a new advanced pricing session
cic.CICCorbaManagerEJB w_corbasManager = w_corbasHome.create("CORBAS");
			
System.out.println("Cleanup Status : "+w_corbasManager.getCleanupStatus());			
w_corbasManager.clearCache();
System.out.println("Cleanup Status : "+w_corbasManager.getCleanupStatus());
``` 

Pour lister les EJB de l'annuaire on peut faire comme ça :

``` java
Enumeration<NameClassPair> w_list = ctx.list("");
while (w_list.hasMoreElements()) {
	NameClassPair t_class = w_list.nextElement();
	System.out.println(t_class.getName());
}
``` 

**ATTENTION Penser à faire un remove sur l'EJB à la fin pour ne pas générer un aspirateur de connexion, le Corbas étant limité !**

<!-- --- tags: java, server, jboss -->