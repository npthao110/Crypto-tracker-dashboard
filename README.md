# Web Development Project 5 - *Crypto Track Dashboard*

Submitted by: **Thao Nguyen**

This web app: **My Crypto Tracker Dashboard is a React app that pulls live market data from the CoinGecko API to display the top 50 cryptocurrencies with real‑time summary stats like total market cap, average 24‑hour change, and the day’s biggest gainers and losers. It also features a dynamic search bar, market‑cap dropdown, and price‑range slider so users can instantly filter and explore coins by name, rank, or price band.**

Time spent: **6** hours spent in total

## Required Features

The following **required** functionality is completed:

- [x] **The site has a dashboard displaying a list of data fetched using an API call**
  - The dashboard should display at least 10 unique items, one per row
  - The dashboard includes at least two features in each row
- [x] **`useEffect` React hook and `async`/`await` are used**
- [x] **The app dashboard includes at least three summary statistics about the data** 
  - The app dashboard includes at least three summary statistics about the data, such as:
    - Total Market Cap, Average 24h Change, Biggest Gainer, Biggest Loser
- [x] **A search bar allows the user to search for an item in the fetched data**
  - The search bar **correctly** filters items in the list, only displaying items matching the search query
  - The list of results dynamically updates as the user types into the search bar
- [x] **An additional filter allows the user to restrict displayed items by specified categories**
  - The filter restricts items in the list using a **different attribute** than the search bar 
  - The filter **correctly** filters items in the list, only displaying items matching the filter attribute in the dashboard
  - The dashboard list dynamically updates as the user adjusts the filter

The following **optional** features are implemented:

- [x] Multiple filters can be applied simultaneously
- [x] Filters use different input types
  - e.g., as a text input, a dropdown or radio selection, and/or a slider
- [x] The user can enter specific bounds for filter values

The following **additional** features are implemented:
- Real-time clock
- Refresh button to get updated with the latest % coin exchange

## Video Walkthrough

Here's a walkthrough of implemented user stories:

![App demo](src/assets/demo1.gif)
![App demo](src/assets/demo2.gif)

## License

    Copyright [2025] [Thao Nguyen]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
