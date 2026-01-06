# FavouritableCombo

This is a combo box with favourite items, for Angular 20.
The user may select from a list of items.
When the list is expanded, the user may click on items to mark them as favourites.
The user may enter text to filter the list of items.
If no matching item is found, the user's text is set as the current item.

An event is emitted when:
* a new item is selected
* the set of favourites changes.

It is intended that the external application record the user's favourites so they can be returned to later.

This code was originally based on ng-multiselect-dropdown by Nilesh Patel. 
However as that component was for an entirely different purpose, I have made massive changes.

There are no tests.
Sorry, I don't understand Angular testing yet.

## How to Build

