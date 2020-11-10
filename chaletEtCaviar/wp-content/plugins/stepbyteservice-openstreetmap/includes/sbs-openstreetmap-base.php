<?php
if (!defined('WPINC')) {
    die;
}

if (!class_exists('SBS_OpenStreetMap_Base')) {

    /**
     * Base class for components
     */
    abstract class SBS_OpenStreetMap_Base {

        /**
         * Constructor
         */
        public function __construct() {
            add_action('wp_enqueue_scripts', array($this, 'check_enqueue_assets'), 0);
        }

        /**
         * Check if registered assets need to be enqueued. Returns the post if true, null otherwise.
         * 
         * @global WP_Post|null $post
         * @return WP_Post|null
         */
        public function check_enqueue_assets() {
            global $post;
            if (!is_a($post, 'WP_Post') || !is_singular())
                return null;
            return $post;
        }
        
        /**
         * Enqueue registered assets
         */
        public function enqueue_assets() {
            wp_enqueue_style('sbs-openstreetmap');
            wp_enqueue_script('sbs-openstreetmap');
        }

        /**
         * Merge given attributes with default values
         * 
         * @param array $attributes
         * @return array
         */
        public static function merge_default_attributes($attributes) {
            return shortcode_atts(array(
                'block_id' => '',
                'map_style' => 'wikimedia',
                'map_height' => '50',
                'zoom' => '15',
                'ctrl_mouse_zoom' => 'false',
                'latitude' => '52.4679888',
                'longitude' => '13.3257928',
                'show_attribution' => 'true',
                'marker_source' => 'address',
                'marker_address' => '',
                'marker_latitude' => '52.4679888',
                'marker_longitude' => '13.3257928',
                'marker_center' => 'true',
                'marker_icon' => '',
                'marker_color' => 'dark_blue'
                    ), $attributes);
        }

        /**
         * Generate and return HTML output from shortcode
         * 
         * @param array $attributes
         * @param string|null $content
         * @return string
         */
        public static function get_content($attributes, $content = null) {
            extract($attributes);
            if (is_null($content))
                $content = '';
            $content = str_replace(array("\n", "\r"), '', trim($content));
            $ctrl_mouse_zoom = filter_var($ctrl_mouse_zoom, FILTER_VALIDATE_BOOLEAN) ? 'true' : 'false';
            $show_attribution = filter_var($show_attribution, FILTER_VALIDATE_BOOLEAN) ? 'true' : 'false';
            if (!in_array($marker_source, array('address', 'coordinates'), true))
                $marker_source = 'coordinates';
            $marker_center = filter_var($marker_center, FILTER_VALIDATE_BOOLEAN) ? 'true' : 'false';
            if (empty($block_id))
                $block_id = uniqid();
            $id = 'sbs-openstreetmap-block-' . htmlspecialchars($block_id);
            ob_start();
            ?><div id="<?php echo $id ?>" class="sbs_openstreetmap_module" data-style="<?php echo htmlspecialchars($map_style); ?>" data-zoom="<?php printf('%d', $zoom); ?>" data-zoomable="<?php echo $ctrl_mouse_zoom; ?>" data-latitude="<?php printf('%F', $latitude); ?>" data-longitude="<?php printf('%F', $longitude); ?>" data-show-attribution="<?php echo htmlspecialchars($show_attribution); ?>" data-marker-source="<?php echo $marker_source; ?>" data-marker-address="<?php echo htmlspecialchars($marker_address); ?>" data-marker-latitude="<?php printf('%F', $marker_latitude); ?>" data-marker-longitude="<?php printf('%F', $marker_longitude); ?>" data-marker-center="<?php echo $marker_center; ?>" data-marker-icon="<?php echo htmlspecialchars($marker_icon); ?>" data-marker-color="<?php echo htmlspecialchars($marker_color); ?>" data-marker-text="<?php echo htmlspecialchars($content); ?>"><div class="sbs_openstreetmap_container" style="padding-bottom: <?php printf('%d%%', $map_height); ?>"></div></div><?php
            return ob_get_clean();
        }

    }

}
