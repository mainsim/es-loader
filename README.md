# es-loader
Javascript asynchronous loader

The loader is made as simplier as possible.
The logic follows few rules that cannot be omitted in order to get maximum performance.

It consist in definition into script tag attributes of the global variable with which the 
loader class is instantiated, and the relative path to the first class to load.

---
<script src="src/loader.js" instance="your_global_variable" load="js/main"></script>
---

There are three primary methods which are used.

The first setter method that is mandatory for including class into loader
and it must be called in every file after the class definition.

---
your_global_variable.include = your_class_name
---

At that time the second method which is used first to emulate the class that is required and include 
it automaticaly into the loader so the include method is not necessary.
The preload method is used in order to load and extend abstract classes into defined class.

---
your_global_variable.preload()
 ---

The third method has to be called into class constructor before loaded classes are instantiated, and then
you can set your class properties.

---
your_global_variable.load()
---

The main rule is to not call the class which calls its caller in the constructor to avoid endless loop.



