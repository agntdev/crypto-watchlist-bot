# Crypto Watchlist Bot — Bot specification

**Archetype:** custom

**Voice:** professional and concise — write every user-facing message, button label, error, and empty state in this voice.

A Telegram bot that monitors crypto prices and pings users when their watched coins move. Each user maintains a private watchlist of tickers and sets custom alerts for price thresholds or percentage moves. Supports /price for on-demand checks, optional morning summaries, quiet hours, and cooldowns to avoid spam.

> This is the complete contract for the bot. Implement EVERY entry point, flow, feature, integration, and edge case below. The completeness review checks the bot against this document after each build pass.

## Primary audience

- crypto traders
- crypto enthusiasts
- trading enthusiasts

## Success criteria

- users can add tickers to their watchlist
- users receive price alerts when configured thresholds are crossed
- users can configure alert types and quiet hours
- users can view their current watchlist and on-demand prices
- owner can view usage stats and top alerts

## Entry points

Every feature must be reachable from the bot's command/button surface (button-first; only /start and /help are slash commands).

- **/start** (command, actor: user, command: /start) — Open the main menu and receive welcome message
- **/watch** (command, actor: user, command: /watch) — Add a ticker to the watchlist
  - inputs: ticker symbol
  - outputs: confirmation message, error if ticker invalid
- **/unwatch** (command, actor: user, command: /unwatch) — Remove a ticker from the watchlist
  - inputs: ticker symbol
  - outputs: confirmation message, error if ticker not in watchlist
- **/watchlist** (command, actor: user, command: /watchlist) — Show current watchlist
  - outputs: list of tickers with current prices
- **/price** (command, actor: user, command: /price) — On-demand price check
  - inputs: ticker symbol (optional)
  - outputs: price for single coin or whole list
- **/alerts** (command, actor: user, command: /alerts) — Configure alert types
  - outputs: alert configuration menu
- **/quiet** (command, actor: user, command: /quiet) — Set quiet hours
  - inputs: start time, end time
  - outputs: confirmation message
- **/summary** (command, actor: user, command: /summary) — Enable/disable morning summary
  - inputs: time (optional)
  - outputs: confirmation message
- **/owner** (command, actor: owner, command: /owner) — View usage stats and top alerts
  - outputs: usage statistics, top alerts

## Flows

### Add ticker to watchlist
_Trigger:_ /watch <ticker>

1. Parse ticker from command
2. Validate ticker against price API
3. Add to user's watchlist
4. Store alert configuration if provided

_Data touched:_ user_watchlist

### Remove ticker from watchlist
_Trigger:_ /unwatch <ticker>

1. Parse ticker from command
2. Remove from user's watchlist

_Data touched:_ user_watchlist

### Display watchlist
_Trigger:_ /watchlist

1. Fetch user's watchlist
2. Fetch current prices for all tickers
3. Format and display watchlist

_Data touched:_ user_watchlist, price_records

### On-demand price check
_Trigger:_ /price <ticker?>

1. Fetch current price(s)
2. Format and display price(s)

_Data touched:_ price_records

### Configure alerts
_Trigger:_ /alerts

1. Display alert configuration menu
2. Update user's alert preferences

_Data touched:_ user_settings

### Set quiet hours
_Trigger:_ /quiet <start> <end>

1. Parse start and end times
2. Validate times
3. Update user's quiet hours

_Data touched:_ user_settings

### Configure morning summary
_Trigger:_ /summary <time?>

1. Parse time if provided
2. Enable/disable summary
3. Update user's summary settings

_Data touched:_ user_settings

### Alert processing
_Trigger:_ Scheduled check (every minute)

1. Fetch current prices for all tickers
2. Check threshold alerts
3. Check percentage move alerts
4. Send alerts if conditions met
5. Update cooldown state

_Data touched:_ user_watchlist, user_settings, price_records, alert_cooldowns

### Morning summary
_Trigger:_ Scheduled check (at configured time)

1. Fetch current prices for all ticklist
2. Calculate changes since last summary
3. Format and send summary

_Data touched:_ user_watchlist, price_records

### Owner stats view
_Trigger:_ /owner

1. Fetch usage statistics
2. Fetch top alerts
3. Format and display stats

_Data touched:_ user_stats, alert_stats

## Data entities

Durable data (must survive a restart) uses the toolkit's persistent store, never in-memory maps.

- **user_watchlist** _(retention: persistent)_ — User's private watchlist of tickers
  - fields: ticker, threshold_alert, percentage_alert, percentage_window
- **user_settings** _(retention: persistent)_ — User's alert and notification settings
  - fields: alert_types, quiet_hours_start, quiet_hours_end, summary_enabled, summary_time
- **price_records** _(retention: session)_ — Price history for percentage-change calculations
  - fields: ticker, timestamp, price
- **alert_cooldowns** _(retention: session)_ — Cooldown state per user/ticker to avoid spam
  - fields: user_id, ticker, last_alert_time
- **user_stats** _(retention: persistent)_ — Usage statistics for owner view
  - fields: total_users, total_alerts_sent
- **alert_stats** _(retention: persistent)_ — Top alerted coins for owner view
  - fields: ticker, alert_count

## Integrations

- **Telegram** (required) — Bot API messaging
- **CoinGecko** (required) — Fetch current crypto prices
Call external APIs against their real contract (correct endpoints, ids, params); credentials from env. Do not fake responses.

## Owner controls

- View usage statistics
- View top alerted coins
- View total alerts sent

## Notifications

- Price threshold alerts
- Percentage move alerts
- Morning summary
- Error messages for invalid tickers

## Permissions & privacy

- User watchlist is private and not shared with other users
- User settings are private and not shared with other users
- Owner view is restricted to bot owner only
- Price history is stored temporarily for percentage-change calculations
- Alert cooldowns are stored temporarily to avoid spam

## Edge cases

- Invalid ticker symbol
- Ticker not found in price API
- User tries to add duplicate ticker
- User tries to remove ticker not in watchlist
- User sets invalid quiet hours
- User sets summary time outside valid range
- Price API unavailable
- Alert cooldown prevents duplicate alerts
- User has no tickers in watchlist
- User has no alert types configured

## Required tests

- Add ticker to watchlist
- Remove ticker from watchlist
- Display watchlist
- On-demand price check
- Configure alerts
- Set quiet hours
- Configure morning summary
- Alert processing for threshold alerts
- Alert processing for percentage move alerts
- Morning summary delivery
- Owner stats view
- Error handling for invalid tickers
- Error handling for API unavailability

## Assumptions

- Price API: CoinGecko (free, no API key required for basic usage)
- Alert cooldown: 1 hour after an alert fires before re-alerting the same coin
- Quiet hours default: 22:00 to 08:00 (10pm to 8am)
- Morning summary default: disabled (user must enable)
- Percentage window: 1 hour
- Owner view: shows total users, top 10 most-alerted coins, total alerts sent
