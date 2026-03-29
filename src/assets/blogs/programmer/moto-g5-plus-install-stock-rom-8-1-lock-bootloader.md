---
title: Moto G5 Plus - Install Stock ROM 8.1.0 and Lock Bootloader
date: 2018-12-20
category: programmer
excerpt: Step-by-step commands to restore Moto G5 Plus stock ROM (8.1.0), recover from custom ROM issues, and optionally relock the bootloader.
author: Sagun Pandey
tags: android, moto-g5-plus, motorola, fastboot
---

# Moto G5 Plus - Install Stock ROM 8.1.0 and Lock Bootloader

![Moto G5 Plus stock ROM restoration](/assets/blogs/programmer/images/moto-g5-plus-stock-rom.jpeg)

Custom ROMs are great when you want total control over your phone. But if something goes wrong beyond recovery, or if you plan to sell your phone, you may want to return to complete stock firmware.

This guide walks through restoring Moto G5 Plus to stock ROM and optionally locking the bootloader again.

## Steps

1. Make sure you have Motorola USB drivers installed:
   - https://support.motorola.com/us/en/drivers
2. Install ADB and Fastboot:
   - https://androidmtk.com/download-15-seconds-adb-installer
3. Download Moto G5 Plus stock ROM:
   - https://mirrors.lolinet.com/firmware/motorola/potter/official/
   - Example used: POTTER_RETAIL_8.1.0_OPS28.85-17_cid50_subsidy-DEFAULT_regulatory-DEFAULT_CFC.xml
4. Power off your phone, then boot into bootloader mode using **Volume Down + Power**.
5. Connect phone to computer via USB.
6. Verify device is detected:

```bash
fastboot devices
```

7. Extract the stock ROM zip.
8. Open terminal in extracted folder and run:

```bash
fastboot oem fb_mode_set
fastboot flash partition gpt.bin
fastboot flash bootloader bootloader.img
fastboot flash logo logo.bin
fastboot flash boot boot.img
fastboot flash recovery recovery.img
fastboot flash dsp adspso.bin
fastboot flash oem oem.img
fastboot flash system system.img_sparsechunk.0
fastboot flash system system.img_sparsechunk.1
fastboot flash system system.img_sparsechunk.2
fastboot flash system system.img_sparsechunk.3
fastboot flash system system.img_sparsechunk.4
fastboot flash system system.img_sparsechunk.5
fastboot flash system system.img_sparsechunk.6
fastboot flash system system.img_sparsechunk.7
fastboot flash system system.img_sparsechunk.8
fastboot flash modem NON-HLOS.bin
fastboot erase modemst1
fastboot erase modemst2
fastboot flash fsg fsg.mbn
fastboot erase cache
fastboot erase userdata
fastboot erase customize
fastboot erase clogo
fastboot oem fb_mode_clear
fastboot reboot
```

9. Device should reboot to stock state. You can stop here if you do not want to lock bootloader.
10. To relock bootloader, reboot again into bootloader mode.
11. Run:

```bash
fastboot oem lock
fastboot oem lock
fastboot flash oem oem.img
fastboot flash system system.img_sparsechunk.0
fastboot flash system system.img_sparsechunk.1
fastboot flash system system.img_sparsechunk.2
fastboot flash system system.img_sparsechunk.3
fastboot flash system system.img_sparsechunk.4
fastboot flash system system.img_sparsechunk.5
fastboot flash system system.img_sparsechunk.6
fastboot flash system system.img_sparsechunk.7
fastboot flash system system.img_sparsechunk.8
fastboot flash boot boot.img
fastboot oem lock
```

12. Boot complete.

## Notes

- In the original successful run, there were no VoLTE issues.
- IMEI also remained intact.

**Disclaimer:** Proceed carefully. Flashing commands incorrectly can brick your device.

