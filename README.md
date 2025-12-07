# AutoDropdown

This is an HTML component written in Gren. It renders and manages
a dropdown for a list of items that can be selected with the mouse,
or navigated with the keyboard. Different dropdowns are designed
in different ways, so this dropdown may not work perfectly for your
use case.

This dropdown was specifically designed as part of a dicionary app.
When the user starts typing into a text input box,
the dictionary shows suggestions to show to the the user in
a dropdown that automatically pops up. Hence the name, "AutoDropdown".

![Example dropdown][example/dropdown-example.png]

If this dropdown doesn't suit your needs, perhaps I can adjust as needed, or
accept Pull Requests. Of course, you can fork this project if you need
to make drastic changes.

I've tried to make it as "pure" as possible, following the reasoning
laid forth in the document for
[elm-sortable-table](https://github.com/evancz/elm-sortable-table).

The application does have a "Config", for definitions that don't change
over the lifetime of the dropdown. And it also has a "State", to
keep a tiny amount of information needed to render the dropdown,
but not the list of items. That list stays in your application's Model.

Where the AutoDropdown is perhaps not 100% "pure" is that it does
keep track of which item is highlighted as the user navigates, presumably
with the keyboard. That index is tightly associated with the list
of items (there's a specific maximum), but, it's not the actual list.

# How to use in your code

A fully functional example is included in the *example* directory.

For your own project, install this package with:
```
$ gren package install gilramir/gren-html-autodropdown
```

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
will update highlightedIndex, to track which item is highlighted, as
your **update** function handles messages.

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

Your **update** function will handle the messages, and update
the AutoDropdown.State, and your Model, accordingly.
The mouseDownMsg updates your Model, but does not need to call
any other functions in the AutoDropdown module.

The mouseEnterMessage does need to call AutoDropdown.mouseEnter,
to correctly update the AutoDropdown.State. For example:
```elm
update msg =
    when msg is
        MouseEnterDropdownItem index ->
            let
                newDropdownState =
                    AutoDropdown.mouseEnter index model.items model.dropdownSstate
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
in the AutoDropdown module. That action will adjust the highlight, and return
the new AutoDropdown.State, for you to store in your Model, and also, will
return the newly-highlighted item (or the old one, if it didn't change). It
might return Nothing, as scrolling up all the way will have caused the
dropdown to close. You probably will use this returned item to update
the text input where the user is typing.

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

Your CSS wil render you dropdwon beautifully. Use the Config to put
**class** attributes on the <ul> and <li> objects. You might add an **id** to
the ulAttrs, too.

