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

*ITALICS* means you need to make a new file
**BOLD** mean you need to edit/append within a file
  
src  
&emsp;app  
&emsp;&emsp;**faction-name**  
&emsp;&emsp;&emsp;**.html**  
&emsp;&emsp;&emsp;&emsp;***copy from another faction and change all the names***  
&emsp;&emsp;&emsp;**.scss**  
&emsp;&emsp;&emsp;&emsp;***copy from another faction and change all the names***  
&emsp;&emsp;&emsp;**.ts**  
&emsp;&emsp;&emsp;&emsp;***copy from another faction and change all the names***  

&emsp;&emsp;Models  
&emsp;&emsp;&emsp;bot.ts  
&emsp;&emsp;&emsp;&emsp;export type BotName =  
&emsp;&emsp;&emsp;&emsp;&emsp;**insert new faction**  
&emsp;&emsp;&emsp;*faction.ts* (copy another as a template and ctrl+d to change the names of the faction within the file. Be consistent, careful of plurals and whatnots)  
&emsp;&emsp;&emsp;index.ts  
&emsp;&emsp;&emsp;&emsp;**export * from './faction';**  
&emsp;&emsp;Home  
&emsp;&emsp;&emsp;home.module.ts  
&emsp;&emsp;&emsp;&emsp;**add a line to import your components**  
&emsp;&emsp;&emsp;&emsp;declarations: [  
&emsp;&emsp;&emsp;&emsp;&emsp;**addComponent**  
&emsp;&emsp;&emsp;&emsp;]  
&emsp;&emsp;&emsp;home.page.html  
&emsp;&emsp;&emsp;&emsp;**add your app-botname as appropriate**  
&emsp;&emsp;  
&emsp;&emsp;faction-menu  
&emsp;&emsp;&emsp;.html - you can add in a new category to the drop down add a bot menu here (such as clockwork expansion 3 or whatever the up and coming revamp will be)  
&emsp;&emsp;&emsp;&emsp;<ion-list-header>{{ '**Expansion**' | translate }}</ion-list-header>  
&emsp;&emsp;&emsp;&emsp;<ion-item (click)="close(faction.id)" *ngFor="let faction of **expansionFactions**">  
&emsp;&emsp;&emsp;&emsp;&emsp;<ion-img class="inline-icon" [src]="'assets/inicon/faction-' + faction.icon + '.png'" slot="start"></ion-img>  
&emsp;&emsp;&emsp;&emsp;&emsp;<ion-label>{{ (faction.name) | translate }}</ion-label>  
&emsp;&emsp;&emsp;.ts - add in factions and create new categories  
&emsp;&emsp;&emsp;&emsp;new categories are declared in public
&emsp;&emsp;&emsp;&emsp;within the new factions you can declare the factions individually, icons for the menu will be housed in /app/assets/inicon/faction-name.png  

&emsp;&emsp;bot.service.ts  
&emsp;&emsp;&emsp;import  
&emsp;&emsp;&emsp;&emsp;Add import property for the new faction  
&emsp;&emsp;&emsp;botHash  
&emsp;&emsp;&emsp;&emsp;insert new faction  
&emsp;&emsp;&emsp;botMeta  
&emsp;&emsp;&emsp;&emsp;insert new faction  
&emsp;&emsp;&emsp;
&emsp;assets  
&emsp;&emsp;i18n  
&emsp;&emsp;&emsp;en-US.json  
&emsp;&emsp;&emsp;&emsp;&emsp;Add the factions to "FactionsShort" and "Factions" to properly display in the webapp  


Problems I Encountered  
-Oops I broke the display of the page  
&emsp;Ensure that the app- name in home.page.html is the same as the one in your faction-component.ts  
&emsp;Additionally, you may need to edit the .scss of the faction component to include the following block to force it to use the full width
:host {  
  display: block;  
  width: 100%;  
  --theme-color: #e07a37;  
}

### Customize the Faction

#### Setup

The law of rootbotics is easy to reference at the root database for finding all the nitty gritty details
https://therootdatabase.com/law/logical-lizards/en/?highlight_law=1371

&emsp;src/app/model/faction.ts houses the outline for your factions setup, difficulty, traits, and actions  
&emsp;src/assets/i18n/ houses the actual text for these components in the various languages. You'll want to address as required:  
&emsp;&emsp;SpecificSetup  
&emsp;&emsp;SpecificDifficulty  
&emsp;&emsp;SpecificRules  
&emsp;&emsp;SpecificBirdsong  
&emsp;&emsp;SpecificDaylight  
&emsp;&emsp;SpecificEvening  
&emsp;&emsp;SpecificExtra  

&emsp;"Logical Lizards": {  
&emsp;  "Setup0": ".",  
&emsp;  "Setup1": ".",  
&emsp;  "Setup2": ".",  
&emsp;  "Setup3": ".",  
&emsp;  "Setup4": "."  
&emsp;},  
&emsp;"Riverfolk Robots": {  
&emsp;  "Setup0": ".",  
&emsp;  "Setup1": ".",  
&emsp;  "Setup2": ".",  
&emsp;  "Setup3": ".",  
&emsp;  "Setup4": "."  
&emsp;}

### Some of the Dev choices for customizing

How do I get the inline suits to change with the order card?  
Look in the renderer.services.ts to see the renderer.strong formatter for how the project handles inline formatting. In the JSON input **card:{{suit}}** and then ensure that your model .ts file can reference it with lines like the following:
const suit = this.customData.currentSuit;  
this.createMetaData('text', '', translate.instant(`SpecificBirdsong.Cogwheel Corvids.RecruitOrder`,{ suit })),

### Good references for pulling data or images

https://www.therootdatabase.com/clockwork/riverfolk-robots/?lang=en  
https://www.reddit.com/r/rootgame/comments/13gy8pe/does_anyone_have_like_pngs_of_the_meeple_icons/

### Skipped over To-Do List
-Address the factions being named Faction.FactionName in the menu for some reason  
-Remake a handful of Corvid elements to be smoother such as the evening scoring  