=== OpenStreetMap for Gutenberg and WPBakery Page Builder (formerly Visual Composer) ===
Author: Step-Byte-Service GmbH
Author URI: https://www.step-byte-service.com
Contributors: stepbyteservice
Tags: maps, openstreetmap, gutenberg, wpbakery page builder, leaflet, visual composer, tiles, geosearch, marker, content element, block, shortcode
Requires at least: 4.0
Tested up to: 5.3
Requires PHP: 5.3
Stable tag: 1.0.7
License: GPLv2
License URI: http://www.gnu.org/licenses/gpl-2.0.txt

OpenStreetMap Gutenberg block, WPBakery PageBuilder content element and standalone WordPress shortcode

== Description ==

Add beautiful maps to your Wordpress pages with ease. Customize location, map styles, marker and more. Include the map as Gutenberg block, WPBakery Page Builder (formerly Visual Composer) content element or shortcode. **No API keys required.**

== Installation ==

**Notes:**
* the Gutenberg block requires WordPress 5 or higher or an active Gutenberg plugin
* the WPBakery Page Builder content element requires an active [WPBakery Page Builder](https://wpbakery.com) plugin

1. Upload the StepByteService OpenStreetMap plugin to the '/wp-content/plugins' directory.
2. Activate the plugin.
3. Use one of the components to add maps to your pages.

== General Settings ==

This plugin comes with sane predefined settings. Adjust them to your liking. The marker is optional and is not displayed by default.

= Map Settings =
**Map Style** Choose the style of the map from one of the available map tile providers to fit your needs.
**Map Height in Relation to Width** Change the map's aspect ratio. Works nicely with responsive designs.
**Zoom Level** Change the view distance. The higher the number, the closer the distance to the map. (Note: not all styles support all zoom levels).
**Zoom With CTRL-Key Only** Prevent zooming during page scroll.
**Latitude/Longitude of the Map's Center** Specify the map's center position. Only needed if no marker configured or marker is not set to center the map.
**Show Attribution** Display or hide attribution for map styles and data. If you disable the checkbox please consider the legal circumstances.

= Marker Settings =
**Determine Position By** Choose if you want to specify the marker position by an address or coordinates. The marker appears only if you specify an address or coordinates.
**Address** Insert the marker's address here with comma separated address parts (only used if you have choosen 'Address' in previous setting).
**Latitude/Longitude** Specify marker position with latitude and longitude data (only used if you have chosen 'Coordinates' in first setting).
**Center Map on Marker** If checked, the map is centered by the marker. Latitude and Longitude from map settings are ignored with this option active.
**Icon** The icon to appear on the marker. Subset from [Material Icons](https://material.io/resources/icons/?style=outline) in outlined style (available categories: Maps, Places, Social).
**Marker Color** Color of the background of the marker.
**Popup Text** Content of the popup that appears if the user clicks on the marker.

== Gutenberg ==

The block is located in the 'Embed' category and supports the wide and full width options.

== WPBakery Page Builder ==

The content element can be found on the 'Content' tab with the name 'SBS OpenStreetMap'.

== Shortcode ==

The shortcode for the map plugin is `[sbs_openstreetmap]`. If parameters are not specified, the defaults are used (the same as in the other components). The popup text for the marker can be specified between the opening and closing shortcode tags.

= Parameters =
See section 'General Settings' for description. Name in parentheses is the entry there. 

**map_style** (Map Style) Available values:
*wikimedia* Wikimedia (default)
*openstreetmap_de* OpenStreetMap DE
*opentopomap* OpenTopoMap
*stamen_toner* Stamen Toner
*stamen_toner_light* Stamen Toner Light
*stamen_terrain* Stamen Terrain
*stamen_watercolor* Stamen Watercolor
**map_height** (Map Height in Relation to Width) Use a number as percentage of the width. Default value is 50.
**zoom** (Zoom Level) Number between 0 and 20. Default value is 15.
**ctrl_mouse_zoom** (Zoom With CTRL-Key Only) Set to true or false. Default is false.
**latitude** (Latitude of the Map's Center)
**longitude** (Longitude of the Map's Center)
**show_attribution** (Show Attribution) Set to true or false. Default is true.
**marker_source** (Determine Position By) Available values:
*address* (default)
*coordinates*
**marker_address** (Address)
**marker_latitude** (Latitude)
**marker_longitude** (Longitude)
**marker_center** (Center Map on Marker) Set to true or false. Default is true.
**marker_icon** (Icon) CSS classes for the icon. Go to the Material Icon website and choose your desired icon. To get the CSS classes, use the icon's name, replace the underscore with a hyphen and prepend 'sbs-map-icon sbs-map-'. Example: icon 'local_airport' becomes to 'sbs-map-icon sbs-map-local-airport'
**marker_color** (Marker Color) Available values:
*red*
*white*
*dark_blue* (default)
*green*
*black*
*orange*
*yellow*

**Examples:**

`[sbs_openstreetmap][/sbs_openstreetmap]`

Uses default values

`[sbs_openstreetmap marker_source="coordinates" marker_center="true" marker_color="green" marker_latitude="52.4679888" marker_longitude="13.3257928" marker_icon="sbs-map-icon sbs-map-my-location"][/sbs_openstreetmap]`

Green marker from coordinates with my_location icon, centered map at marker and no popup text

`[sbs_openstreetmap map_style="stamen_terrain" map_height="30" zoom="14" ctrl_mouse_zoom="true" marker_center="true" marker_color="dark_blue" marker_address="Bundesallee 87, 12161 Berlin" marker_icon="sbs-map-icon sbs-map-beenhere"]Popup Text[/sbs_openstreetmap]`

Stamen Terrain style, dark blue marker from address with popup text

== Licenses/Policies ==

= External Services =
**Provides the map data**
OpenStreetMap [ODbL](https://www.openstreetmap.org/copyright)
**Used to search the address for the marker with Leaflet GeoSearch component**
OpenStreetMap Nominatim GeoSearch [Usage policy](https://operations.osmfoundation.org/policies/nominatim/)
**Providers used for choosable map styles**
Wikimedia [Terms of use](https://foundation.wikimedia.org/wiki/Maps_Terms_of_Use)
OpenStreetMap DE [Terms of use](https://www.openstreetmap.de/germanstyle.html)
OpenTopoMap [CC-BY-SA/Terms of use](https://opentopomap.org/about)
Stamen [CC BY 3.0/Terms of use](http://maps.stamen.com)

= Third-Party Components =
Leaflet JS [BSD 2-Clause "Simplified" License](https://github.com/Leaflet/Leaflet/blob/master/LICENSE)
Leaflet.GestureHandling [MIT License](https://github.com/elmarquis/Leaflet.GestureHandling/blob/master/LICENSE)
Leaflet.GeoSearch [MIT License](https://github.com/smeijer/leaflet-geosearch/blob/develop/LICENSE)
**Only used in Gutenberg Editor**
React FontIconPicker [MIT License](https://github.com/fontIconPicker/react-fonticonpicker/blob/master/LICENSE)
prop-types [MIT License](https://github.com/facebook/prop-types/blob/master/LICENSE)
Classnames [MIT License](https://github.com/JedWatson/classnames/blob/master/LICENSE)
react-transition-group [BSD 3-Clause License](https://github.com/reactjs/react-transition-group/blob/master/LICENSE)

== Screenshots ==

1. Multiple map styles
2. WPBakery Page Builder
3. Gutenberg

== Frequently Asked Questions ==

= The map does not show properly =

If there are graphical errors, first check if a different zoom level changes anything. Not all map styles support all zoom levels and while most should just show a different zoom level if they don't support the chosen one, there might be parts of the map which are not shown on other styles.
In case the map is placed on a container that is not visible initially (f.e. using tabs or accordions), you'll have to trigger the event `invalidate.sbs.openstreetmap` in JavaScript once the element becomes visible to redraw the map. If you're using Bootstrap or WP Bakery Page Builder tabs or accordions, this is handled by the plugin itself.

== Changelog ==

= 1.0.7 =
* Fixed check for WPBakery Page Builder events

= 1.0.6 =
* Fixed marker

= 1.0.5 =
* Internet Explorer 11 fixes

= 1.0.4 =
* Fixed marker icon selection in WPBakery Page Builder backend editor

= 1.0.3 =
* Fixed notice in WordPress debug mode

= 1.0.2 =
* Improved asset loading
* Fixed WPBakery Page Builder frontend editing

= 1.0.0 =
* Initial release
