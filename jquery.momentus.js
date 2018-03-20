/**
 * A velocity/momentum event dispatcher for jQuery
 *
 * https://github.com/ben-yip/momentus
 */
jQuery.fn.momentus = function (cfg) {

    /******** Initialize *****************/
    var now = Date.now || function () {
            return (new Date()).valueOf()
        },
        start_point = {x: 0, y: 0},
        last_point = {x: 0, y: 0},
        current_coords = {x: 0, y: 0},
        last_coords = {x: 0, y: 0},
        velocity = {x: 0, y: 0},
        last_time = now(),
        inertia_time = last_time,
        /******** End Initialize *************/

        /******** Configuration **************/
        /**
         * @cfg {Number} mass : The unitless mass of this Momentus
         */
        mass = cfg.mass || 1000,

        /**
         * @cfg {Number} u : The friction coefficient
         */
        u = 'u' in cfg ? cfg.u : 4,

        /**
         * @cfg {Number} wheelRatio : The amount to divide mousewheel deltas by (to get desired sensitivity)
         */
        wheel_ratio = cfg.wheelRatio || 1000,

        /**
         * @cfg {Number} mouseRatio : The amount to divide mousemove deltas by
         */
        mouse_ratio = cfg.mouseRatio || 20,

        /**
         * @cfg {Number} touchRatio : The amount to divide touchmove deltas by
         */
        touch_ratio = cfg.touchRatio || 1,

        /**
         * @cfg {Function} onChange : Callback called when any change is made to position or velocity
         *    @param {Object} coordinates {x: current_x, y: current_y}
         *    @param {Object} velocity {x: current_vX, y: current_vY}
         */
        on_change = cfg.onChange || function () {
        },

        /**
         * @cfg {Number} frameRate : If requestAnimationFrame is not supported, the fps at which to update
         */
        frame_rate = cfg.frameRate || 60;

    /******** End Configuration **************/


    function calculateVelocity(e) {
        var time = now(),
            delta_time = time - last_time,
            vel_x = velocity.x + ((last_coords.x / delta_time) / (e.pageX ? mouse_ratio : touch_ratio)),
            vel_y = velocity.y + ((last_coords.y / delta_time) / (e.pageY ? mouse_ratio : touch_ratio));
        vel_x = !isNaN(vel_x) ? vel_x : 0;
        vel_y = !isNaN(vel_y) ? vel_y : 0;
        return {x: vel_x, y: vel_y};
    }

    $(this).on('mousedown touchstart', function (e) {
        e.preventDefault();
        var x = e.pageX || e.originalEvent.touches[0].pageX,
            y = e.pageY || e.originalEvent.touches[0].pageY;
        last_coords = {x: 0, y: 0};
        start_point = {x: x, y: y};
        velocity = {x: 0, y: 0};
        on_change(current_coords, velocity);

        $('body').on('mousemove touchmove', function (e) {
            e.preventDefault();
            var vel = calculateVelocity(e);
            last_time = now();
            var x = e.pageX || e.originalEvent.touches[0].pageX,
                y = e.pageY || e.originalEvent.touches[0].pageY,
                delta_x = x - start_point.x,
                delta_y = y - start_point.y;
            last_point = start_point;
            start_point = {x: x, y: y};
            last_coords.x = delta_x;
            last_coords.y = delta_y;
            current_coords.x += delta_x;
            current_coords.y += delta_y;
            on_change(current_coords, vel);
        });

        $('body').on('mouseup touchend', function (e) {
            velocity = calculateVelocity(e);
            on_change(current_coords, velocity);
            inertia_time = null;
            $('body').off('mousemove touchmove mouseup touchend');
        });
    });

    $(this).on('wheel mousewheel', function (e) {
        if (velocity.x == 0 && velocity.y == 0)
            inertia_time = now();
        var delta_x = e.originalEvent.deltaX || 0,
            delta_y = e.originalEvent.deltaY || 0;
        velocity.x -= delta_x / wheel_ratio;
        velocity.y -= delta_y / wheel_ratio;
    });

    (function inertia() {
        velocity.x = !isNaN(velocity.x) ? velocity.x : 0;
        velocity.y = !isNaN(velocity.y) ? velocity.y : 0;

        if (!inertia_time) {
            inertia_time = now();
        }
        else if (velocity.x != 0 || velocity.y != 0) {
            var time = now(),
                force_x = velocity.x * u,
                force_y = velocity.y * u,
                acc_x = force_x / mass,
                acc_y = force_y / mass,
                delta_time = time - inertia_time,
                vel_x = velocity.x - (acc_x * delta_time),
                vel_y = velocity.y - (acc_y * delta_time);
            vel_x = !isNaN(vel_x) ? vel_x : 0;
            vel_y = !isNaN(vel_y) ? vel_y : 0;
            velocity.x = vel_x;
            velocity.y = vel_y;

            var delta_x = vel_x * delta_time,
                delta_y = vel_y * delta_time;
            last_coords.x = current_coords.x;
            last_coords.y = current_coords.y;
            current_coords.x += delta_x;
            current_coords.y += delta_y;
            inertia_time = time;
            on_change(current_coords, velocity);
        }

        if (window.requestAnimationFrame) {
            requestAnimationFrame(inertia);
        } else {
            setTimeout(inertia, 1000 / frame_rate);
        }
    })();
    return this;
};
