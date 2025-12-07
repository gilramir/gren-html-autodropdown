# AutoDropdown

This is an HTML component written in Gren. It renders and manages
a dropdown for a list of items that can be selected with the mouse,
or navigated with the keyboard.

This dropdown was specifically designed as part of a dicionary app.
When the user starts typing into a text input box,
the app opens a dropdown and shows suggestions to the user.
Because the dropdown opens like this, I named it "AutoDropdown".

It has no styling at all. You must provide the styles to make
it look the way you want. This is one example of what it can look like.
![Example dropdown](https://github.com/gilramir/gren-html-autodropdown/blob/main/example/dropdown-example.png)

A runnable example is provided in the source code. Just open
[example/index.html](https://github.com/gilramir/gren-html-autodropdown/blob/main/example/index.html)


# Details

I've tried to make the component as "pure" as possible, following the reasoning
laid forth in the README in the
[elm-sortable-table](https://github.com/evancz/elm-sortable-table)
package.

The application which uses this AutoDropdown component will
have a **Config**, for definitions that don't change
over the lifetime of the dropdown. And it also has a **State**, to
keep a tiny amount of information needed to render the dropdown,
but not the list of items itself. That list stays in your application's Model.

Where the AutoDropdown is perhaps not 100% "pure" is that it does
keep track of which item is currently highlighted as the user navigates,
presumably with the keyboard. That index is tightly associated with the length
of the list items, but, it's not the actual list.

# How to use it in your code

A fully functional example is included in the
[example](https://github.com/gilramir/gren-html-autodropdown/blob/main/example/index.html)
directory.

For your own project, install this package with:
```
$ gren package install gilramir/gren-html-autodropdown
```

## The Model

In your code which defines your Model, import AutoDropdown.
Your model needs an AutoDropdown.State for every dropdown instance.
```elm
import AutoDropdown

type alias Model =
    { dropdownState: AutoDropdown.State
    }
```

The state tracks two items.
```elm
type alias State =
    { isOpen : Bool
    , highlightedIndex: Maybe Int
    }
```

Your application will set the **isOpen**
field, to tell the AutoDropdown whether its visible or not. The dropdown
tself will update **highlightedIndex**, to track which item is highlighted, as
your **update** function handles messages. Your application will not
use or modify **highlightedIndex**.

## View

Your **view** function will call the **AutoDropdown.view** function,
passing it the Config, the State, and the list of items to render.

```elm
view: Model -> Html Msg
view =
    div [] [
        AutoDropdown.view dropdownConfig model.dropdownState model.items
    ]
```

In the Config, you will define:
* **mouseDownMsg** - the Msg to invoke if the user selects an item with the mouse.
    Note that it is a "msg String" function.
* **mouseEnterMsg** - the Msg to invoke when the mouse begins to hover over an
   item. Note that it is a "msg Int" function, as it deals with the index
   of the item in the list of items.
* **ulAttrs** - the entire dropdown is rentered as an unordered list (<ul>).
    This is the Array of Html.Attribute objects, if any, that you want on the <ul>
* **liAttrs** - every item in the dropdown is rentered as list item (<li>).
    This is the Array of Html.Attribute objects, if any, that you want on the <li>.
    AutoDropdown will add to that Array, to manage the mouse and highligting.
* **highlightedAttrs** -- when the mouse hovers over an item, or the user has
    navigated through the items (presumably with the keyboard), there is one
    highlighted item. These Html.Attributes area added to the <li> for that
    single highlighted item. Your CSS uses this to draw the highlight.

Example:
```elm
dropdownConfig: AutoDropdown.Config Msg
dropdownConfig =
    { itemClickedMsg = ClickedDropdownItem
    , mouseEnterMsg = MouseEnterDropdownItem
    , ulAttrs = [ class "suggestion-dropdown" ]
    , liAttrs = [ class "suggestion-item" ]
    , highlightedAttrs = [ class "suggestion-item-highlighted" ]
    }
```

These are the rules about State and Config:
* Always put AutoDropdown.State in your model
* Never put AutoDropdown.Config in your model

## Update

Your **update** function will handle the two messages, and update
the AutoDropdown.State, and your Model, accordingly.

* **mouseDown** - this is triggered when the user clicks on
    an item in the dropdown.

* **mouseEnter** - this is triggered when the user hovers on
    an item in the dropdown with their mouse.

You will have other messages for handling the keyboard input.

# The Mouse

The **mouseEnterMsg** update handler needs to call AutoDropdown.mouseEnter,
which returns an updated State which you need to store in your Model.
For example:
```elm
update msg =
    when msg is
        MouseEnterDropdownItem index ->
            let
                newDropdownState =
                    AutoDropdown.mouseEnter index model.items model.dropdownState
            in
            { model =
                { model
                    | dropdownState = newDropdownState
                }
            , command = Cmd.none
            }
```

# The Keyboard

The AutoDropdown component does not manage the keyboard input. Your application
needs to listen for key events in the HTML item where keyboard focus will be
and which will control the navigation in the dropdown.  In your application's
**update** function, you can call the **moveUp** and **moveDown** functions
to tell the dropdown about the keyboard navigation.

The **moveUp** and **moveDown** functiosn will adjust which item is highlighted,
and return the new State for you to store in your Model. They also will
return the newly-highlighted item's text (or the old one, if it didn't change). It
might return Nothing, as scrolling up all the way will have caused the
dropdown to close. While you don't have to, you probably will use this
returned highlighted item text to update the text input where the user is typing.

For example:
```elm
update msg =
    when msg is
        SomeKeyHandler key ->
            { state = newDropdownState, highlighted = maybeHighlighted } =
                if model.userInputText /= "" then
                    when key is
                        -- ArrowUp
                        38 -> AutoDropdown.moveUp model.items model.dropdownState
                        -- ArrowDown
                        40 -> AutoDropdown.moveDown model.items model.dropdownState
                        -- Anything else
                        _ -> { state = model.dropdownState, highlighted = Nothing }
                    else
                        { state = model.dropdownState, highlighted = Nothing }
```

# The CSS

The AutoDropdown.view creates one <ul> for the dropdown, and one <li> for
each item. It adds as few attributes as possible, but allows you, via the
Config, to add arbitrary attributes to the <ul> and each <li>.
In pseudo-HTML, it looks like this:

```html
<ul style="display: block/none;" [ulAttrs] >
<li onMouseDown... onMouseEnter... [liAttrs] [highlightedAttrs] >
</ul>
```

Use the Config to put these Html.Attributes onto the <ul> and <li> elements
to render the dropdown as you desire.

