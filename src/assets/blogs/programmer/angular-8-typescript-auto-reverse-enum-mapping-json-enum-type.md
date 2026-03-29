---
title: Angular 8 - Typescript Auto Reverse Enum Mapping (Json - Enum Type)
date: 2020-01-04
category: programmer
excerpt: Map JSON responses to TypeScript classes with enum support using json2typescript and a reusable custom enum converter.
author: Sagun Pandey
tags: angular, javascript, json, typescript, enums
---

# Angular 8 - Typescript Auto Reverse Enum Mapping (Json - Enum Type)

![JSON to TypeScript enum mapping](/assets/blogs/programmer/images/typescript-auto-reverse-enum-mapping.png)

If you want to map a JSON response to TypeScript classes and also handle Enum fields automatically, `json2typescript` is a practical approach.

## Library Notes

Using `json2typescript`:
- decorate classes with `@JsonObject(...)`
- decorate properties with `@JsonProperty(...)`
- provide default values for mapped properties

## Example JSON

```json
{
  "PropertyA": "Example",
  "PropertyB": true,
  "PropertyC": 1,
  "PropertyD": 2
}
```

## Target Class

```typescript
@JsonObject()
export class CustomObject {
  @JsonProperty('PropertyA', String, true) propertyA: string = undefined;
  @JsonProperty('PropertyB', Boolean, true) propertyB: boolean = undefined;
  @JsonProperty('PropertyC', PropertyCEnumConverter, true) propertyC: PropertyCEnum = undefined;
  @JsonProperty('PropertyD', PropertyDEnumConverter, true) propertyD: PropertyDEnum = undefined;
}
```

## Generic Enum Converter

```typescript
@JsonConverter
export class EnumConverter<T> implements JsonCustomConvert<any> {
  enumType: { [key: string]: any };

  constructor(enumType: { [key: string]: any }) {
    this.enumType = enumType;
  }

  serialize(data: any): string {
    if (!data) {
      return null;
    }
    return data.toString();
  }

  deserialize(data: any): T {
    if (data === undefined || data == null) {
      return undefined;
    }

    for (const property of Object.keys(this.enumType)) {
      if (property.toUpperCase() === String(data).toUpperCase()) {
        const enumMember = this.enumType[property];
        if (typeof enumMember === 'string') {
          return <T>this.enumType[<string>enumMember];
        }
      }
    }

    return undefined;
  }
}
```

## Per-Enum Converters

```typescript
export enum PropertyCEnum {
  ABC = 0,
  DEF = 1
}

export class PropertyCEnumConverter extends EnumConverter<PropertyCEnum> {
  constructor() {
    super(PropertyCEnum);
  }
}

export enum PropertyDEnum {
  GHI = 0,
  JKL = 1,
  MNO = 2
}

export class PropertyDEnumConverter extends EnumConverter<PropertyDEnum> {
  constructor() {
    super(PropertyDEnum);
  }
}
```

By combining `json2typescript` decorators with custom enum converters, you can reliably reverse-map JSON to strongly typed classes with enum safety.

