local wezterm = require 'wezterm'
local act = wezterm.action
local mux = wezterm.mux
local opacity = 0.86

-- local config = wezterm.cnfig_builder()

local config = {
  automatically_reload_config = true,
  background = {
    {
      source = {
        File = { path = os.getenv("HOME") .. "/Pictures/Wallpapers/bat.jpeg"}
        -- File = { path = os.getenv("HOME") .. "/Pictures/BingWallpaper/1kyuarpkiu191.jpg"}
        -- File = { path = os.getenv("HOME") .. "/Pictures/BingWallpaper/DolomitesSky.jpg"}
      },
      height = "Cover",
      width = "Cover",
      horizontal_align = "Center",
      repeat_x = "Repeat",
      repeat_y = "Repeat",
      -- attachment = { Parallax = 0.1 }, -- scroll the bg image at the rate of 1:10
      opacity = 1,
    },
    {
      source = {
        Gradient = {
          colors =  { "#111", "#444", "#222", "#000"},
          -- preset = "Greys", 
          -- orientation = { Linear = { angle = -40 }},
          orientation = { Radial = { radius = .00 }},
        },
      },
      width = "100%",
      height = "100%",
      -- attachment = { Parallax = 0.1 }, -- scroll the bg image at the rate of 1:10
      opacity = opacity,
    },
  },
  enable_tab_bar = true,
  tab_bar_at_bottom = true,
  use_fancy_tab_bar = true,
  font = wezterm.font_with_fallback({
  { family ="Monego Ligatures",  weight = "Bold" },
  -- { family = "agave Nerd Font Mono", weight = "Regular"},
  -- { family = "Operator Mono Lig", weight = "Bold"},
  }),
  font_size = 14,
  -- line_height = 1.02,
  -- command_palette_font = wezterm.font("Monego Ligatures"),
  command_palette_font_size = 11.0,
  -- command_palette_fg_color = "#ffa500",
  freetype_load_target = "Light",
  freetype_render_target = "HorizontalLcd",
  color_scheme = "BirdsOfParadise",
  default_cursor_style = "BlinkingBar",
  cursor_thickness = "1.5pt",
  -- term = "xterm-256color",
  window_decorations = "RESIZE",
  -- window_background_opacity = 0,
  window_padding = {
    left = 20,
    right = 25,
    top = 10,
    bottom = 5,
  },
  colors = {
    cursor_bg = "#94b4da",
    cursor_fg = "#1a1a2e",
    selection_bg = "orange",
    selection_fg = "black",
  },
	window_frame = {
		font = wezterm.font({ family = "Audiowide", weight = "Bold" }),
		-- font = wezterm.font({ family = "Orbitron", weight = "Bold" }),
		font_size = 12.0,
	},
	quick_select_patterns = {
		  -- match things that look like sha1 hashes
		  -- (this is actually one of the default patterns)
		  -- '(?:[a-zA-Z_0-9.-]+)',
		  '[a-fA-F0-9]{7,40}',
		  'https?://\\S+',
		  '(?:[0-9]+)',
	},
  keys = {
		{ key = 'p', mods = 'SUPER', action = act.ActivateCommandPalette },
		{ key = '/', mods = 'ALT', action = act.ActivateLastTab },
		{ key = 'h', mods = 'ALT|SHIFT', action = act.ActivateTabRelative(-1) },
		{ key = 'l', mods = 'ALT|SHIFT', action = act.ActivateTabRelative(1) },
		{ key = 'j', mods = 'ALT', action = act.ActivatePaneDirection 'Down' },
		{ key = 'k', mods = 'ALT', action = act.ActivatePaneDirection 'Up' },
		{ key = 'h', mods = 'ALT', action = act.ActivatePaneDirection 'Left' },
		{ key = 'l', mods = 'ALT', action = act.ActivatePaneDirection 'Right' },
		{ key = '|', mods = 'ALT|SHIFT', action = act.SplitHorizontal { domain = 'CurrentPaneDomain' }},
		{ key = 'n', mods = 'ALT', action = act.SplitHorizontal { domain = 'CurrentPaneDomain' }},
		{ key = '-', mods = 'ALT', action = act.SplitVertical { domain = 'CurrentPaneDomain' }},
		{ key = 'j', mods = 'CTRL', action = act.ShowTabNavigator, },
		{ key = 't', mods = 'ALT', action = act.SpawnTab 'CurrentPaneDomain', },
		{ key = 'u', mods = 'CTRL|ALT', action = act.ScrollByPage(-1) },
		{ key = 'd', mods = 'CTRL|ALT', action = act.ScrollByPage(1) },
		{ key = 'UpArrow',  mods = 'OPT', action = act.AdjustPaneSize { 'Up', 5 } },
		{ key = 'DownArrow',  mods = 'OPT', action = act.AdjustPaneSize { 'Down', 5 } },
		{ key = 'LeftArrow',  mods = 'OPT', action = act.AdjustPaneSize { 'Left', 5 } },
		{ key = 'RightArrow',  mods = 'OPT', action = act.AdjustPaneSize { 'Right', 5 } },
		{ key = 'x', mods = 'CTRL', action = act.ActivateCopyMode },
    { key = 'f', mods = 'ALT|SHIFT', action = act.TogglePaneZoomState },
		{ key = ';', mods = 'ALT', action = act.QuickSelectArgs },
		{
		  key = '0',
		  mods = 'ALT',
		  action = wezterm.action.PaneSelect {
		    alphabet = '1234567890',
		  },
		},
		{
	    key = 'r',
	    mods = 'ALT',
	    action = act.PromptInputLine {
	    	description = wezterm.format {
	        { Attribute = { Intensity = 'Bold' } },
	        { Text = 'Enter new name for this tab: ' },
	      },
	      action = wezterm.action_callback(function(window, pane, line)
	        -- 'line' will be nil if they hit escape without entering anything
	        -- An empty string if they just hit enter
	        -- Or the actual line of text they wrote
	        if line then
	          window:active_tab():set_title(line)
	        end
	      end),
	    },
	  },
  },
}


if not wezterm.GLOBAL.current_opacity then
  wezterm.GLOBAL.current_opacity = config.background[1].opacity
end

wezterm.on("toggle-opacity", function(window, pane)
    local overrides = window:get_config_overrides() or {}
    if wezterm.GLOBAL.current_opacity == 1.0 then
      wezterm.GLOBAL.current_opacity = opacity
    else
      wezterm.GLOBAL.current_opacity = opacity
    end

  wezterm.log_info("current value of overrides" .. tostring(overrides))
    overrides.background[1].opacity = wezterm.GLOBAL.current_opacity
    window:set_config_overrides(overrides)
end)

wezterm.on("gui-startup", function()
  local tab, pane, window = mux.spawn_window{}
  window:gui_window():maximize()
end)

wezterm.on('format-tab-title', function(tab, tabs, panes, config, hover, max_width)
	local title = tab.tab_title
	if not title or #title == 0 then
    title = tab.active_pane.title
  -- else
  --   title = " " .. tab.tab_index + 1 .. ": " .. tab.active_pane.title .. " "
  end

  local background = '#333333'
  local foreground = '#aeaeae'

  if tab.is_active then
    background = '#4fd6be' -- Zellij active green/teal
    foreground = '#1a1b26'
  elseif hover then
    background = '#3b4261'
    foreground = '#eeebe3'
  end


  return {
    { Background = { Color = background } },
    { Foreground = { Color = foreground } },
    { Text = "  " .. tab.tab_index + 1 .. ": " .. title .. "  " },
  }
end)

wezterm.on('update-right-status', function(window, pane)
  local cells = {}

  table.insert(cells, { Foreground = { Color = '#FFA500' }})
  table.insert(cells, { Text = ' ' .. wezterm.strftime('%a %b %d') .. ' ' })

  table.insert(cells,  { Foreground = { Color = '#444b6a' } })
  table.insert(cells, { Text = ' | ' })

  table.insert(cells, { Foreground = { Color = '#4fd6be'}})
  table.insert(cells,  { Text = ' ' .. wezterm.strftime('%I : %M %p ') .. ' ' }) -- Clock on the right

  for _, b in ipairs(wezterm.battery_info()) do
    local pct = math.floor(b.state_of_charge * 100)
    local color = '#a6de31'
    if pct < 20 then color = '#f7768e' end
    local icon = '󰁹'
    if b.state == 'Charging' then icon = '󱐋' end
    table.insert(cells, { Foreground = { Color = '#444b6a' } })
    table.insert(cells, { Text = ' | ' })
    table.insert(cells, { Foreground = { Color = color } })
    table.insert(cells, { Text = icon .. ' ' .. pct .. '%'  .. ' '})
  end
  window:set_right_status(wezterm.format(cells))
end)

return config
