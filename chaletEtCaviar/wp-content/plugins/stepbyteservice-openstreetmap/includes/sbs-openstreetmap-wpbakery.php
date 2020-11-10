<?php

if (!defined('WPINC')) {
    die;
}

if (!class_exists('SBS_OpenStreetMap_WPBakery')) {

    /**
     * WPBakery Page Builder content element
     */
    class SBS_OpenStreetMap_WPBakery extends SBS_OpenStreetMap_Base {

        /**
         * Constructor
         */
        public function __construct() {
            parent::__construct();
            add_action('vc_before_init', array($this, 'register_module'));
            add_action('vc_before_init_backend_editor', array($this, 'enqueue_assets'));
            add_action('vc_load_iframe_jscss', array($this, 'enqueue_assets'));
            add_filter('vc_iconpicker-type-sbs-map-icons', array($this, 'iconpicker_sbs_map_icons'));
        }

        /**
         * Enqueue assets if needed
         */
        public function check_enqueue_assets() {
            $post = parent::check_enqueue_assets();
            if (!is_null($post) && has_shortcode($post->post_content, 'sbs_wpb_openstreetmap'))
                $this->enqueue_assets();
        }

        /**
         * Register module with specified parameters
         */
        public function register_module() {
            $defaults = parent::merge_default_attributes(array());
            vc_map(array(
                'name' => __('SBS OpenStreetMap', 'sbs-wp-openstreetmap'),
                'base' => 'sbs_wpb_openstreetmap',
                'category' => esc_html__('Content', 'js_composer'),
                'description' => __('Configurable OpenStreetMap module', 'sbs-wp-openstreetmap'),
                'icon' => plugin_dir_url(__FILE__) . '../assets/icons/sbs-openstreetmap-icon.png',
                'params' => array(
                    array(
                        'type' => 'dropdown',
                        'edit_field_class' => 'vc_col-sm-6',
                        'heading' => __('Map Style', 'sbs-wp-openstreetmap'),
                        'param_name' => 'map_style',
                        'group' => __('Map', 'sbs-wp-openstreetmap'),
                        'value' => array(
                            'Wikimedia' => 'wikimedia',
                            'OpenStreetMap DE' => 'openstreetmap_de',
                            'Open Topo Map' => 'opentopomap',
                            'Stamen Toner' => 'stamen_toner',
                            'Stamen Toner Light' => 'stamen_toner_light',
                            'Stamen Terrain' => 'stamen_terrain',
                            'Stamen Watercolor' => 'stamen_watercolor')
                    ),
                    array(
                        'type' => 'dropdown',
                        'edit_field_class' => 'vc_col-sm-6',
                        'heading' => __('Map Height in Relation to Width', 'sbs-wp-openstreetmap'),
                        'param_name' => 'map_height',
                        'group' => __('Map', 'sbs-wp-openstreetmap'),
                        'value' => array(
                            '20%' => '20',
                            '30%' => '30',
                            '50%' => '50',
                            '60%' => '60',
                            '100%' => '100'
                        ),
                        'std' => $defaults['map_height'],
                    ),
                    array(
                        'type' => 'dropdown',
                        'edit_field_class' => 'vc_col-sm-6',
                        'heading' => __('Zoom Level', 'sbs-wp-openstreetmap'),
                        'param_name' => 'zoom',
                        'group' => __('Map', 'sbs-wp-openstreetmap'),
                        'value' => array(
                            '10' => '10',
                            '11' => '11',
                            '12' => '12',
                            '13' => '13',
                            '14' => '14',
                            '15' => '15',
                            '16' => '16',
                            '17' => '17',
                            '18' => '18',
                            '19' => '19',
                            '20' => '20'
                        ),
                        'std' => $defaults['zoom'],
                    ),
                    array(
                        'type' => 'checkbox',
                        'edit_field_class' => 'vc_col-sm-6',
                        'heading' => __('Zoom With CTRL-Key Only', 'sbs-wp-openstreetmap'),
                        'param_name' => 'ctrl_mouse_zoom',
                        'group' => __('Map', 'sbs-wp-openstreetmap'),
                        'value' => array(
                            __('Yes', 'sbs-wp-openstreetmap') => 'true'
                        ),
                        'std' => $defaults['ctrl_mouse_zoom']
                    ),
                    array(
                        'type' => 'textfield',
                        'heading' => __("Latitude of the Map's Center", 'sbs-wp-openstreetmap'),
                        'param_name' => 'latitude',
                        'description' => __('Only needed if marker is not the center of the map', 'sbs-wp-openstreetmap'),
                        'group' => __('Map', 'sbs-wp-openstreetmap')
                    ),
                    array(
                        'type' => 'textfield',
                        'heading' => __("Longitude of the Map's Center", 'sbs-wp-openstreetmap'),
                        'param_name' => 'longitude',
                        'description' => __('Only needed if marker is not the center of the map', 'sbs-wp-openstreetmap'),
                        'group' => __('Map', 'sbs-wp-openstreetmap')
                    ),
                    array(
                        'type' => 'checkbox',
                        'heading' => __('Show Attribution', 'sbs-wp-openstreetmap'),
                        'param_name' => 'show_attribution',
                        'description' => __('Attributions for content providers are shown as links on the bottom right corner of the map. If you disable the checkbox please consider the legal circumstances.', 'sbs-wp-openstreetmap'),
                        'group' => __('Map', 'sbs-wp-openstreetmap'),
                        'value' => array(
                            __('Yes', 'sbs-wp-openstreetmap') => 'true'
                        ),
                        'std' => $defaults['show_attribution']
                    ),
                    array(
                        'type' => 'dropdown',
                        'admin_label' => true,
                        'heading' => __('Determine Position By', 'sbs-wp-openstreetmap'),
                        'param_name' => 'marker_source',
                        'group' => __('Marker', 'sbs-wp-openstreetmap'),
                        'value' => array(
                            __('Address', 'sbs-wp-openstreetmap') => 'address',
                            __('Coordinates', 'sbs-wp-openstreetmap') => 'coordinates'
                        ),
                        'std' => $defaults['marker_source']
                    ),
                    array(
                        'type' => 'textfield',
                        'admin_label' => true,
                        'heading' => __('Address', 'sbs-wp-openstreetmap'),
                        'param_name' => 'marker_address',
                        'dependency' => array('element' => 'marker_source', 'value' => 'address'),
                        'group' => __('Marker', 'sbs-wp-openstreetmap')
                    ),
                    array(
                        'type' => 'textfield',
                        'admin_label' => true,
                        'edit_field_class' => 'vc_col-sm-6',
                        'heading' => __('Latitude', 'sbs-wp-openstreetmap'),
                        'param_name' => 'marker_latitude',
                        'dependency' => array('element' => 'marker_source', 'value' => 'coordinates'),
                        'group' => __('Marker', 'sbs-wp-openstreetmap')
                    ),
                    array(
                        'type' => 'textfield',
                        'admin_label' => true,
                        'edit_field_class' => 'vc_col-sm-6',
                        'heading' => __('Longitude', 'sbs-wp-openstreetmap'),
                        'param_name' => 'marker_longitude',
                        'dependency' => array('element' => 'marker_source', 'value' => 'coordinates'),
                        'group' => __('Marker', 'sbs-wp-openstreetmap')
                    ),
                    array(
                        'type' => 'checkbox',
                        'heading' => __('Center Map on Marker', 'sbs-wp-openstreetmap'),
                        'param_name' => 'marker_center',
                        'group' => __('Marker', 'sbs-wp-openstreetmap'),
                        'value' => array(
                            __('Yes', 'sbs-wp-openstreetmap') => 'true'
                        ),
                        'std' => $defaults['marker_center']
                    ),
                    array(
                        'type' => 'iconpicker',
                        'edit_field_class' => 'vc_col-sm-6',
                        'heading' => __('Marker icon', 'sbs-wp-openstreetmap'),
                        'param_name' => 'marker_icon',
                        'settings' => array(
                            'type' => 'sbs-map-icons',
                        ),
                        'group' => __('Marker', 'sbs-wp-openstreetmap')
                    ),
                    array(
                        'type' => 'dropdown',
                        'edit_field_class' => 'vc_col-sm-6',
                        'heading' => __('Marker Color', 'sbs-wp-openstreetmap'),
                        'param_name' => 'marker_color',
                        'group' => __('Marker', 'sbs-wp-openstreetmap'),
                        'value' => array(
                            __('Red', 'sbs-wp-openstreetmap') => 'red',
                            __('White', 'sbs-wp-openstreetmap') => 'white',
                            __('Blue', 'sbs-wp-openstreetmap') => 'dark_blue',
                            __('Green', 'sbs-wp-openstreetmap') => 'green',
                            __('Black', 'sbs-wp-openstreetmap') => 'black',
                            __('Orange', 'sbs-wp-openstreetmap') => 'orange',
                            __('Yellow', 'sbs-wp-openstreetmap') => 'yellow'
                        ),
                        'std' => $defaults['marker_color']
                    ),
                    array(
                        'type' => 'textarea_html',
                        'heading' => __('Popup Text', 'sbs-wp-openstreetmap'),
                        'param_name' => 'content',
                        'group' => __('Marker', 'sbs-wp-openstreetmap')
                    ),
                )
            ));
        }

        /**
         * Add Material icons to list for iconpicker
         * 
         * @param array $icons
         * @return array
         */
        public function iconpicker_sbs_map_icons($icons) {
            $sbs_map_icons = array(
                array('sbs-map-icon sbs-map-360' => '360'),
                array('sbs-map-icon sbs-map-ac-unit' => 'AC Unit'),
                array('sbs-map-icon sbs-map-airport-shuttle' => 'Airport Shuttle'),
                array('sbs-map-icon sbs-map-all-inclusive' => 'All Inclusive'),
                array('sbs-map-icon sbs-map-apartment' => 'Apartment'),
                array('sbs-map-icon sbs-map-atm' => 'ATM'),
                array('sbs-map-icon sbs-map-bathtub' => 'Bathtub'),
                array('sbs-map-icon sbs-map-beach-access' => 'Beach Access'),
                array('sbs-map-icon sbs-map-beenhere' => 'Beenhere'),
                array('sbs-map-icon sbs-map-business-center' => 'Business Center'),
                array('sbs-map-icon sbs-map-cake' => 'Cake'),
                array('sbs-map-icon sbs-map-casino' => 'Casino'),
                array('sbs-map-icon sbs-map-category' => 'Category'),
                array('sbs-map-icon sbs-map-child-care' => 'Child Care'),
                array('sbs-map-icon sbs-map-child-friendly' => 'Child Friendly'),
                array('sbs-map-icon sbs-map-compass-calibration' => 'Compass Calibration'),
                array('sbs-map-icon sbs-map-deck' => 'Deck'),
                array('sbs-map-icon sbs-map-departure-board' => 'Departure Board'),
                array('sbs-map-icon sbs-map-directions' => 'Directions'),
                array('sbs-map-icon sbs-map-directions-bike' => 'Directions Bike'),
                array('sbs-map-icon sbs-map-directions-boat' => 'Directions Boat'),
                array('sbs-map-icon sbs-map-directions-bus' => 'Directions Bus'),
                array('sbs-map-icon sbs-map-directions-car' => 'Directions Car'),
                array('sbs-map-icon sbs-map-directions-railway' => 'Directions Railway'),
                array('sbs-map-icon sbs-map-directions-run' => 'Directions Run'),
                array('sbs-map-icon sbs-map-directions-subway' => 'Directions Subway'),
                array('sbs-map-icon sbs-map-directions-transit' => 'Directions Transit'),
                array('sbs-map-icon sbs-map-directions-walk' => 'Directions Walk'),
                array('sbs-map-icon sbs-map-edit-attributes' => 'Edit Attributes'),
                array('sbs-map-icon sbs-map-emoji-emotions' => 'Emoji Emotions'),
                array('sbs-map-icon sbs-map-emoji-events' => 'Emoji Events'),
                array('sbs-map-icon sbs-map-emoji-flags' => 'Emoji Flags'),
                array('sbs-map-icon sbs-map-emoji-food-beverage' => 'Emoji Food Beverage'),
                array('sbs-map-icon sbs-map-emoji-nature' => 'Emoji Nature'),
                array('sbs-map-icon sbs-map-emoji-objects' => 'Emoji Objects'),
                array('sbs-map-icon sbs-map-emoji-people' => 'Emoji People'),
                array('sbs-map-icon sbs-map-emoji-symbols' => 'Emoji Symbols'),
                array('sbs-map-icon sbs-map-emoji-transportation' => 'Emoji Transportation'),
                array('sbs-map-icon sbs-map-ev-station' => 'EV Station'),
                array('sbs-map-icon sbs-map-fastfood' => 'Fastfood'),
                array('sbs-map-icon sbs-map-fireplace' => 'Fireplace'),
                array('sbs-map-icon sbs-map-fitness-center' => 'Fitness Center'),
                array('sbs-map-icon sbs-map-flight' => 'Flight'),
                array('sbs-map-icon sbs-map-free-breakfast' => 'Free Breakfast'),
                array('sbs-map-icon sbs-map-golf-course' => 'Golf Course'),
                array('sbs-map-icon sbs-map-group' => 'Group'),
                array('sbs-map-icon sbs-map-group-add' => 'Group Add'),
                array('sbs-map-icon sbs-map-hot-tub' => 'Hot Tub'),
                array('sbs-map-icon sbs-map-hotel' => 'Hotel'),
                array('sbs-map-icon sbs-map-house' => 'House'),
                array('sbs-map-icon sbs-map-king-bed' => 'King Bed'),
                array('sbs-map-icon sbs-map-kitchen' => 'Kitchen'),
                array('sbs-map-icon sbs-map-layers' => 'Layers'),
                array('sbs-map-icon sbs-map-layers-clear' => 'Layers Clear'),
                array('sbs-map-icon sbs-map-local-activity' => 'Local Activity'),
                array('sbs-map-icon sbs-map-local-airport' => 'Local Airport'),
                array('sbs-map-icon sbs-map-local-atm' => 'Local ATM'),
                array('sbs-map-icon sbs-map-local-bar' => 'Local Bar'),
                array('sbs-map-icon sbs-map-local-cafe' => 'Local Cafe'),
                array('sbs-map-icon sbs-map-local-car-wash' => 'Local Car Wash'),
                array('sbs-map-icon sbs-map-local-convenience-store' => 'Local Convenience Store'),
                array('sbs-map-icon sbs-map-local-dining' => 'Local Dining'),
                array('sbs-map-icon sbs-map-local-drink' => 'Local Drink'),
                array('sbs-map-icon sbs-map-local-florist' => 'Local Florist'),
                array('sbs-map-icon sbs-map-local-gas-station' => 'Local Gas Station'),
                array('sbs-map-icon sbs-map-local-grocery-store' => 'Local Grocery Store'),
                array('sbs-map-icon sbs-map-local-hospital' => 'Local Hospital'),
                array('sbs-map-icon sbs-map-local-hotel' => 'Local Hotel'),
                array('sbs-map-icon sbs-map-local-laundry-service' => 'Local Laundry Service'),
                array('sbs-map-icon sbs-map-local-library' => 'Local Library'),
                array('sbs-map-icon sbs-map-local-mall' => 'Local Mall'),
                array('sbs-map-icon sbs-map-local-movies' => 'Local Movies'),
                array('sbs-map-icon sbs-map-local-offer' => 'Local Offer'),
                array('sbs-map-icon sbs-map-local-parking' => 'Local Parking'),
                array('sbs-map-icon sbs-map-local-pharmacy' => 'Local Pharmacy'),
                array('sbs-map-icon sbs-map-local-phone' => 'Local Phone'),
                array('sbs-map-icon sbs-map-local-pizza' => 'Local Pizza'),
                array('sbs-map-icon sbs-map-local-play' => 'Local Play'),
                array('sbs-map-icon sbs-map-local-post-office' => 'Local Post Office'),
                array('sbs-map-icon sbs-map-local-printshop' => 'Local Printshop'),
                array('sbs-map-icon sbs-map-local-see' => 'Local See'),
                array('sbs-map-icon sbs-map-local-shipping' => 'Local Shipping'),
                array('sbs-map-icon sbs-map-local-taxi' => 'Local Taxi'),
                array('sbs-map-icon sbs-map-location-city' => 'Location City'),
                array('sbs-map-icon sbs-map-map' => 'Map'),
                array('sbs-map-icon sbs-map-meeting-room' => 'Meeting Room'),
                array('sbs-map-icon sbs-map-menu-book' => 'Menu Book'),
                array('sbs-map-icon sbs-map-money' => 'Money'),
                array('sbs-map-icon sbs-map-mood' => 'Mood'),
                array('sbs-map-icon sbs-map-mood-bad' => 'Mood Bad'),
                array('sbs-map-icon sbs-map-museum' => 'Museum'),
                array('sbs-map-icon sbs-map-my-location' => 'My Location'),
                array('sbs-map-icon sbs-map-navigation' => 'Navigation'),
                array('sbs-map-icon sbs-map-near-me' => 'Near Me'),
                array('sbs-map-icon sbs-map-nights-stay' => 'Nights Stay'),
                array('sbs-map-icon sbs-map-no-meeting-room' => 'No Meeting Room'),
                array('sbs-map-icon sbs-map-notifications' => 'Notifications'),
                array('sbs-map-icon sbs-map-notifications-active' => 'Notifications Active'),
                array('sbs-map-icon sbs-map-notifications-none' => 'Notifications None'),
                array('sbs-map-icon sbs-map-notifications-off' => 'Notifications Off'),
                array('sbs-map-icon sbs-map-notifications-paused' => 'Notifications Paused'),
                array('sbs-map-icon sbs-map-outdoor-grill' => 'Outdoor Grill'),
                array('sbs-map-icon sbs-map-pages' => 'Pages'),
                array('sbs-map-icon sbs-map-party-mode' => 'Party Mode'),
                array('sbs-map-icon sbs-map-people' => 'People'),
                array('sbs-map-icon sbs-map-people-alt' => 'People Alt'),
                array('sbs-map-icon sbs-map-people-outline' => 'People Outline'),
                array('sbs-map-icon sbs-map-person' => 'Person'),
                array('sbs-map-icon sbs-map-person-add' => 'Person Add'),
                array('sbs-map-icon sbs-map-person-outline' => 'Person Outline'),
                array('sbs-map-icon sbs-map-person-pin' => 'Person Pin'),
                array('sbs-map-icon sbs-map-plus-one' => 'Plus One'),
                array('sbs-map-icon sbs-map-poll' => 'Poll'),
                array('sbs-map-icon sbs-map-pool' => 'Pool'),
                array('sbs-map-icon sbs-map-public' => 'Public'),
                array('sbs-map-icon sbs-map-rate-review' => 'Rate Review'),
                array('sbs-map-icon sbs-map-restaurant' => 'Restaurant'),
                array('sbs-map-icon sbs-map-restaurant-menu' => 'Restaurant Menu'),
                array('sbs-map-icon sbs-map-room-service' => 'Room Service'),
                array('sbs-map-icon sbs-map-rv-hookup' => 'RV Hookup'),
                array('sbs-map-icon sbs-map-satellite' => 'Satellite'),
                array('sbs-map-icon sbs-map-school' => 'School'),
                array('sbs-map-icon sbs-map-sentiment-dissatisfied' => 'Sentiment Dissatisfied'),
                array('sbs-map-icon sbs-map-sentiment-satisfied' => 'Sentiment Satisfied'),
                array('sbs-map-icon sbs-map-sentiment-very-dissatisfied' => 'Sentiment Very Dissatisfied'),
                array('sbs-map-icon sbs-map-sentiment-very-satisfied' => 'Sentiment Very Satisfied'),
                array('sbs-map-icon sbs-map-share' => 'Share'),
                array('sbs-map-icon sbs-map-single-bed' => 'Single Bed'),
                array('sbs-map-icon sbs-map-smoke-free' => 'Smoke Free'),
                array('sbs-map-icon sbs-map-smoking-rooms' => 'Smoking Rooms'),
                array('sbs-map-icon sbs-map-spa' => 'Spa'),
                array('sbs-map-icon sbs-map-sports' => 'Sports'),
                array('sbs-map-icon sbs-map-sports-baseball' => 'Sports Baseball'),
                array('sbs-map-icon sbs-map-sports-basketball' => 'Sports Basketball'),
                array('sbs-map-icon sbs-map-sports-cricket' => 'Sports Cricket'),
                array('sbs-map-icon sbs-map-sports-esports' => 'Sports Esports'),
                array('sbs-map-icon sbs-map-sports-football' => 'Sports Football'),
                array('sbs-map-icon sbs-map-sports-golf' => 'Sports Golf'),
                array('sbs-map-icon sbs-map-sports-handball' => 'Sports Handball'),
                array('sbs-map-icon sbs-map-sports-hockey' => 'Sports Hockey'),
                array('sbs-map-icon sbs-map-sports-kabaddi' => 'Sports Kabaddi'),
                array('sbs-map-icon sbs-map-sports-mma' => 'Sports MMA'),
                array('sbs-map-icon sbs-map-sports-motorsports' => 'Sports Motorsports'),
                array('sbs-map-icon sbs-map-sports-rugby' => 'Sports Rugby'),
                array('sbs-map-icon sbs-map-sports-soccer' => 'Sports Soccer'),
                array('sbs-map-icon sbs-map-sports-tennis' => 'Sports Tennis'),
                array('sbs-map-icon sbs-map-sports-volleyball' => 'Sports Volleyball'),
                array('sbs-map-icon sbs-map-store-mall-directory' => 'Store Mall Directory'),
                array('sbs-map-icon sbs-map-storefront' => 'Storefront'),
                array('sbs-map-icon sbs-map-streetview' => 'Streetview'),
                array('sbs-map-icon sbs-map-subway' => 'Subway'),
                array('sbs-map-icon sbs-map-terrain' => 'Terrain'),
                array('sbs-map-icon sbs-map-thumb-down-alt' => 'Thumb Down Alt'),
                array('sbs-map-icon sbs-map-thumb-up-alt' => 'Thumb Up Alt'),
                array('sbs-map-icon sbs-map-traffic' => 'Traffic'),
                array('sbs-map-icon sbs-map-train' => 'Train'),
                array('sbs-map-icon sbs-map-tram' => 'Tram'),
                array('sbs-map-icon sbs-map-transfer-within-a-station' => 'Transfer Within A Station'),
                array('sbs-map-icon sbs-map-transit-enterexit' => 'Transit Enterexit'),
                array('sbs-map-icon sbs-map-trip-origin' => 'Trip Origin'),
                array('sbs-map-icon sbs-map-whatshot' => "What's Hot"),
                array('sbs-map-icon sbs-map-zoom-out-map' => 'Zoom Out Map')
            );

            return array_merge($icons, $sbs_map_icons);
        }

    }

}

if (!class_exists('WPBakeryShortCode_SBS_WPB_OpenStreetMap') && class_exists('WPBakeryShortCode')) {

    /**
     * WPBakery Page Builder shortcode
     */
    class WPBakeryShortCode_SBS_WPB_OpenStreetMap extends WPBakeryShortCode {

        /**
         * Returns generated HTML from shortcode
         * 
         * @param array $attributes
         * @param string|null $content
         * @return string
         */
        protected function content($attributes, $content = null) {
            $attributes = SBS_OpenStreetMap_Base::merge_default_attributes($attributes);
            $content = wpb_js_remove_wpautop($content, true);
            return SBS_OpenStreetMap_Base::get_content($attributes, $content);
        }

    }

}
