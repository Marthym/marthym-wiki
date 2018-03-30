<!-- --- title: Java / Tester des membres private -->
Un des truc compliqué quand on fait des test unitaire c'est de tester les membres private. Un solution pour faire ça :

``` java
/**
	 * Gets the field value from an instance.  The field we wish to retrieve is
	 * specified by passing the name.  The value will be returned, even if the
	 * field would have private or protected access.
	 */
	private Object getField( Object instance, String name ) throws Exception
	{
		Class c = instance.getClass();

		// Retrieve the field with the specified name
		Field f = c.getDeclaredField( name );

		// *MAGIC* make sure the field is accessible, even if it
		// would be private or protected
		f.setAccessible( true );

		// Return the value of the field for the instance
		return f.get( instance );
	}
``` 

Ensuite on mets dans le test :

``` java
public void testLengthAndCalled() throws Exception
	{
		Demo demo		= new Demo();

		// Retrieve the wasCalled field
		Boolean wasCalled	= (Boolean) getField( demo, "wasCalled" );

		// Should be false before calling
		assertFalse( wasCalled.booleanValue() );

		// Call the private stringLength method
		Integer strlen		= (Integer) executeMethod( demo, "stringLength", new Object[] { "four" } );

		// The value returned should be '4' (length of the string 'four')
		assertEquals( 4, strlen.intValue() );

		// Even though Boolean is a non-primitive and uses a reference,
		// it was a one-time object created with the actual primitive boolean
		// value of demo, so we must fetch it again
		wasCalled		= (Boolean) getField( demo, "wasCalled" );

		// THe method has now been called
		assertTrue( wasCalled.booleanValue() );
	}
``` 
<!-- --- tags: java -->