WidgetMetadata = {
    id: "shinpachi.mdblist",
    title: "MDbList",
    version: "1.0.0",
    requiredVersion: "0.0.1",
    description: "Browse movies and TV shows from MDbList",
    author: "shinpachi",
    site: "https://github.com/yfarook/forward-widgets",
    modules: [
        {
            title: "Browse Lists (using URL)",
            requiresWebView: false,
            functionName: "browseListsByUrl",
            cacheDuration: 3600,
            params: [
                {
                    name: "apiKey",
                    title: "MDbList API Key",
                    type: "input",
                    description: "Your MDbList API key (get it from https://mdblist.com/settings/api)",
                    value: ""
                },
                {
                    name: "listUrl",
                    title: "MDbList URL",
                    type: "input",
                    description: "The full URL of the MDbList list (e.g., https://mdblist.com/lists/garycrawfordgc/latest-tv-shows)",
                    value: ""
                },
                {
                    name: "sort",
                    title: "Sort By",
                    type: "enumeration",
                    description: "Field to sort by",
                    enumOptions: [
                        { title: "None", value: "" },
                        { title: "Rank", value: "rank" },
                        { title: "Score", value: "score" },
                        { title: "User Sort", value: "usort" },
                        { title: "Score Average", value: "score_average" },
                        { title: "Released", value: "released" },
                        { title: "Release Digital", value: "releasedigital" },
                        { title: "IMDb Rating", value: "imdbrating" },
                        { title: "IMDb Votes", value: "imdbvotes" },
                        { title: "Last Air Date", value: "last_air_date" },
                        { title: "IMDb Popular", value: "imdbpopular" },
                        { title: "TMDB Popular", value: "tmdbpopular" },
                        { title: "Roger Ebert", value: "rogerebert" },
                        { title: "Rotten Tomatoes", value: "rtomatoes" },
                        { title: "RT Audience", value: "rtaudience" },
                        { title: "Metacritic", value: "metacritic" },
                        { title: "MyAnimeList", value: "myanimelist" },
                        { title: "Letterboxd Rating", value: "letterrating" },
                        { title: "Letterboxd Votes", value: "lettervotes" },
                        { title: "Budget", value: "budget" },
                        { title: "Revenue", value: "revenue" },
                        { title: "Runtime", value: "runtime" },
                        { title: "Title", value: "title" },
                        { title: "Sort Title", value: "sort_title" },
                        { title: "Added", value: "added" },
                        { title: "Random", value: "random" }
                    ],
                    value: ""
                },
                {
                    name: "order",
                    title: "Order",
                    type: "enumeration",
                    description: "Sort order",
                    enumOptions: [
                        {
                            title: "Ascending",
                            value: "asc"
                        },
                        {
                            title: "Descending",
                            value: "desc"
                        }
                    ],
                    value: "desc"
                },
                {
                    name: "page",
                    title: "Page",
                    type: "page"
                }
            ]
        },
        {
            title: "Browse Lists (using username and list name)",
            requiresWebView: false,
            functionName: "browseListsByListName",
            cacheDuration: 3600,
            params: [
                {
                    name: "apiKey",
                    title: "MDbList API Key",
                    type: "input",
                    description: "Your MDbList API key (get it from https://mdblist.com/settings/api)",
                    value: ""
                },
                {
                    name: "username",
                    title: "Username",
                    type: "input",
                    description: "The username associated with the list (e.g., garycrawfordgc)",
                    value: ""
                },
                {
                    name: "listname",
                    title: "List Name (Slug)",
                    type: "input",
                    description: "The slug of the list (e.g., latest-tv-shows)",
                    value: ""
                },
                {
                    name: "sort",
                    title: "Sort By",
                    type: "enumeration",
                    description: "Field to sort by",
                    enumOptions: [
                        { title: "None", value: "" },
                        { title: "Rank", value: "rank" },
                        { title: "Score", value: "score" },
                        { title: "User Sort", value: "usort" },
                        { title: "Score Average", value: "score_average" },
                        { title: "Released", value: "released" },
                        { title: "Release Digital", value: "releasedigital" },
                        { title: "IMDb Rating", value: "imdbrating" },
                        { title: "IMDb Votes", value: "imdbvotes" },
                        { title: "Last Air Date", value: "last_air_date" },
                        { title: "IMDb Popular", value: "imdbpopular" },
                        { title: "TMDB Popular", value: "tmdbpopular" },
                        { title: "Roger Ebert", value: "rogerebert" },
                        { title: "Rotten Tomatoes", value: "rtomatoes" },
                        { title: "RT Audience", value: "rtaudience" },
                        { title: "Metacritic", value: "metacritic" },
                        { title: "MyAnimeList", value: "myanimelist" },
                        { title: "Letterboxd Rating", value: "letterrating" },
                        { title: "Letterboxd Votes", value: "lettervotes" },
                        { title: "Budget", value: "budget" },
                        { title: "Revenue", value: "revenue" },
                        { title: "Runtime", value: "runtime" },
                        { title: "Title", value: "title" },
                        { title: "Sort Title", value: "sort_title" },
                        { title: "Added", value: "added" },
                        { title: "Random", value: "random" }
                    ],
                    value: ""
                },
                {
                    name: "order",
                    title: "Order",
                    type: "enumeration",
                    description: "Sort order",
                    enumOptions: [
                        {
                            title: "Ascending",
                            value: "asc"
                        },
                        {
                            title: "Descending",
                            value: "desc"
                        }
                    ],
                    value: "desc"
                },
                {
                    name: "page",
                    title: "Page",
                    type: "page"
                }
            ]
        }
    ]
};

async function browseListsByUrl(params) {
    try {
        if (!params.apiKey || !params.apiKey.trim()) {
            throw new Error("MDbList API key is required");
        }
        if (!params.listUrl || !params.listUrl.trim()) {
            throw new Error("MDbList URL is required");
        }

        const apiKey = params.apiKey.trim();
        const urlParam = params.listUrl.trim();

        // Parse the URL to extract username and listname
        // MDbList URLs format: https://mdblist.com/lists/{username}/{listname}
        const match = urlParam.match(/https?:\/\/[^\/]+\/(.+)/);
        if (!match) {
            throw new Error("Invalid URL format. Expected: https://mdblist.com/lists/{username}/{listname}");
        }
        
        const pathParts = match[1].split('/').filter(part => part.length > 0);
        
        if (pathParts.length < 3 || pathParts[0] !== 'lists') {
            throw new Error("Invalid MDbList URL format. Expected: https://mdblist.com/lists/{username}/{listname}");
        }
        
        const username = pathParts[1]?.trim();
        const listname = pathParts[2]?.trim();
        
        if (!username || !listname) {
            throw new Error("Could not extract username and listname from URL");
        }

        // MDbList API supports pagination with limit and offset
        const page = params.page || 1;
        const limit = 20;
        const offset = (page - 1) * limit;
        let apiUrl = `https://api.mdblist.com/lists/${username}/${listname}/items?apikey=${apiKey}&limit=${limit}&offset=${offset}`;
        
        // Add sort and order parameters if provided
        if (params.sort && params.sort.trim()) {
            apiUrl += `&sort=${encodeURIComponent(params.sort.trim())}`;
        }
        if (params.order && params.order.trim()) {
            apiUrl += `&order=${encodeURIComponent(params.order.trim())}`;
        }

        const response = await Widget.http.get(apiUrl, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
                "Accept": "application/json"
            }
        });

        if (!response || !response.data) {
            throw new Error("Failed to fetch data from MDbList");
        }

        let items = [];
        if (response.data.movies && Array.isArray(response.data.movies)) {
            items = items.concat(response.data.movies);
        }
        if (response.data.shows && Array.isArray(response.data.shows)) {
            items = items.concat(response.data.shows);
        }

        const result = items
            .filter(item => item.imdb_id != null)
            .map(item => ({
                id: item.imdb_id,
                type: "imdb"
            }));
        
        return result;
    } catch (error) {
        console.error("Failed to browse MDbList by URL:", error);
        throw error;
    }
}

async function browseListsByListName(params) {
    try {
        if (!params.apiKey || !params.apiKey.trim()) {
            throw new Error("MDbList API key is required");
        }
        if (!params.username || !params.username.trim()) {
            throw new Error("Username is required");
        }
        if (!params.listname || !params.listname.trim()) {
            throw new Error("List name is required");
        }

        const apiKey = params.apiKey.trim();
        const username = params.username.trim();
        const listname = params.listname.trim();

        // MDbList API supports pagination with limit and offset
        const page = params.page || 1;
        const limit = 20;
        const offset = (page - 1) * limit;
        let url = `https://api.mdblist.com/lists/${username}/${listname}/items?apikey=${apiKey}&limit=${limit}&offset=${offset}`;
        
        // Add sort and order parameters if provided
        if (params.sort && params.sort.trim()) {
            url += `&sort=${encodeURIComponent(params.sort.trim())}`;
        }
        if (params.order && params.order.trim()) {
            url += `&order=${encodeURIComponent(params.order.trim())}`;
        }

        const response = await Widget.http.get(url, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
                "Accept": "application/json"
            }
        });

        if (!response || !response.data) {
            throw new Error("Failed to fetch data from MDbList");
        }

        let items = [];
        if (response.data.movies && Array.isArray(response.data.movies)) {
            items = items.concat(response.data.movies);
        }
        if (response.data.shows && Array.isArray(response.data.shows)) {
            items = items.concat(response.data.shows);
        }

        const result = items
            .filter(item => item.imdb_id != null)
            .map(item => ({
                id: item.imdb_id,
                type: "imdb"
            }));
        
        return result;
    } catch (error) {
        console.error("Failed to browse MDbList:", error);
        throw error;
    }
}

