# Cogwheel Corvids  

## Current State  
[x] Functional, requiring automation

## To-Do  
[] Automation  
    [] Implement tracking for number of each plot token face-up to do basic math for victory point addition (Evening/1st-Score and Birdsong/4th-flip)
    [] Implement a button for Birdsong/4th-Flip to flip all face-down plot tokens
    [] Implement a 5th plot column? So layout is: Plots Face-Down (-) 8 (+) and the 4 plot trackers will only account for face-up versions of the plots

# Drillbit Duchy  

## Current State  
[x] JSON updated to be functional

## To-Do  
[] Code in base functionality
[] Core Functionality
    [] Burrow and tunnels? (Do we want a burrow/tunnel tracker?)
    [] Citadels (Need 3 icons for when stowed, out, and then the third out)
    [] Markets (Need 2 icons for stowed/out)
    [] Ministers (This is a big table and will need some deliberate thought in how to address)
    Section may look as follows:
    Citadels | [C] [C] [C] Markets | [M] [M] [M]
    Ministers
    [suit] [name]
    *Suit toggles an overlay for if swayed or not (crown? just an opacity filter?)
    *Name can bring up a pop-up for the minister or all minsters? Saves visible space in webapp to do this?
[] Automate
    [] Pop-ups for ministers based on the ordered suit? May not even need to display all the ministers and automatically sway them on button push. Then player can unsway ministers with a display of 'swayed' ministers above daylight
    [] Tracking for number of swayed/unswayed ministers alloted based on citadels/markets on board

# Logical Lizards  

## Current State  
[x] JSON updated to be functional

## To-Do  
[] Code in base functionality
[] Core Functionality
    [] Gardens (5 per suit)
    [] Outcast markers
    [] Two different tracked suits: Order Suit and Outcast Suit
    [] Acolyte Counter (-) 0-6 (+)
        [] Conspiracy Pop-Up on Acolyte 6 (4 options, close (-1 acolyte), Convert, Crusade, Sanctify)
[] Automate
    [] VP tracking based on number of gardens out and the outcast suit evening/1st-Score
    [] Use outcast suit to update the acolytes and check for a conspiracy/crusade/converts with a pop-up of instructions

# Riverfolk Robots 

## Current State  
[x] JSON updated to be functional

## To-Do  
[] Code in base functionality
[] Core Functionality
    [] Trade Posts (3 per suit)
    [] Funds tracking for Payments and Funds
        [] Pop-Up for Funds tracking? In Setup declare all factions on board and then allow for individual tracking?
    [] Protectionism
        [] Simple UI for players to state when protectionism is active (add the shield and swords icons)
[] Automate
    [] Birdsong moves payments to funds integer
    [] Prompts for # times to build a trade post, # times to execute a move and battle
    [] Track trade posts for evening/1st-Score

# Bugs
[] All expansion factions display as 'Faction.Cogwheel Corvids' or their individual faction name
[] Cogwheel Corvid icons for plot tokens are not sized well and need to be addressed for mobile in particular

# Future Dev Options
[] Links to some of the other big root webapps (reach calc, setup calc...)