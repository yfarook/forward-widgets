# Forward Widgets

Custom Forward Widgets by shinpachi.

## MDbList Widget

Browse movies and TV shows from MDbList lists. The widget returns imdb ids of items in the list.

### How to Get Your MDbList API Key

1. Go to [MDbList Settings](https://mdblist.com/preferences/)
2. Log in to your MDbList account (or create one if you don't have an account)
3. Navigate to the **API access** section in your preferences
4. Copy your API key

### Usage

1. Add the widget to Forward using the `.fwd` file
2. Configure the widget with:
   - **MDbList API Key**: Your API key from the settings page
   - **Username**: MDbList username of the list you want to browse
   - **List Name (Slug)**: The slug of the list you want to browse
3. The widget will fetch 20 items per page and returns imdb ids of items in the list
