---
title: Setup Virtual Serial Ports Using tty0tty in Linux
date: 2016-02-17
category: programmer
excerpt: A practical walkthrough for creating virtual serial port pairs in Linux using tty0tty, including install, module loading, permissions, and boot persistence.
author: Sagun Pandey
tags: linux, serial-communication, tty0tty, kernel-module
---

# Setup Virtual Serial Ports Using tty0tty in Linux

![tty0tty virtual serial ports on Linux](/assets/blogs/programmer/images/tty0tty-linux-1.jpeg)

Before starting with the tutorial, here is a quick background on serial communication, null modems, and virtual ports.

A **serial port** (COM port) is an asynchronous interface used to connect serial devices and transmit data one bit at a time. Most serial ports conform to **RS-232C** or **RS-422** standards.

A serial connection generally involves:
- **DTE (Data Terminal Equipment)** - usually your computer
- **DCE (Data Communication Equipment)** - usually a modem or another serial device

A standard RS-232 cable is typically used between DTE and DCE.

## Why a Null Modem Is Needed

You cannot always pair a DTE with a DCE. Sometimes both ends are configured as DTE. In that case, you need a **null modem cable** so each side appears like a DCE to the other.

Null modem cables are commonly used for data transfer between:
- Two computers
- Two software packages on the same computer (using two serial ports)

This works, but introduces physical cable clutter and potential interference.

## Virtual Serial Ports

A **virtual serial port** emulates a physical serial port in software, so applications communicate through internal memory instead of physical wiring.

Software that creates paired virtual serial ports and passes data between them behaves like a **null modem emulator**.

![Null modem emulator diagram](/assets/blogs/programmer/images/null-modem-emulator.png)

## tty0tty on Linux

The Linux null-modem emulator **tty0tty** is a kernel module virtual serial port driver. It creates paired virtual TTY ports for legacy serial applications to communicate.

## Install tty0tty

1. Download tty0tty from one of these sources:
   - http://sourceforge.net/projects/tty0tty/files/
   - https://github.com/freemed/tty0tty
2. Extract the package:

```bash
tar xf tty0tty-1.2.tgz
```

3. Build the kernel module:

```bash
cd tty0tty-1.2/module
make
```

4. Copy the module into your kernel modules directory:

```bash
sudo cp tty0tty.ko /lib/modules/$(uname -r)/kernel/drivers/misc/
```

5. Load the module:

```bash
sudo depmod
sudo modprobe tty0tty
ls /dev/tnt*
```

6. Set permissions on generated device files:

```bash
sudo chmod 666 /dev/tnt*
```

You can now access virtual ports like `/dev/tnt0`, `/dev/tnt1`, etc.

Consecutive ports are interconnected. For example:
- `/dev/tnt0` <-> `/dev/tnt1`

## Persist Across Reboot

Edit either:
- `/etc/modules` (Debian-based systems), or
- `/etc/modules.conf`

Add:

```text
tty0tty
```

Note: Kernel updates may require rebuilding and reinstalling the module.

## References

- http://askubuntu.com/questions/588800/setup-virtual-serial-ports-linux-null-modem-emulator-using-tty0tty
- http://kc.flexradio.com/KnowledgebaseArticle50367.aspx
