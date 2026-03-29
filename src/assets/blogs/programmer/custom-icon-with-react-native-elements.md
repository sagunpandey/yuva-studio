---
title: Using Custom Icon Font Type with react-native-elements Icon Component
date: 2018-10-14
category: programmer
excerpt: A step-by-step guide to creating your own icon font with IcoMoon and using it with react-native-elements via react-native-vector-icons.
author: Sagun Pandey
tags: react-native, javascript, android, ios, icons
---

# Using Custom Icon Font Type with react-native-elements Icon Component

![React Native + IcoMoon custom icons](/assets/blogs/programmer/images/react-native-icomoon.jpeg)

`react-native-elements` uses `react-native-vector-icons` internally so icons work out of the box in many components.

A common usage pattern looks like this:

```javascript
import { Icon } from 'react-native-elements';

<Icon name="heartbeat" type="font-awesome" />
```

By default, React Native Elements supports material icons and lets you switch type to libraries like `material-community`, `font-awesome`, `octicon`, `ionicon`, `foundation`, `evilicon`, `simple-line-icon`, `zocial`, or `entypo`.

But what if you want to use your **own** icon set? Here is the workflow.

## 1) Create or Download SVG Icons

You can either:
- design icons yourself (e.g., Illustrator), or
- download SVG icons from sources like Flaticon.

## 2) Generate a Font with IcoMoon

Upload your SVG icons to IcoMoon:
- https://icomoon.io/app

After importing:

![IcoMoon imported icons](/assets/blogs/programmer/images/icomoon-icons-uploaded.png)

- (Optional) edit icon set metadata (name, license, designer info).

![IcoMoon set metadata](/assets/blogs/programmer/images/icomoon-set-metadata.png)

- Select icons to include.
- Click **Generate Font**.

![IcoMoon generate font](/assets/blogs/programmer/images/icomoon-generate-font.png)

In **Preferences**:
- set your font name (for example: `myfont`)
- optionally adjust class prefix and metadata

Download the generated zip. You will need:
- `.ttf` font file
- `selection.json`

## 3) Install react-native-vector-icons

```bash
npm install react-native-vector-icons --save
```

## 4) Configure Your Project

- Create `./resources/fonts` in your project root.
- Copy your generated `.ttf` into `./resources/fonts`.
- Add this at top-level `package.json`:

```json
{
  "rnpm": {
    "assets": ["resources/fonts"]
  }
}
```

- Copy `selection.json` to your project root.
- Run:

```bash
react-native link react-native-vector-icons
```

### Manual linking option (if preferred)

If autolinking/linking gives you trouble, add fonts manually.

**Android**
- Copy `.ttf` to:

```text
./android/app/src/main/assets/fonts
```

**iOS**
- Copy `.ttf` into `./ios`
- Add font in Xcode (drag into Resources)
- Ensure it is included in **Copy Bundle Resources**

## 5) Create Your Custom Icon Component

Create `CustomIcon.js`:

```javascript
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icoMoonConfig from './selection.json';

const Icon = createIconSetFromIcoMoon(icoMoonConfig);

export default Icon;
```

## 6) Register Custom Icon Type in react-native-elements

In your root app component:

```javascript
import { registerCustomIconType } from 'react-native-elements';
import Icon from './CustomIcon';

export default class MyApp extends React.Component {
  constructor(props) {
    super(props);
    registerCustomIconType('myfont', Icon);
  }

  // ...
}
```

Now you can use your custom font type with React Native Elements:

```javascript
import { Icon } from 'react-native-elements';

<Icon name="add" type="myfont" />
```

Or use your custom icon component directly:

```javascript
import Icon from '../path/to/CustomIcon';

<Icon name="add" />
```

Happy coding.

## References

- https://medium.com/bam-tech/add-custom-icons-to-your-react-native-application-f039c244386c
- https://www.reactnative.guide/12-svg-icons-using-react-native-vector-icons/12.1-creating-custom-iconset.html

