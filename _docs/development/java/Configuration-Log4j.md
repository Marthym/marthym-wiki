<!-- --- title: Java / Configuration Log4j -->
Voilà un log4j.properties qui va bien :

~~~
log4j.rootLogger = INFO, console
log4j.logger.com.livingobjects.pmin = DEBUG

log4j.appender.console=org.apache.log4j.ConsoleAppender
log4j.appender.console.layout=org.apache.log4j.PatternLayout
log4j.appender.console.layout.conversionPattern=%d{yyyy-MM-dd HH:mm:ss,SSS} %-5p %t %C{1}:%L - %m%n

log4j.appender.METRICS=org.apache.log4j.ConsoleAppender
log4j.appender.METRICS.layout=org.apache.log4j.PatternLayout
log4j.appender.METRICS.layout.conversionPattern=%d{yyyy-MM-dd HH:mm:ss} %p - %m%n

log4j.logger.com.livingobjects.pmin.cdr.metrics = INFO, METRICS
log4j.additivity.com.livingobjects.pmin.cdr.metrics = false
~~~

<!-- --- tags: java -->