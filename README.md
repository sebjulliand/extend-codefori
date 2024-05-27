# Extend Code for IBM i!
This is an example of how to extend [Code for IBM i]([https://](https://github.com/codefori/vscode-ibmi))

This extension adds two commands to the palette:
- `Run an IBM i command`: prompts for a command, runs it and display a result dialog with an option to open the output.
- `Open a spooled file`: opens a selection prompt to pick a spooled file and open it when selected.
- `Display file description`: adds a context menu entry on `*FILE` to run `DSPFD` from the Object Browser.
- `Display member description`: adds a context menu entry on members to query members information from the Object Browser.