# country-info-GU
Fullstack MongoDB/Express/Node/EJS app that allow management of country info. Each country has temperatures (average, max, min) with date of recorded temp, flag picture and other descriptions.  

Use EJS for loading header, footer, meta and redirect routes

Each Country doc can contains multiple infos doc. Info docs contains an image (can be country flags), title, highest/lowest temperature and the date of the recorded temperature.

Requirie MongoDB (Compass), Node, nodemon

To setup, use:
npm i
npm i --save-dev nodemon

To start:
npm start


Screenshots:

![Screenshot of recently openedcountry flag. The Sweden country is listed but does not have the right flag logo](/images/1.png)

![Screenshot of country list page](/images/2.png)

![Screenshot of country list](/images/4.png)

![Screenshot of create Country info screen](/images/3.png)

![Screenshot of country info detail](/images/5.png)