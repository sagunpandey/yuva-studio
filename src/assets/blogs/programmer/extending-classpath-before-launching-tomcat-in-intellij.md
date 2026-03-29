---
title: Extending Classpath Before Launching Tomcat in IntelliJ
date: 2023-03-30
category: programmer
excerpt: How to extend Tomcat classpath in IntelliJ IDEA using -Xbootclasspath when generated folders cannot be added as normal dependencies.
author: Sagun Pandey
tags: java, tomcat, webserver, intellij
---

# Extending Classpath Before Launching Tomcat in IntelliJ

Eclipse allows adding extra folders to Tomcat classpath directly in run configuration. In IntelliJ IDEA, this is less straightforward for Tomcat runs.

This becomes important when folders are generated post-compilation and cannot be added as a normal project dependency/source/resource folder.

## Use `-Xbootclasspath/a`

`-Xbootclasspath/a` appends resources to the bootstrap classpath.

Example with two folders:

```bash
java -Xbootclasspath/a:path/to/folder1;path/to/folder2 MyClass
```

Use platform-specific separator:
- Windows: `;`
- Unix/Linux/macOS: `:`

## Configure in IntelliJ Tomcat Run Config

1. Open **Run/Debug Configurations**.
2. Select your Tomcat run configuration.
3. In **Configuration**, find **VM options**.
4. Add:

```text
-Xbootclasspath/a:path/to/folder1:path/to/folder2
```

5. Replace paths with your real directories.
6. Apply and save.

Now Tomcat should include those folders at runtime.

## Tip

If macros or relative paths do not resolve as expected, switch to absolute paths.

