(function ($) {
    'use strict';

    window.stepbyteservice = window.stepbyteservice || {};

    window.classutils = {
        _inherits: function _inherits(subClass, superClass) {
            if (typeof superClass !== "function" && superClass !== null) {
                throw new TypeError("Super expression must either be null or a function");
            }
            subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {value: subClass, writable: true, configurable: true}});
            if (superClass)
                window.classutils._setPrototypeOf(subClass, superClass);
        },
        _classCallCheck: function _classCallCheck(instance, Constructor) {
            if (!window.classutils._instanceof(instance, Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        },
        _possibleConstructorReturn: function _possibleConstructorReturn(self, call) {
            if (call && (window.classutils._typeof(call) === "object" || typeof call === "function")) {
                return call;
            }
            return window.classutils._assertThisInitialized(self);
        },
        _setPrototypeOf: function _setPrototypeOf(o, p) {
            var _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
                o.__proto__ = p;
                return o;
            };
            return _setPrototypeOf(o, p);
        },
        _defineProperties: function _defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor)
                    descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        },
        _createClass: function _createClass(Constructor, protoProps, staticProps) {
            if (protoProps)
                window.classutils._defineProperties(Constructor.prototype, protoProps);
            if (staticProps)
                window.classutils._defineProperties(Constructor, staticProps);
            return Constructor;
        },
        _instanceof: function _instanceof(left, right) {
            if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
                return !!right[Symbol.hasInstance](left);
            } else {
                return left instanceof right;
            }
        },
        _getPrototypeOf: function _getPrototypeOf(o) {
            var _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
                return o.__proto__ || Object.getPrototypeOf(o);
            };
            return _getPrototypeOf(o);
        },
        _assertThisInitialized: function _assertThisInitialized(self) {
            if (self === void 0) {
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return self;
        },
        _defineProperty: function _defineProperty(obj, key, value) {
            if (key in obj) {
                Object.defineProperty(obj, key, {
                    value: value,
                    enumerable: true,
                    configurable: true,
                    writable: true
                });
            } else {
                obj[key] = value;
            }

            return obj;
        },
        _objectSpread: function _objectSpread(target) {
            var _this = this;
            for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i] != null ? arguments[i] : {};
                var ownKeys = Object.keys(source);
                if (typeof Object.getOwnPropertySymbols === 'function') {
                    ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
                        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
                    }));
                }

                ownKeys.forEach(function (key) {
                    _this._defineProperty(target, key, source[key]);
                });
            }

            return target;
        },
    }

    window.stepbyteservice.OpenStreetMap = function ($) {
        var DATA_KEY = 'stepbyteservice.openstreetmap';

        function OpenStreetMap(element) {
            classutils._classCallCheck(this, OpenStreetMap);
            this.map = null;
        }

        classutils._createClass(OpenStreetMap, [{
                key: 'initMap',
                value: function initMap(element) {
                    if (this.map) {
                        this.map.remove();
                        this.map = null;
                    }
                    element = $(element);
                    var container = element.find('.sbs_openstreetmap_container');
                    if (element.length === 0 || container.length === 0)
                        return;
                    var _this = this;
                    sbsOpenStreetMapDefaults = sbsOpenStreetMapDefaults || {};
                    var style = element.attr('data-style') || sbsOpenStreetMapDefaults.map_style || null;
                    var zoom = element.attr('data-zoom') || sbsOpenStreetMapDefaults.zoom || 1;
                    var zoomable = element.attr('data-zoomable') || sbsOpenStreetMapDefaults.ctrl_mouse_zoom || false;
                    var latitude = element.attr('data-latitude') || sbsOpenStreetMapDefaults.latitude || 0;
                    var longitude = element.attr('data-longitude') || sbsOpenStreetMapDefaults.longitude || 0;
                    var showAttribution = element.attr('data-show-attribution') || sbsOpenStreetMapDefaults.show_attribution || false;
                    var markerSource = element.attr('data-marker-source') || sbsOpenStreetMapDefaults.marker_source || '';
                    var markerAddress = element.attr('data-marker-address') || sbsOpenStreetMapDefaults.marker_address || '';
                    var markerLatitude = element.attr('data-marker-latitude') || 0;
                    var markerLongitude = element.attr('data-marker-longitude') || 0;
                    var markerCenter = element.attr('data-marker-center') || sbsOpenStreetMapDefaults.marker_center || false;
                    var markerIcon = element.attr('data-marker-icon') || sbsOpenStreetMapDefaults.marker_icon || '';
                    var markerColor = element.attr('data-marker-color') || sbsOpenStreetMapDefaults.marker_color || '';
                    var markerText = element.attr('data-marker-text') || '';

                    var mapConfigs = {
                        center: [latitude, longitude],
                        trackResize: true,
                        zoom: zoom,
                        gestureHandling: zoomable === true || zoomable === 'true',
                        attributionControl: false
                    };
                    var tileConfigs = {
                        wikimedia: {
                            url: 'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}{r}.png',
                            params: {
                                minZoom: 1,
                                maxZoom: 19,
                                attribution: '<a href="https://wikimediafoundation.org/wiki/Maps_Terms_of_Use">Wikimedia</a> | Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            }
                        },
                        openstreetmap_de: {
                            url: 'https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png',
                            params: {
                                maxZoom: 18,
                                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            }
                        },
                        opentopomap: {
                            url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
                            params: {
                                maxZoom: 17,
                                attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
                            }
                        },
                        stamen_toner: {
                            url: 'https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}{r}.{ext}',
                            params: {
                                minZoom: 0,
                                maxZoom: 20,
                                subdomains: 'abcd',
                                ext: 'png',
                                attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> | Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            }
                        },
                        stamen_toner_light: {
                            url: 'https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.{ext}',
                            params: {
                                minZoom: 0,
                                maxZoom: 20,
                                subdomains: 'abcd',
                                ext: 'png',
                                attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> | Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            }
                        },
                        stamen_terrain: {
                            url: 'https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.{ext}',
                            params: {
                                minZoom: 0,
                                maxZoom: 18,
                                subdomains: 'abcd',
                                ext: 'png',
                                attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> | Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            }
                        },
                        stamen_watercolor: {
                            url: 'https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}',
                            params: {
                                minZoom: 1,
                                maxZoom: 16,
                                subdomains: 'abcd',
                                ext: 'jpg',
                                attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> | Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            }
                        }
                    };

                    var mapStyleConfig = typeof tileConfigs[style] === 'undefined' ? tileConfigs['wikimedia'] : tileConfigs[style];
                    if (showAttribution === true || showAttribution === 'true') {
                        mapConfigs.attributionControl = true;
                    }
                    var icon = L.divIcon({
                        html: '<div class="sbs_marker_body ' + markerColor + '"><svg version="1.1" class="sbs_marker_background" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 120 120" style="enable-background:new 0 0 120 120;" xml:space="preserve"><path d="M24,46C24,25.2,40.1,8.3,60,8.3S96,25.2,96,46c0,7.1-3.6,16.7-10.1,28.7c-2,3.6-4.2,7.4-6.5,11.3c-3.5,5.8-7.3,11.5-11.1,17c-1.3,1.9-2.6,3.6-3.7,5.2c-0.4,0.5-0.7,1-1,1.4c-0.2,0.2-0.3,0.4-0.4,0.5c-1.6,2.2-4.7,2.2-6.3,0c-0.1-0.1-0.2-0.3-0.4-0.5c-0.3-0.4-0.6-0.9-1-1.4c-1.1-1.5-2.3-3.3-3.7-5.2c-3.8-5.5-7.6-11.2-11.1-17c-2.4-3.9-4.6-7.7-6.5-11.3C27.6,62.7,24,53.1,24,46z"/></svg><i class="' + markerIcon + ' sbs_marker_icon"></i></div>',
                        iconSize: [46, 46],
                        iconAnchor: [23, 45],
                        popupAnchor: [0, -37],
                        className: 'sbs_map_marker'
                    });
                    this.map = L.map(container[0], mapConfigs);
                    var layer = new L.TileLayer(mapStyleConfig.url, mapStyleConfig.params);
                    this.map.addLayer(layer);
                    if (markerSource === 'address') {
                        if (markerAddress) {
                            try {
                                var provider = new window.GeoSearch.OpenStreetMapProvider();
                                var queryPromise = provider.search({query: markerAddress});
                                queryPromise.then(function(value) {
                                    if (typeof value[0] !== 'undefined') {
                                        markerLongitude = value[0].x;
                                        markerLatitude = value[0].y;
                                        var label = value[0].label;
                                        var marker = L.marker([markerLatitude, markerLongitude], {icon: icon}).addTo(_this.map);
                                        if (markerText)
                                            marker.bindPopup(markerText);
                                        if (markerCenter === true || markerCenter === 'true') {
                                            _this.map.panTo([markerLatitude, markerLongitude]);
                                        }
                                    }
                                }, function(reason) {
                                    console.log(reason);
                                }).catch(function (e) {
                                    console.log(e);
                                });
                            } catch (e) {
                                console.log(e);
                            }
                        }
                    } else if (markerLatitude != 0 && markerLongitude != 0) {
                        var marker = L.marker([markerLatitude, markerLongitude], {icon: icon}).addTo(this.map);
                        if (markerText)
                            marker.bindPopup(markerText);
                        if (markerCenter === true || markerCenter === 'true') {
                            this.map.panTo([markerLatitude, markerLongitude]);
                        }
                    }

                    $(document).on('invalidate.sbs.openstreetmap vc-full-width-row shown.bs.tab shown.bs.collapse show.vc.tab afterShow.vc.accordion', function (event) {
                        if (_this.map)
                            _this.map.invalidateSize();
                    });
                }
            }], [{
                key: 'init',
                value: function init(element) {
                    element = $(element);
                    var data = element.data(DATA_KEY);
                    if (!data) {
                        data = new OpenStreetMap(element);
                        element.data(DATA_KEY, data);
                    }
                    data.initMap(element);
                }
            }]);
        return OpenStreetMap;

    }($);

    $(function () {
        $('.sbs_openstreetmap_module').each(function () {
            window.stepbyteservice.OpenStreetMap.init(this);
        });
        if (typeof window.vc !== 'undefined' && typeof window.vc.events !== 'undefined') {
            window.vc.events.on('shortcodeView:ready', function (model) {
                try {
                    if (model.attributes.shortcode === 'sbs_wpb_openstreetmap') {
                        stepbyteservice.OpenStreetMap.init(model.view.el.firstChild);
                    }
                } catch (e) {
                }
            });
        }
    });

})(jQuery);
