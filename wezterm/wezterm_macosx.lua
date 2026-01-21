--
-- ██╗    ██╗███████╗███████╗████████╗███████╗██████╗ ███╗   ███╗
-- ██║    ██║██╔════╝╚══███╔╝╚══██╔══╝██╔════╝██╔══██╗████╗ ████║
-- ██║ █╗ ██║█████╗    ███╔╝    ██║   █████╗  ██████╔╝██╔████╔██║
-- ██║███╗██║██╔══╝   ███╔╝     ██║   ██╔══╝  ██╔══██╗██║╚██╔╝██║
-- ╚███╔███╔╝███████╗███████╗   ██║   ███████╗██║  ██║██║ ╚═╝ ██║
--  ╚══╝╚══╝ ╚══════╝╚══════╝   ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝
-- A GPU-accelerated cross-platform terminal emulator
-- https://wezfurlong.org/wezterm/


local dark_opacity = 0.85
local light_opacity = 0.9

local wallpapers_glob = os.getenv("HOME")
	.. "/Pictures/wallpapers/**"

local b = require("utils/background")
local cs = require("utils/color_scheme")
local h = require("utils/helpers")
local k = require("utils/keys")
local w = require("utils/wallpaper")

local wezterm = require("wezterm")
local act = wezterm.action

wezterm.on('gui-startup', function(spawn_window)
  local _, _, window = wezterm.mux.spawn_window(spawn_window or {})
  -- Choose one of the following:
  window:gui_window():toggle_fullscreen() -- Option A: True Fullscreen (New Space)
  -- window:gui_window():maximize()       -- Option B: Just fill the screen
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

---@type Config
local config = {
	background = {
		w.get_wallpaper(wallpapers_glob),
		b.get_background(dark_opacity, light_opacity),
	},

	font_size = 16,

	-- general options
	-- line_height = 1.02,
	font = wezterm.font_with_fallback({
		-- "Monoid",
		-- "UbuntuMono Nerd Font Mono",
		-- "Monofoki",
		-- "Fira Code Retina",
		-- "Hasklug Nerd Font",
		-- "MonoLisa",
		-- { family = "Orbitron", weight = "Bold" },
		-- { family = "Maple Mono", weight = "Bold"},
		-- { family = "Maple Mono NF ExtraBold", weight = "Bold"},
		-- { family = "Iosevka", weight = "Bold"},
		-- { family = "Victor Mono", weight = "Bold"},
		-- { family = "Monaspace Argon NF", weight = "Medium"}
		-- { family = "Intel One Mono", weight = "Medium" }
		{ family = "Monego Ligatures", weight = "Bold",  },
		-- "agave Nerd Font Mono",
		-- { family = "Monaco", weight="Bold" },
		-- { family = "Consolas", weight="Bold", },
		-- 
		-- "Source Code Pro",
		-- { family = "MesloLGS Nerd Font Mono", weight="Bold"},
	}),

	-- default_cursor_style = "SteadyBar",
	-- default_cursor_style = "BlinkingBar",
	-- default_cursor_style = "BlinkingBlock",
	default_cursor_style = "SteadyBlock",
	-- default_cursor_style = "SteadyUnderline",
	-- cursor_blink_rate = 100,
	cursor_thickness = "2pt",

	set_environment_variables = {
		BAT_THEME = h.is_dark() and "iTerm2 Solarized Dark" or "iTerm2 Solarized Light",
		LC_ALL = "en_US.UTF-8",
		-- TODO: audit what other variables are needed
	},

	color_scheme = cs.get_color_scheme(),
	colors = {
		-- foreground = "#FFA500",
		selection_bg = "#ffa500",
		selection_fg = "black",
		-- cursor_bg = "cyan",
    cursor_bg = "#ffa500",
		cursor_fg = "black",
		cursor_border = "#52ad70",
	},


	window_padding = {
		left = 20,
		right = 10,
		top = 20,
		bottom = 10,
	},


	adjust_window_size_when_changing_font_size = false,
	debug_key_events = false,
	enable_tab_bar = true,
	enable_scroll_bar = true,
	tab_bar_at_bottom = true,
	use_fancy_tab_bar = true,
	tab_max_width = 32,
	native_macos_fullscreen_mode = false,
	window_close_confirmation = "NeverPrompt",
	window_decorations = "RESIZE",
	window_background_opacity = 0.9,
	macos_window_background_blur = 20,
	-- for tab-bar customization
	window_frame = {
		-- font = wezterm.font({ family = "Orbitron", weight = "Bold" }),
		font = wezterm.font({ family = "Audiowide", weight = "Bold" }),
		font_size = 13.0,
	},
	quick_select_patterns = {
		  -- match things that look like sha1 hashes
		  -- (this is actually one of the default patterns)
		  -- '(?:[a-zA-Z_0-9.-]+)',
		  '[a-fA-F0-9]{7,40}',
		  'https?://\\S+',
		  '(?:[0-9]+)',
	},
	
	-- command_palette_font = wezterm.font 'Monaco',
	command_palette_font_size = 13,
	-- command_palette_rows = 18,
	send_composed_key_when_left_alt_is_pressed = false,
	-- keys
	keys = {
		-- k.cmd_key(".", k.multiple_actions(":ZenMode")),
		-- k.cmd_key("[", act.SendKey({ mods = "CTRL", key = "o" })),
		-- k.cmd_key("]", act.SendKey({ mods = "CTRL", key = "i" })),
		k.cmd_key("w", act.CloseCurrentPane { confirm = true }),
		{ key = '/', mods = 'OPT', action = act.ActivateLastTab },
		{ key = 'h', mods = 'OPT|SHIFT', action = act.ActivateTabRelative(-1) },
		{ key = 'l', mods = 'OPT|SHIFT', action = act.ActivateTabRelative(1) },
		{ key = 'j', mods = 'OPT', action = act.ActivatePaneDirection 'Down' },
		{ key = 'k', mods = 'OPT', action = act.ActivatePaneDirection 'Up' },
		{ key = 'h', mods = 'OPT', action = act.ActivatePaneDirection 'Left' },
		{ key = 'l', mods = 'OPT', action = act.ActivatePaneDirection 'Right' },
		{ key = '|', mods = 'OPT|SHIFT', action = act.SplitHorizontal { domain = 'CurrentPaneDomain' }},
		{ key = 'n', mods = 'OPT', action = act.SplitHorizontal { domain = 'CurrentPaneDomain' }},
		{ key = '-', mods = 'OPT', action = act.SplitVertical { domain = 'CurrentPaneDomain' }},
		{ key = 'j', mods = 'CMD', action = act.ShowTabNavigator, },
		-- { key = 'i', mods = 'OPT', action = act.ShowLauncher },
		{ key = ';', mods = 'OPT', action = act.QuickSelectArgs },
		{ key = 'p', mods = 'CMD', action = act.ActivateCommandPalette },
		{ key = 'UpArrow',  mods = 'OPT', action = act.AdjustPaneSize { 'Up', 5 } },
		{ key = 'DownArrow',  mods = 'OPT', action = act.AdjustPaneSize { 'Down', 5 } },
		{ key = 'LeftArrow',  mods = 'OPT', action = act.AdjustPaneSize { 'Left', 5 } },		
		{ key = 'RightArrow',  mods = 'OPT', action = act.AdjustPaneSize { 'Right', 5 } },		
		{ key = 'x', mods = 'CTRL', action = act.ActivateCopyMode },
		{ key = 'u', mods = 'CMD', action = act.ScrollByPage(-1) },
		{ key = 'd', mods = 'CMD', action = act.ScrollByPage(1) },
		{ key = "f", mods = 'OPT|SHIFT', action = act.TogglePaneZoomState },
		{
		  key = '0',
		  mods = 'OPT',
		  action = wezterm.action.PaneSelect {
		    alphabet = '1234567890',
		  },
		},
		{
	    key = 'r',
	    mods = 'OPT',
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

return config
