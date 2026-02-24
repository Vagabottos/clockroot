# Root: The Clockwork Companion

A helper app for Root: a Game of Woodland Might and Right.

This app runs the Clockwork bots.

All rights for images and other assets go to Leder Games.

Resources:
- [BoardGameGeek Thread](https://boardgamegeek.com/thread/2363834/clockroot-run-clockwork-bots-your-browser)

## Running The App

Requires nodejs and you may need to declare an option because it's using an older version of node.

* `npm i`
* export NODE_OPTIONS=--openssl-legacy-provider
* `npm run start`

## Building The App

This will build it in prod mode.

* `npm run build`

## Adding new Factions

### Initialize the Faction  

* `src/app/<faction>/*.{html,scss,ts}` - copy from another faction and change the names
* `src/app/models/bot.ts` - update `BotName` and insert a new faction
* `src/app/models/<faction>.ts` (copy as another template, ensure consistency with existing models)
* `src/app/models/index.ts` add an export for `<faction>.ts`
* `src/app/home/home.module.ts` - add the new bot component to `declarations`
* `src/app/faction-menu/faction-menu.html` - add a new category to the dropdown for the new bot
* `src/app/faction-menu/faction-menu.ts` - add in the new factions and categories (and add new icons to `/app/assets/inicon/<faction>.png`
* `src/app/bot.service.ts` - update imports for new faction
* `src/assets/i18n/en-US.json` - add the faction name to `FactionsShort` and `Factions`

### Customize the Faction

#### Setup

The [Law of Rootbotics](https://therootdatabase.com/law/logical-lizards/en/?highlight_law=1371) is easy to reference at the root database for finding all the nitty gritty details.

* `src/app/model/faction.ts` houses the outline for your factions setup, difficulty, traits, and actions
* `src/assets/i18n/` houses the actual text for these components in the various languages. You'll want to address as required: 

```
SpecificSetup  
SpecificDifficulty  
SpecificRules  
SpecificBirdsong  
SpecificDaylight  
SpecificEvening  
SpecificExtra
```

### Some of the Dev choices for customizing

#### How do I get the inline suits to change with the order card?  
Look in the renderer.services.ts to see the renderer.strong formatter for how the project handles inline formatting. In the JSON input **card:{{suit}}** and then ensure that your model .ts file can reference it with lines like the following:

```
const suit = this.customData.currentSuit;  
this.createMetaData('text', '', translate.instant(`SpecificBirdsong.Cogwheel Corvids.RecruitOrder`, { suit }));
```

### Good references for pulling data or images

* https://www.therootdatabase.com/clockwork/riverfolk-robots/?lang=en  
* https://www.reddit.com/r/rootgame/comments/13gy8pe/does_anyone_have_like_pngs_of_the_meeple_icons/
