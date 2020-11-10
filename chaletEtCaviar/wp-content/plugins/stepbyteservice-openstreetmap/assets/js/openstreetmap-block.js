(function (blocks, element, editor, components, i18n, stepbyteservice, classutils) {
    'use strict';

    sbsOpenStreetMapDefaults = sbsOpenStreetMapDefaults || {};

    blocks.registerBlockType('stepbyteservice/openstreetmap', {

        title: 'OpenStreetMap',
        icon: 'location-alt',
        category: 'embed',
        keywords: [
            i18n.__('map', 'sbs-wp-openstreetmap'),
            i18n.__('leaflet', 'sbs-wp-openstreetmap'),
        ], attributes: {
            block_id: {
                type: 'string'
            },
            map_style: {
                type: 'string',
                std: sbsOpenStreetMapDefaults.map_style || null
            },
            map_height: {
                type: 'integer',
                std: parseInt(sbsOpenStreetMapDefaults.map_height) || null
            },
            zoom: {
                type: 'integer',
                std: parseInt(sbsOpenStreetMapDefaults.zoom) || null
            },
            ctrl_mouse_zoom: {
                type: 'boolean',
                std: sbsOpenStreetMapDefaults.ctrl_mouse_zoom === true || sbsOpenStreetMapDefaults.ctrl_mouse_zoom === 'true' || false
            },
            latitude: {
                type: 'number'
            },
            longitude: {
                type: 'number'
            },
            show_attribution: {
                type: 'boolean',
                std: sbsOpenStreetMapDefaults.show_attribution === true || sbsOpenStreetMapDefaults.show_attribution === 'true' || false
            },
            marker_source: {
                type: 'string',
                std: sbsOpenStreetMapDefaults.marker_source || ''
            },
            marker_address: {
                type: 'string'
            },
            marker_latitude: {
                type: 'number'
            },
            marker_longitude: {
                type: 'number'
            },
            marker_center: {
                type: 'boolean',
                std: sbsOpenStreetMapDefaults.marker_center === true || sbsOpenStreetMapDefaults.marker_center === 'true' || false
            },
            marker_icon: {
                type: 'string',
                std: sbsOpenStreetMapDefaults.marker_icon || null
            },
            marker_color: {
                type: 'string',
                std: sbsOpenStreetMapDefaults.marker_color || null
            },
            marker_text: {
                type: 'string'
            }
        },
        supports: {
            align: ['wide', 'full']
        },

        edit: function (_Component) {
            classutils._inherits(edit, _Component);
            function edit(props) {
                var _this;
                classutils._classCallCheck(this, edit);
                _this = classutils._possibleConstructorReturn(this, classutils._getPrototypeOf(edit).apply(this, arguments));
                _this.props = props;
                return _this;
            }

            classutils._createClass(edit, [{
                    key: 'componentDidMount',
                    value: function componentDidMount() {
                        this.props.setAttributes({
                            block_id: this.props.clientId
                        });
                        stepbyteservice.OpenStreetMap.init(document.getElementById('sbs-openstreetmap-block-' + this.props.attributes.block_id))
                    }
                }, {
                    key: 'componentDidUpdate',
                    value: function componentDidUpdate(prevProps) {
                        if (this.props.attributes !== prevProps.attributes)
                            stepbyteservice.OpenStreetMap.init(document.getElementById('sbs-openstreetmap-block-' + this.props.attributes.block_id))
                    }
                }, {
                    key: 'render',
                    value: function render() {
                        var _this = this;
                        var attributes = classutils._objectSpread({}, sbsOpenStreetMapDefaults || {}, this.props.attributes);
                        return element.createElement(element.Fragment, {}, [
                            element.createElement('div', {
                                id: 'sbs-openstreetmap-block-' + attributes.block_id,
                                className: 'sbs_openstreetmap_module',
                                'data-style': attributes.map_style,
                                'data-zoom': attributes.zoom,
                                'data-zoomable': attributes.ctrl_mouse_zoom,
                                'data-latitude': attributes.latitude,
                                'data-longitude': attributes.longitude,
                                'data-show-attribution': attributes.show_attribution,
                                'data-marker-source': attributes.marker_source,
                                'data-marker-address': attributes.marker_address,
                                'data-marker-latitude': attributes.marker_latitude,
                                'data-marker-longitude': attributes.marker_longitude,
                                'data-marker-center': attributes.marker_center,
                                'data-marker-icon': attributes.marker_icon,
                                'data-marker-color': attributes.marker_color,
                                'data-marker-text': attributes.marker_text
                            }, element.createElement('div', {
                                className: 'sbs_openstreetmap_container',
                                style: {
                                    paddingBottom: attributes.map_height + '%'
                                }
                            })),
                            element.createElement(editor.InspectorControls, {},
                                    element.createElement('div', {
                                        className: 'sbs-openstreetmap-inspector-panel'
                                    },
                                            element.createElement(components.PanelBody, {
                                                title: i18n.__('Map', 'sbs-wp-openstreetmap'),
                                                initialOpen: true
                                            },
                                                    element.createElement(components.SelectControl, {
                                                        label: i18n.__('Map Style', 'sbs-wp-openstreetmap'),
                                                        value: attributes.map_style,
                                                        options: [
                                                            {label: 'Wikimedia', value: 'wikimedia'},
                                                            {label: 'OpenStreetMap DE', value: 'openstreetmap_de'},
                                                            {label: 'OpenTopoMap', value: 'opentopomap'},
                                                            {label: 'Stamen Toner', value: 'stamen_toner'},
                                                            {label: 'Stamen Toner Light', value: 'stamen_toner_light'},
                                                            {label: 'Stamen Terrain', value: 'stamen_terrain'},
                                                            {label: 'Stamen Watercolor', value: 'stamen_watercolor'}
                                                        ],
                                                        onChange: function onChange(value) {
                                                            _this.props.setAttributes({
                                                                map_style: value
                                                            });
                                                        }
                                                    }),
                                                    element.createElement(components.SelectControl, {
                                                        label: i18n.__('Map Height in Relation to Width', 'sbs-wp-openstreetmap'),
                                                        value: attributes.map_height,
                                                        options: [
                                                            {label: '20%', value: 20},
                                                            {label: '30%', value: 30},
                                                            {label: '50%', value: 50},
                                                            {label: '60%', value: 60},
                                                            {label: '100%', value: 100},
                                                        ],
                                                        onChange: function onChange(value) {
                                                            _this.props.setAttributes({
                                                                map_height: parseInt(value)
                                                            });
                                                        }
                                                    }),
                                                    element.createElement(components.RangeControl, {
                                                        label: i18n.__('Zoom Level', 'sbs-wp-openstreetmap'),
                                                        value: attributes.zoom,
                                                        min: 10,
                                                        max: 20,
                                                        onChange: function onChange(value) {
                                                            _this.props.setAttributes({
                                                                zoom: parseInt(value)
                                                            });
                                                        }
                                                    }),
                                                    element.createElement(components.CheckboxControl, {
                                                        label: i18n.__('Zoom With CTRL-Key Only', 'sbs-wp-openstreetmap'),
                                                        checked: attributes.ctrl_mouse_zoom === true || attributes.ctrl_mouse_zoom === 'true',
                                                        onChange: function onChange(value) {
                                                            _this.props.setAttributes({
                                                                ctrl_mouse_zoom: value
                                                            });
                                                        }
                                                    }),
                                                    element.createElement(components.TextControl, {
                                                        label: i18n.__("Latitude of the Map's Center", 'sbs-wp-openstreetmap'),
                                                        help: i18n.__('Only needed if marker is not the center of the map', 'sbs-wp-openstreetmap'),
                                                        type: 'number',
                                                        value: _this.props.attributes.latitude,
                                                        onChange: function onChange(value) {
                                                            _this.props.setAttributes({
                                                                latitude: parseFloat(value)
                                                            });
                                                        }
                                                    }),
                                                    element.createElement(components.TextControl, {
                                                        label: i18n.__("Longitude of the Map's Center", 'sbs-wp-openstreetmap'),
                                                        help: i18n.__('Only needed if marker is not the center of the map', 'sbs-wp-openstreetmap'),
                                                        type: 'number',
                                                        value: _this.props.attributes.longitude,
                                                        onChange: function onChange(value) {
                                                            _this.props.setAttributes({
                                                                longitude: parseFloat(value)
                                                            });
                                                        }
                                                    }),
                                                    element.createElement(components.CheckboxControl, {
                                                        label: i18n.__('Show Attribution', 'sbs-wp-openstreetmap'),
                                                        help: i18n.__('Attributions for content providers are shown as links on the bottom right corner of the map. If you disable the checkbox please consider the legal circumstances.', 'sbs-wp-openstreetmap'),
                                                        checked: attributes.show_attribution === true || attributes.show_attribution === 'true',
                                                        onChange: function onChange(value) {
                                                            _this.props.setAttributes({
                                                                show_attribution: value
                                                            });
                                                        }
                                                    })
                                                    ),
                                            element.createElement(components.PanelBody, {
                                                title: i18n.__('Marker', 'sbs-wp-openstreetmap'),
                                                initialOpen: false
                                            }, element.createElement(components.SelectControl, {
                                                label: i18n.__('Determine Position By', 'sbs-wp-openstreetmap'),
                                                value: attributes.marker_source,
                                                options: [
                                                    {label: i18n.__('Address', 'sbs-wp-openstreetmap'), value: 'address'},
                                                    {label: i18n.__('Coordinates', 'sbs-wp-openstreetmap'), value: 'coordinates'}
                                                ],
                                                onChange: function onChange(value) {
                                                    _this.props.setAttributes({
                                                        marker_source: value
                                                    });
                                                }
                                            }),
                                                    attributes.marker_source === 'address' && element.createElement(components.TextControl, {
                                                        label: i18n.__('Address', 'sbs-wp-openstreetmap'),
                                                        value: _this.props.attributes.marker_address,
                                                        onChange: function onChange(value) {
                                                            _this.props.setAttributes({
                                                                marker_address: value
                                                            });
                                                        }
                                                    }),
                                                    attributes.marker_source === 'coordinates' && element.createElement(components.TextControl, {
                                                        label: i18n.__('Latitude', 'sbs-wp-openstreetmap'),
                                                        type: 'number',
                                                        value: _this.props.attributes.marker_latitude,
                                                        onChange: function onChange(value) {
                                                            _this.props.setAttributes({
                                                                marker_latitude: parseFloat(value)
                                                            });
                                                        }
                                                    }),
                                                    attributes.marker_source === 'coordinates' && element.createElement(components.TextControl, {
                                                        label: i18n.__('Longitude', 'sbs-wp-openstreetmap'),
                                                        type: 'number',
                                                        value: _this.props.attributes.marker_longitude,
                                                        onChange: function onChange(value) {
                                                            _this.props.setAttributes({
                                                                marker_longitude: parseFloat(value)
                                                            });
                                                        }
                                                    }),
                                                    element.createElement(components.CheckboxControl, {
                                                        label: i18n.__('Center Map on Marker', 'sbs-wp-openstreetmap'),
                                                        checked: attributes.marker_center === true || attributes.marker_center === 'true',
                                                        onChange: function onChange(value) {
                                                            _this.props.setAttributes({
                                                                marker_center: value
                                                            });
                                                        }
                                                    }),
                                                    element.createElement(FontIconPicker, {
                                                        icons: [
                                                            'sbs-map-icon sbs-map-360',
                                                            'sbs-map-icon sbs-map-ac-unit',
                                                            'sbs-map-icon sbs-map-airport-shuttle',
                                                            'sbs-map-icon sbs-map-all-inclusive',
                                                            'sbs-map-icon sbs-map-apartment',
                                                            'sbs-map-icon sbs-map-atm',
                                                            'sbs-map-icon sbs-map-bathtub',
                                                            'sbs-map-icon sbs-map-beach-access',
                                                            'sbs-map-icon sbs-map-beenhere',
                                                            'sbs-map-icon sbs-map-business-center',
                                                            'sbs-map-icon sbs-map-cake',
                                                            'sbs-map-icon sbs-map-casino',
                                                            'sbs-map-icon sbs-map-category',
                                                            'sbs-map-icon sbs-map-child-care',
                                                            'sbs-map-icon sbs-map-child-friendly',
                                                            'sbs-map-icon sbs-map-compass-calibration',
                                                            'sbs-map-icon sbs-map-deck',
                                                            'sbs-map-icon sbs-map-departure-board',
                                                            'sbs-map-icon sbs-map-directions',
                                                            'sbs-map-icon sbs-map-directions-bike',
                                                            'sbs-map-icon sbs-map-directions-boat',
                                                            'sbs-map-icon sbs-map-directions-bus',
                                                            'sbs-map-icon sbs-map-directions-car',
                                                            'sbs-map-icon sbs-map-directions-railway',
                                                            'sbs-map-icon sbs-map-directions-run',
                                                            'sbs-map-icon sbs-map-directions-subway',
                                                            'sbs-map-icon sbs-map-directions-transit',
                                                            'sbs-map-icon sbs-map-directions-walk',
                                                            'sbs-map-icon sbs-map-edit-attributes',
                                                            'sbs-map-icon sbs-map-emoji-emotions',
                                                            'sbs-map-icon sbs-map-emoji-events',
                                                            'sbs-map-icon sbs-map-emoji-flags',
                                                            'sbs-map-icon sbs-map-emoji-food-beverage',
                                                            'sbs-map-icon sbs-map-emoji-nature',
                                                            'sbs-map-icon sbs-map-emoji-objects',
                                                            'sbs-map-icon sbs-map-emoji-people',
                                                            'sbs-map-icon sbs-map-emoji-symbols',
                                                            'sbs-map-icon sbs-map-emoji-transportation',
                                                            'sbs-map-icon sbs-map-ev-station',
                                                            'sbs-map-icon sbs-map-fastfood',
                                                            'sbs-map-icon sbs-map-fireplace',
                                                            'sbs-map-icon sbs-map-fitness-center',
                                                            'sbs-map-icon sbs-map-flight',
                                                            'sbs-map-icon sbs-map-free-breakfast',
                                                            'sbs-map-icon sbs-map-golf-course',
                                                            'sbs-map-icon sbs-map-group',
                                                            'sbs-map-icon sbs-map-group-add',
                                                            'sbs-map-icon sbs-map-hot-tub',
                                                            'sbs-map-icon sbs-map-hotel',
                                                            'sbs-map-icon sbs-map-house',
                                                            'sbs-map-icon sbs-map-king-bed',
                                                            'sbs-map-icon sbs-map-kitchen',
                                                            'sbs-map-icon sbs-map-layers',
                                                            'sbs-map-icon sbs-map-layers-clear',
                                                            'sbs-map-icon sbs-map-local-activity',
                                                            'sbs-map-icon sbs-map-local-airport',
                                                            'sbs-map-icon sbs-map-local-atm',
                                                            'sbs-map-icon sbs-map-local-bar',
                                                            'sbs-map-icon sbs-map-local-cafe',
                                                            'sbs-map-icon sbs-map-local-car-wash',
                                                            'sbs-map-icon sbs-map-local-convenience-store',
                                                            'sbs-map-icon sbs-map-local-dining',
                                                            'sbs-map-icon sbs-map-local-drink',
                                                            'sbs-map-icon sbs-map-local-florist',
                                                            'sbs-map-icon sbs-map-local-gas-station',
                                                            'sbs-map-icon sbs-map-local-grocery-store',
                                                            'sbs-map-icon sbs-map-local-hospital',
                                                            'sbs-map-icon sbs-map-local-hotel',
                                                            'sbs-map-icon sbs-map-local-laundry-service',
                                                            'sbs-map-icon sbs-map-local-library',
                                                            'sbs-map-icon sbs-map-local-mall',
                                                            'sbs-map-icon sbs-map-local-movies',
                                                            'sbs-map-icon sbs-map-local-offer',
                                                            'sbs-map-icon sbs-map-local-parking',
                                                            'sbs-map-icon sbs-map-local-pharmacy',
                                                            'sbs-map-icon sbs-map-local-phone',
                                                            'sbs-map-icon sbs-map-local-pizza',
                                                            'sbs-map-icon sbs-map-local-play',
                                                            'sbs-map-icon sbs-map-local-post-office',
                                                            'sbs-map-icon sbs-map-local-printshop',
                                                            'sbs-map-icon sbs-map-local-see',
                                                            'sbs-map-icon sbs-map-local-shipping',
                                                            'sbs-map-icon sbs-map-local-taxi',
                                                            'sbs-map-icon sbs-map-location-city',
                                                            'sbs-map-icon sbs-map-map',
                                                            'sbs-map-icon sbs-map-meeting-room',
                                                            'sbs-map-icon sbs-map-menu-book',
                                                            'sbs-map-icon sbs-map-money',
                                                            'sbs-map-icon sbs-map-mood',
                                                            'sbs-map-icon sbs-map-mood-bad',
                                                            'sbs-map-icon sbs-map-museum',
                                                            'sbs-map-icon sbs-map-my-location',
                                                            'sbs-map-icon sbs-map-navigation',
                                                            'sbs-map-icon sbs-map-near-me',
                                                            'sbs-map-icon sbs-map-nights-stay',
                                                            'sbs-map-icon sbs-map-no-meeting-room',
                                                            'sbs-map-icon sbs-map-notifications',
                                                            'sbs-map-icon sbs-map-notifications-active',
                                                            'sbs-map-icon sbs-map-notifications-none',
                                                            'sbs-map-icon sbs-map-notifications-off',
                                                            'sbs-map-icon sbs-map-notifications-paused',
                                                            'sbs-map-icon sbs-map-outdoor-grill',
                                                            'sbs-map-icon sbs-map-pages',
                                                            'sbs-map-icon sbs-map-party-mode',
                                                            'sbs-map-icon sbs-map-people',
                                                            'sbs-map-icon sbs-map-people-alt',
                                                            'sbs-map-icon sbs-map-people-outline',
                                                            'sbs-map-icon sbs-map-person',
                                                            'sbs-map-icon sbs-map-person-add',
                                                            'sbs-map-icon sbs-map-person-outline',
                                                            'sbs-map-icon sbs-map-person-pin',
                                                            'sbs-map-icon sbs-map-plus-one',
                                                            'sbs-map-icon sbs-map-poll',
                                                            'sbs-map-icon sbs-map-pool',
                                                            'sbs-map-icon sbs-map-public',
                                                            'sbs-map-icon sbs-map-rate-review',
                                                            'sbs-map-icon sbs-map-restaurant',
                                                            'sbs-map-icon sbs-map-restaurant-menu',
                                                            'sbs-map-icon sbs-map-room-service',
                                                            'sbs-map-icon sbs-map-rv-hookup',
                                                            'sbs-map-icon sbs-map-satellite',
                                                            'sbs-map-icon sbs-map-school',
                                                            'sbs-map-icon sbs-map-sentiment-dissatisfied',
                                                            'sbs-map-icon sbs-map-sentiment-satisfied',
                                                            'sbs-map-icon sbs-map-sentiment-very-dissatisfied',
                                                            'sbs-map-icon sbs-map-sentiment-very-satisfied',
                                                            'sbs-map-icon sbs-map-share',
                                                            'sbs-map-icon sbs-map-single-bed',
                                                            'sbs-map-icon sbs-map-smoke-free',
                                                            'sbs-map-icon sbs-map-smoking-rooms',
                                                            'sbs-map-icon sbs-map-spa',
                                                            'sbs-map-icon sbs-map-sports',
                                                            'sbs-map-icon sbs-map-sports-baseball',
                                                            'sbs-map-icon sbs-map-sports-basketball',
                                                            'sbs-map-icon sbs-map-sports-cricket',
                                                            'sbs-map-icon sbs-map-sports-esports',
                                                            'sbs-map-icon sbs-map-sports-football',
                                                            'sbs-map-icon sbs-map-sports-golf',
                                                            'sbs-map-icon sbs-map-sports-handball',
                                                            'sbs-map-icon sbs-map-sports-hockey',
                                                            'sbs-map-icon sbs-map-sports-kabaddi',
                                                            'sbs-map-icon sbs-map-sports-mma',
                                                            'sbs-map-icon sbs-map-sports-motorsports',
                                                            'sbs-map-icon sbs-map-sports-rugby',
                                                            'sbs-map-icon sbs-map-sports-soccer',
                                                            'sbs-map-icon sbs-map-sports-tennis',
                                                            'sbs-map-icon sbs-map-sports-volleyball',
                                                            'sbs-map-icon sbs-map-store-mall-directory',
                                                            'sbs-map-icon sbs-map-storefront',
                                                            'sbs-map-icon sbs-map-streetview',
                                                            'sbs-map-icon sbs-map-subway',
                                                            'sbs-map-icon sbs-map-terrain',
                                                            'sbs-map-icon sbs-map-thumb-down-alt',
                                                            'sbs-map-icon sbs-map-thumb-up-alt',
                                                            'sbs-map-icon sbs-map-traffic',
                                                            'sbs-map-icon sbs-map-train',
                                                            'sbs-map-icon sbs-map-tram',
                                                            'sbs-map-icon sbs-map-transfer-within-a-station',
                                                            'sbs-map-icon sbs-map-transit-enterexit',
                                                            'sbs-map-icon sbs-map-trip-origin',
                                                            'sbs-map-icon sbs-map-whatshot',
                                                            'sbs-map-icon sbs-map-zoom-out-map'
                                                        ],
                                                        theme: 'default',
                                                        value: _this.props.attributes.marker_icon,
                                                        onChange: function onChange(value) {
                                                            _this.props.setAttributes({
                                                                marker_icon: value
                                                            });
                                                        },
                                                        allCatPlaceholder: i18n.__('Show From All', 'sbs-wp-openstreetmap'),
                                                        searchPlaceholder: i18n.__('Search Icons', 'sbs-wp-openstreetmap'),
                                                        noIconPlaceholder: i18n.__('No Icons Found', 'sbs-wp-openstreetmap'),
                                                        noSelectedPlaceholder: i18n.__('Select Icon', 'sbs-wp-openstreetmap')
                                                    }),
                                                    element.createElement(components.SelectControl, {
                                                        label: i18n.__('Marker Color', 'sbs-wp-openstreetmap'),
                                                        value: attributes.marker_color,
                                                        options: [
                                                            {label: i18n.__('Red', 'sbs-wp-openstreetmap'), value: 'red'},
                                                            {label: i18n.__('White', 'sbs-wp-openstreetmap'), value: 'white'},
                                                            {label: i18n.__('Blue', 'sbs-wp-openstreetmap'), value: 'dark_blue'},
                                                            {label: i18n.__('Green', 'sbs-wp-openstreetmap'), value: 'green'},
                                                            {label: i18n.__('Black', 'sbs-wp-openstreetmap'), value: 'black'},
                                                            {label: i18n.__('Orange', 'sbs-wp-openstreetmap'), value: 'orange'},
                                                            {label: i18n.__('Yellow', 'sbs-wp-openstreetmap'), value: 'yellow'}
                                                        ],
                                                        onChange: function onChange(value) {
                                                            _this.props.setAttributes({
                                                                marker_color: value
                                                            });
                                                        }
                                                    }),
                                                    element.createElement(components.TextareaControl, {
                                                        label: i18n.__('Popup Text', 'sbs-wp-openstreetmap'),
                                                        value: _this.props.attributes.marker_text,
                                                        onChange: function onChange(value) {
                                                            _this.props.setAttributes({
                                                                marker_text: value
                                                            });
                                                        }
                                                    })
                                                    )
                                            )
                                    )
                        ]);
                    }
                }]);
            return edit;
        }(element.Component),
        save: function (props) {
            var attributes = classutils._objectSpread({}, sbsOpenStreetMapDefaults || {}, props.attributes);
            return element.createElement('div', {
                id: 'sbs-openstreetmap-block-' + attributes.block_id,
                className: 'sbs_openstreetmap_module',
                'data-style': attributes.map_style,
                'data-zoom': attributes.zoom,
                'data-zoomable': attributes.ctrl_mouse_zoom,
                'data-latitude': attributes.latitude,
                'data-longitude': attributes.longitude,
                'data-show-attribution': attributes.show_attribution,
                'data-marker-source': attributes.marker_source,
                'data-marker-address': attributes.marker_address,
                'data-marker-latitude': attributes.marker_latitude,
                'data-marker-longitude': attributes.marker_longitude,
                'data-marker-center': attributes.marker_center,
                'data-marker-icon': attributes.marker_icon,
                'data-marker-color': attributes.marker_color,
                'data-marker-text': attributes.marker_text
            }, element.createElement('div', {
                className: 'sbs_openstreetmap_container',
                style: {
                    paddingBottom: attributes.map_height + '%'
                }
            }));
        }
    });
})(window.wp.blocks, window.wp.element, window.wp.editor, window.wp.components, window.wp.i18n, window.stepbyteservice, window.classutils);
